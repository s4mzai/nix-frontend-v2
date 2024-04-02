import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import UserCard from "@/components/UserCard";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import Member from "@/types/member";
import React from "react";
import { useEffect } from "react";

const categories = ["Name", "Role", "Email"];

const initialState = {
  membersList: [] as Member[],
  searchTerm: "",
  selectedCategory: categories[0].toLowerCase(),
  loading: true,
  currentPage: 1,
  perPage: 9,
};

const enum ActionType {
  SetMemberList,
  SetSearchTerm,
  SetSelectedCategory,
  SetLoading,
  SetCurrentPage,
}

const reducer = (
  state: typeof initialState,
  action: { type: ActionType; payload },
) => {
  const updatedData = { ...state };
  switch (action.type) {
    //underscore convention from react docs
    case ActionType.SetMemberList:
      updatedData.membersList = action.payload;
      break;
    case ActionType.SetSearchTerm:
      updatedData.searchTerm = action.payload;
      updatedData.currentPage = 1;
      break;
    case ActionType.SetSelectedCategory:
      updatedData.selectedCategory = action.payload;
      break;
    case ActionType.SetLoading:
      updatedData.loading = action.payload;
      break;
    case ActionType.SetCurrentPage:
      updatedData.currentPage = action.payload;
      break;
    default:
      return updatedData;
  }
  return updatedData;
};

export default function AllMembers() {
  const { setError } = React.useContext(ErrorContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { membersList, searchTerm, selectedCategory, loading } = state;

  useEffect(() => {
    const membersEndpoint = "/user";

    API.get(membersEndpoint)
      .then((membersResponse) => {
        dispatch({
          type: ActionType.SetMemberList,
          payload: membersResponse.data.data,
        });
        dispatch({ type: ActionType.SetLoading, payload: false });
      })
      .catch((error) => {
        setError(error);
        dispatch({ type: ActionType.SetLoading, payload: false });
      });
  }, []);

  //filter members based on search term

  const filteredMembers = membersList.filter((member) => {
    const category = member[selectedCategory.toLowerCase()];
    const categoryValue = category ? category.toString().toLowerCase() : "";
    return categoryValue.includes(searchTerm.toLowerCase());
  });

  const indexOfLastMember = state.currentPage * state.perPage;
  const indexOfFirstMember = indexOfLastMember - state.perPage;
  const paginatedMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember,
  );

  if (loading)
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  function Pagination() {
    const { currentPage, perPage } = state;
    const totalPages = Math.ceil(filteredMembers.length / perPage);

    const handlePageChange = (newPage: number) => {
      dispatch({ type: ActionType.SetCurrentPage, payload: newPage });
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const MAX_PAGES_TO_SHOW = 5;
    let startIndex = currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2);
    let endIndex = currentPage + Math.floor(MAX_PAGES_TO_SHOW / 2);

    if (startIndex < 1) {
      endIndex -= startIndex - 1;
      startIndex = 1;
    }
    if (endIndex > totalPages) {
      startIndex -= endIndex - totalPages;
      endIndex = totalPages;
    }

    const pages = Array.from(
      { length: endIndex - startIndex + 1 },
      (_, index) => startIndex + index,
    );
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => !isFirstPage && handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
          className={`px-3 py-1 rounded-md border ${
            isFirstPage
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-white text-gray-700"
          }`}
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          className={`px-3 py-1 rounded-md border ${
            isLastPage
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-white text-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1>All Members</h1>
      <p className="text-lg text-center mt-4 mb-10">
        List of all the members of the DTU Times team.
      </p>
      <div className="px-3">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={(value) =>
            dispatch({ type: ActionType.SetSearchTerm, payload: value })
          }
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) =>
            dispatch({ type: ActionType.SetSelectedCategory, payload: value })
          }
        />
      </div>

      <div className="w-full  gap-4 flex-wrap flex justify-center items-center">
        {paginatedMembers.map((member) => (
          <div key={member.id}>
            <UserCard
              name={member.name}
              role={member.role}
              email={member.email}
              avatar={member.id}
            />
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
}
