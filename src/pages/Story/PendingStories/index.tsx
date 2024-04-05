import { useContext, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "@/services/API";

import { ErrorContext } from "@/contexts/error";

import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import Table from "@/components/Table";

import { TagIcon } from "@/assets/TagIcon";
import MoreMenu from "@/components/MoreMenu";
import Pagination from "@/components/Pagination";
import { PENDING_BLOGS_PER_PAGE as perPage } from "@/config";
import { Blog } from "@/types/blog";
import BlogCategory from "@/types/blogCategory";
import BlogStatus from "@/types/blogStatus";
import Permission from "@/types/permissions";
import { toast } from "react-toastify";
import { moreMenuOptionsGenerator } from "@/components/MoreMenu/generator";

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
      updatedData.currentPage = 1;
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

  const more_menu_options = (blog: Blog) =>
    moreMenuOptionsGenerator({ blog, navigate, fetchBlogs, setError, toast });

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

  const indexOfLastBlog = state.currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;

  const filteredBlogs = getFilteredBlogs(blogs, searchTerm);
  const paginatedBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (newPage: number) => {
    dispatch({ type: ActionType.SetCurrentPage, payload: newPage });
  };

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
          content={paginatedBlogs.map((blog) => [
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
            <MoreMenu
              options={more_menu_options(blog)}
              blogId={blog._id}
              key={blog._id}
            />,
          ])}
        />
      </main>
      <div className="flex justify-center mt-8 mb-16">
        <Pagination
          filtered_content={filteredBlogs}
          current_page={state.currentPage}
          per_page={perPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
