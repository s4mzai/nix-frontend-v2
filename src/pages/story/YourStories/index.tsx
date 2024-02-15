import { TagIcon } from "@/assets/TagIcon";
import MoreMenu from "@/components/MoreMenu";
import SearchBar from "@/components/SearchBar";
import { Spinner } from "@/components/Spinner";
import Table from "@/components/Table";
import { ErrorContext } from "@/contexts/error";
import BlogCategory from "@/types/blogCategory";
import BlogStatus from "@/types/blogStatus";
import API from "@/services/API";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  blogs: [],
  searchTerm: "",
  statusFilters: Object.keys(BlogStatus).map((v) => Number(v)).filter((v) => !isNaN(v)),
  loading: true,
  error: null,
};

const blogEndpoint = "/blog";


const reducer = (state, action) => {
  const updatedData = { ...state };
  const newStatusFilters = [...updatedData.statusFilters];
  switch (action.type) {
  case "set_blogs":
    updatedData.blogs = action.payload;
    break;
  case "set_search_term":
    updatedData.searchTerm = action.payload;
    break;
  case "toggle_status_filter":
    //also spread operator creates only a shallow copy so mutable data structures like arrays still
    //refer to their originals. so we need to spread it out again
    //if present in filter, remove. Else, add
    if (newStatusFilters.includes(action.payload)) {
      console.log(newStatusFilters, action.payload);
      newStatusFilters.splice(newStatusFilters.indexOf(action.payload), 1);
      console.debug(newStatusFilters);
    } else {
      newStatusFilters.push(action.payload);
    }
    updatedData.statusFilters = newStatusFilters;
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
};

const getFilteredBlogs = (blogs, statusFilters, searchTerm) => {
  return blogs.filter((blog) =>
    statusFilters.includes(blog.status) &&
    blog?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const tableHeaders = ["Last Updated", "Title", "Category", "Status"];


export default function AllStory() {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    blogs,
    searchTerm,
    statusFilters,
    loading,
  } = state;

  const handleDelete = (blogId) => {
    const choice = window.confirm(
      "Are you sure you want to delete this story?"
    );
    if (choice) {
      const deleteEndPoint = `/blog/delete-blog/${blogId}`;

      API.delete(deleteEndPoint)
        .then(() => {
          toast.success("Successfully deleted");
          fetchBlogs();
        })
        .catch((e) => setError(e));
      console.log("story deleted");
    }
  };

  const handleArchive = (blogId) => {
    //archive is same as takedown dw
    const choice = window.confirm(
      "Are you sure you want to archive this story?"
    );
    if (choice) {
      const archiveEndPoint = `/blog/take-down-blog/${blogId}`;

      API.put(archiveEndPoint)
        .then(() => {
          toast.success("Successfully archived");
          fetchBlogs();
        })
        .catch((e) => setError(e));
      console.log("story archived");
    }
  };

  const handleEdit = (blogId) => {
    //TODO edit blog, should open the blog on the new blog view
    API.get(`/blog/get-blog/${blogId}`)
      .then((blogResponse) => {
        const blogDetails = blogResponse.data.data;
        navigate("/story/new-story", { state: { key: blogDetails } });
      })
      .catch((e) => setError(e));
    console.log("story edited");
  };

  const handleSubmit = (blogId) => {
    const choice = window.confirm(
      "Are you sure you want to submit this story for approval?"
    );
    if (choice) {
      API.put(`/blog/submit-for-approval/${blogId}`)
        .then((_) => {
          toast.success("Successfully submitted for approval!");
          fetchBlogs();
        })
        .catch((e) => setError(e));
      console.log("story submitted");
    }
  };

  const fetchBlogs = () => {
    API.get(blogEndpoint, { data: { userOnly: true } })
      .then((blogResponse) => {
        console.log(blogResponse.data.data);
        dispatch({ type: "set_blogs", payload: blogResponse.data.data });
        dispatch({ type: "set_loading", payload: false });
      })
      .catch((error) => {
        setError(error);
        dispatch({ type: "set_loading", payload: false });
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);


  if (loading) return <div className="flex justify-center items-center"><Spinner /></div>;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-semibold text-center">Your Stories</h1>
      <div className="px-3 mt-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={(value) => dispatch({ type: "set_search_term", payload: value })}
        />
        <div className="flex mt-4 space-x-8">
          {
            Object.keys(BlogStatus)
              .filter((v) => isNaN(Number(v)))
              .map((status) => { return { status, id: BlogStatus[status] }; })
              .map(({ status, id }) => (
                <label key={id} className="ms-2  text-md text-gray-900">
                  <input
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    type="checkbox"
                    checked={statusFilters.includes(id)}
                    onChange={() => dispatch({ type: "toggle_status_filter", payload: id })}
                  />
                  {status}
                </label>
              ))
          }
        </div>
      </div>
      <main className="flex-grow p-6">
        <Table
          headers={tableHeaders}
          content={getFilteredBlogs(blogs, statusFilters, searchTerm).map(blog => [
            new Date(blog.updatedAt).toLocaleDateString(),
            blog.title,
            BlogCategory[blog.category_id],
            <span
              // tailwind is compiled to real css, so we can't use dynamic tailwind wale class names
              // alternative fix is to re-export these class names in index.css
              // i'm lazy, so i just did this impl instead
              className={`px-2 py-1 rounded-md ${BlogStatus[blog.status]}`}
              key={blog.category_id}
            >
              <TagIcon className="w-4 h-4 inline-block mr-1" />
              {BlogStatus[blog.status]}
            </span>,
            <MoreMenu
              onDelete={handleDelete}
              onArchive={handleArchive}
              onEdit={handleEdit}
              onSubmit={handleSubmit}
              blogId={blog._id}
              key={blog._id}
              status={blog.status}
            />
          ])}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}