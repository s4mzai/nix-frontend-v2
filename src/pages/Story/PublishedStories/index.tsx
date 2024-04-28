import { moreMenuOptionsGenerator } from "@/components/MoreMenu/generator";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import BlogTable from "@/components/Table/BlogTable";
import { PUBLISHED_BLOGS_PER_PAGE as perPage } from "@/config";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import { Blog } from "@/types/blog";
import BlogPageType from "@/types/blogPages";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PublishedStoriesState {
  blogs: Blog[];
  searchTerm: string;
  loading: boolean;
  currentPage: number;
}

const initialState: PublishedStoriesState = {
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

const reducer = (
  state: PublishedStoriesState,
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

const getFilteredBlogs = (blogs: Blog[], searchTerm: string) => {
  return blogs.filter((blog) =>
    blog?.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

const blogEndpoint = "/blog/published-blogs";

export default function PublishedStories() {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { blogs, searchTerm, loading } = state;
  const indexOfLastBlog = state.currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const filteredBlogs = getFilteredBlogs(blogs, searchTerm);
  const paginatedBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (newPage: number) => {
    dispatch({ type: ActionType.SetCurrentPage, payload: newPage });
  };

  const fetchBlogs = () => {
    API.get(blogEndpoint)
      .then((blogResponse) => {
        dispatch({
          type: ActionType.SetBlogs,
          payload: blogResponse.data.data,
        });
        dispatch({ type: ActionType.SetLoading, payload: false });
      })
      .catch((error) => {
        setError(error);
        dispatch({ type: ActionType.SetLoading, payload: false });
      });
  };

  const more_menu_options = (blog: Blog) =>
    moreMenuOptionsGenerator({ blog, navigate, fetchBlogs, setError, toast });

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1>Published Stories</h1>
      <div className="px-3 mt-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={(value) =>
            dispatch({ type: ActionType.SetSearchTerm, payload: value })
          }
        />
      </div>
      <main className="flex-grow p-6">
        <BlogTable
          page_type={BlogPageType.PublishedStories}
          paginatedBlogs={paginatedBlogs}
          more_menu_options={more_menu_options}
        />
      </main>
      <div className="flex justify-center mt-16 mb-8">
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
