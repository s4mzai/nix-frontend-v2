import React, { useEffect, useReducer } from "react";

import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";

import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";

import EditionCard from "@/components/EditionCard";
import Pagination from "@/components/Pagination";
import { EDITIONS_PER_PAGE as perPage } from "@/config";
import { Edition } from "@/types/edition";
import { EditionStatus } from "@/types/editionStatus";

interface AllEditionsState {
  editions: Edition[];
  searchTerm: string;
  statusFilters: EditionStatus[];
  loading: boolean;
  currentPage: number;
}

const initialState: AllEditionsState = {
  editions: [],
  searchTerm: "",
  statusFilters: Object.keys(EditionStatus)
    .map((v) => Number(v))
    .filter((v) => !isNaN(v)),
  loading: true,
  currentPage: 1,
};

const enum ActionType {
  SetEditions,
  SetSearchTerm,
  SetStatusFilers,
  SetLoading,
  SetCurrentPage,
}

const reducer = (
  state: AllEditionsState,
  action: { type: ActionType; payload },
) => {
  const updatedData = { ...state };
  const newStatusFilters = [...updatedData.statusFilters];
  switch (action.type) {
    case ActionType.SetEditions:
      updatedData.editions = action.payload;
      break;
    case ActionType.SetSearchTerm:
      updatedData.searchTerm = action.payload;
      break;
    case ActionType.SetStatusFilers:
      if (newStatusFilters.includes(action.payload)) {
        newStatusFilters.splice(newStatusFilters.indexOf(action.payload), 1);
      } else {
        newStatusFilters.push(action.payload);
      }
      updatedData.statusFilters = newStatusFilters;
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

const getFilteredEditions = (
  editions: Edition[],
  statusFilters: EditionStatus[],
  searchTerm: string,
) => {
  return editions.filter(
    (edition) =>
      statusFilters.includes(edition.status) &&
      (edition?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(edition?.edition_id).includes(searchTerm)),
  );
};

const editionEndpoint = "/edition";

export default function AllEditions() {
  const { setError } = React.useContext(ErrorContext);
  // umm reducer with a single state is just use state!?

  const [state, dispatch] = useReducer(reducer, initialState);
  const { editions, searchTerm, statusFilters, loading } = state;

  const fetchEditions = () => {
    API.get(editionEndpoint)
      .then((editionResponse) => {
        dispatch({
          type: ActionType.SetEditions,
          payload: editionResponse.data.data,
        });
        dispatch({ type: ActionType.SetLoading, payload: false });
      })
      .catch((error) => {
        setError(error);
        dispatch({ type: ActionType.SetLoading, payload: false });
      });
  };

  useEffect(() => {
    fetchEditions();
  }, []);
  const indexOfLastEdition = state.currentPage * perPage;
  const indexOfFirstEdition = indexOfLastEdition - perPage;
  const filteredEditions = getFilteredEditions(
    editions,
    statusFilters,
    searchTerm,
  );
  const paginatedEditions = filteredEditions.slice(
    indexOfFirstEdition,
    indexOfLastEdition,
  );

  if (loading)
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );

  const handlePageChange = (newPage: number) => {
    dispatch({ type: ActionType.SetCurrentPage, payload: newPage });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto py-12">
        <h1>Editions</h1>
        <p className="text-lg text-center mt-4 mb-8">
          The bread and butter of Times
        </p>
        <div className="px-3 mt-4">
          <SearchBar
            searchTerm={searchTerm}
            onSearch={(value) =>
              dispatch({ type: ActionType.SetSearchTerm, payload: value })
            }
          />
          <div className="flex mt-4 space-x-8">
            {Object.keys(EditionStatus)
              .filter((v) => isNaN(Number(v)))
              .map((status) => {
                return { status, id: EditionStatus[status] };
              })
              .map(({ status, id }) => (
                <label key={id} className="ms-2  text-md text-gray-900">
                  <input
                    id={id}
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    type="checkbox"
                    checked={statusFilters.includes(id)}
                    onChange={() =>
                      dispatch({
                        type: ActionType.SetStatusFilers,
                        payload: id,
                      })
                    }
                  />
                  {status}
                </label>
              ))}
          </div>
        </div>

        {filteredEditions.length === 0 ? (
          <h3 className="text-center p-3 mt-8 text-gray-900">
            No editions found.
          </h3>
        ) : (
          <div className="w-full my-5 gap-2 flex-wrap flex justify-right items-center">
            {paginatedEditions.map((edition) => (
              <div key={edition._id}>
                <EditionCard edition={edition} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-8 mb-16">
        <Pagination
          filtered_content={filteredEditions}
          current_page={state.currentPage}
          per_page={perPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
