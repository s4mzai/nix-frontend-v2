import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "@/services/API";

import { ErrorContext } from "@/contexts/error";

import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import Table from "@/components/Table";

import { TagIcon } from "@/assets/TagIcon";
import BlogCategory from "@/types/blogCategory";
import BlogStatus from "@/types/blogStatus";
import { Blog } from "@/types/blog";
import { PENDING_BLOGS_PER_PAGE as perPage } from "@/config";

interface PendingStoriesState {
  blogs: Blog[];
  searchTerm: string;
  loading: boolean;
  currentPage: number;
}

const initialState: PendingStoriesState = {
  blogs: [],
  searchTerm: "",
  loading: true,
  currentPage: 1,
};

const enum ActionType {
  SetBlogs,
  SetSearchTerm,
  SetLoading,
  SetCurrentPage,
}

const blogEndpoint = "/blog";

const reducer = (
  state: PendingStoriesState,
  action: { type: ActionType; payload },
) => {
  const updatedData = { ...state };
  switch (action.type) {
    case ActionType.SetBlogs:
      updatedData.blogs = action.payload;
      break;
    case ActionType.SetSearchTerm:
      updatedData.searchTerm = action.payload;
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

const getFilteredBlogs = (blogs: Blog[], searchTerm) => {
  return blogs.filter((blog) =>
    blog?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

const tableHeaders = ["Last Updated", "Author", "Title", "Category", "Status"];

export default function PendingStories() {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { blogs, searchTerm, loading } = state;

  const handleRead = (blogId) => {
    API.get(`/blog/get-blog/${blogId}`)
      .then((blogResponse) => {
        const blogDetails = blogResponse.data.data;
        navigate(`/story/${blogId}`, { state: { key: blogDetails } });
      })
      .catch((e) => setError(e));
  };

  const fetchBlogs = () => {
    API.get(blogEndpoint)
      .then((blogResponse) => {
        dispatch({
          type: ActionType.SetBlogs,
          payload: blogResponse.data.data.filter(
            (blog) => blog.status == BlogStatus.Pending,
          ),
        });
        dispatch({ type: ActionType.SetLoading, payload: false });
      })
      .catch((error) => {
        setError(error);
        dispatch({ type: ActionType.SetLoading, payload: false });
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  const indexOfLastEdition = state.currentPage * perPage;
  const indexOfFirstEdition = indexOfLastEdition - perPage;

  const filteredEditions = getFilteredBlogs(blogs, searchTerm);
  const paginatedEditions = filteredEditions.slice(
    indexOfFirstEdition,
    indexOfLastEdition,
  );

  function Pagination() {
    if (filteredEditions.length === 0) {
      return <></>;
    }
    const { currentPage } = state;
    const totalPages = Math.ceil(filteredEditions.length / perPage);

    const handlePageChange = (newPage: number) => {
      dispatch({ type: ActionType.SetCurrentPage, payload: newPage });
    };

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages || totalPages === 0;
    const MAX_PAGES_TO_SHOW = 5;
    const startIndex = Math.max(
      1,
      currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2),
    );
    const endIndex = Math.min(
      Math.max(
        MAX_PAGES_TO_SHOW,
        currentPage + Math.floor(MAX_PAGES_TO_SHOW / 2),
      ),
      totalPages,
    );

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
      <h1>Pending Stories</h1>
      <div className="px-3 mt-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={(value) =>
            dispatch({ type: ActionType.SetSearchTerm, payload: value })
          }
        />
      </div>
      <main className="flex-grow p-6">
        <Table
          headers={tableHeaders}
          content={paginatedEditions.map((blog) => [
            <div key={blog._id} className="max-w-24">
              {new Date(blog.updatedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>,
            blog.user.name,
            <Link
              key={`read-${blog._id}`}
              to={`/story/${blog._id}`}
              state={{ blog: blog }}
            >
              {blog.title}
            </Link>,
            BlogCategory[blog.category_id],
            <span
              // tailwind is compiled to real css, so we can't use dynamic tailwind wale class names
              // alternative fix is to re-export these class names in index.css
              // i'm lazy, so i just did this impl instead
              className={`px-2 py-1 inline-block rounded-md ${
                BlogStatus[blog.status]
              }`}
              key={blog.category_id}
            >
              <TagIcon className="w-4 h-4 inline max-lg:hidden mr-1 size-min " />
              {BlogStatus[blog.status]}
            </span>,
            <div key={`${blog._id}-button`}>
              <button
                onClick={() => handleRead(blog._id)}
                type="button"
                className="py-1 px-2 me-2 m-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                Read Story
              </button>
            </div>,
          ])}
        />
      </main>
      <div className="flex justify-center mt-8 mb-16">
        <Pagination />
      </div>
    </div>
  );
}
