import { useEffect, useReducer} from "react";
import API from "@/services/API";
import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";

const initialState = {
  membersList: [],
  searchTerm: "",
  selectedCategory: "name",
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  const updatedData = { ...state };
  switch (action.type) {
    //underscore convention from react docs
    case "set_members_list":
      updatedData.membersList = action.payload;
      break;
    case "set_search_term":
      updatedData.searchTerm = action.payload;
      break;
    case "set_selected_category":
      updatedData.selectedCategory = action.payload;
      break;
    case "set_loading":
      updatedData.loading = action.payload;
      break;
    case "set_error":
      updatedData.error = action.payload;
      break;
    default:
      return updatedData;
  }
  return updatedData;
}

export default function AllMembers() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    membersList,
    searchTerm,
    selectedCategory,
    loading,
    error,
  } = state;

  const categories = ["Name", "Role", "Email"];

  useEffect(() => {
    const membersEndpoint = '/user';

    API.get(membersEndpoint)
        .then((membersResponse) => {
        dispatch({type: "set_members_list", payload: membersResponse.data.data});
        dispatch({type: "set_loading", payload: false});
    })
      .catch((error) => {
        dispatch({type: "set_error", payload: error});
        dispatch({type: "set_loading", payload: false});
      })   
  }, []);

  //filter members based on search term
  const filteredMembers = membersList.filter((member) => {
    const category = member[selectedCategory].toLowerCase();
    return category.includes(searchTerm.toLowerCase());
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-semibold text-center">All Members</h1>
      <p className="text-lg text-center mt-4 mb-10">
        List of all the members of the DTU Times team.
      </p>
      <div className="px-3">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearch={(value) => dispatch({type: "set_search_term", payload: value})} 
          categories = {categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => dispatch({ type: "set_selected_category", payload: value })}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {filteredMembers.map((member) => (
          <div key={member.id}>
            <UserCard name={member.name} role={member.role} email={member.email}>
              <h4>{member.email}</h4>
            </UserCard>
          </div>
        ))}
      </div>
    </div>
  );
}
