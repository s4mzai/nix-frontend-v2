import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";

import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import Table from "@/components/Table";

import { Edition } from "@/types/edition";
import { EditionStatus } from "@/types/editionStatus";


interface AllEditionsState {
  editions: Edition[];
  searchTerm: string;
  loading: boolean;
}

const initialState: AllEditionsState = {
  editions: [],
  searchTerm : "",
  loading: true,
}

const enum ActionType {
  SetEditions,
  SetSearchTerm,
  SetLoading,
}

const reducer = (
  state: AllEditionsState,
  action: { type: ActionType; payload },
) => {
  const updatedData = { ...state };
  switch (action.type) {
    case ActionType.SetEditions:
      updatedData.editions = action.payload;
      break;
    case ActionType.SetSearchTerm:
      updatedData.searchTerm = action.payload;
      break;
    case ActionType.SetLoading:
      updatedData.loading = action.payload;
      break;
    default:
      return updatedData;
  }
  return updatedData;
};

const getFilteredEditions = (editions, searchTerm) => {
  return editions.filter((edition) =>
    edition?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

const editionEndpoint = "/edition";

export default function AllEditions() {
  const { setError } = React.useContext(ErrorContext);
  // umm reducer with a single state is just use state!? 

  const [state, dispatch] = useReducer(reducer, initialState);
  const { editions, searchTerm, loading } = state;

  const fetchEditions = () => {
    API.get(editionEndpoint)
      .then((editionResponse) => {
        dispatch({
          type: ActionType.SetEditions,
          payload: editionResponse.data.data
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


  // if (editions === null) {
  //   return (
  //     <div className="flex w-full h-screen justify-center items-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  const headers = ["Edition Number", "Name", "Status", "Published/Updated At"];
  if (loading)
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center">
        <Spinner />
      </div>
  );

  return (
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
      </div>

    <Table
      headers={headers}
      content={getFilteredEditions(editions, searchTerm).map((edition) => [
        edition.edition_id,       
        <Link
          key={`update-${edition._id}`}
          to={`/edition/update-edition/${edition._id}`}
          state={{ edition: edition }}
        >
          {edition.name}
        </Link>,
        EditionStatus[edition.status],
        edition.published_at
          ? new Date(edition.published_at).toDateString()
          : new Date(edition.updatedAt).toDateString(),
      ])}
    />
        </div>
  );
}
