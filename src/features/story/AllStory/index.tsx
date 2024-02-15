import { useEffect, useReducer } from "react";
import API from "@/services/API";
import Table from "@/components/Table";
import MoreMenu from "@/components/MoreMenu";
import SearchBar from "@/components/SearchBar";

import blogCategories from "@/data/categories";
import { blogStatus } from "@/data/blogStatus";

import { TagIcon } from "@/assets/TagIcon";
import { Spinner } from "@/components/Spinner";


const initialState = {
  blogs: [],
  searchTerm: "",
  statusFilters: ["Pending", "Published", "Approved", "Draft"],
  loading: true,
  error: null,
};

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
      // console.log(newStatusFilters, action.payload);
      newStatusFilters.splice(newStatusFilters.indexOf(action.payload), 1);
      // console.debug(newStatusFilters);
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

const getFilteredBlogs = (blogs, statusFilters, blogStatus, searchTerm) => {
  return blogs.filter((blog) =>
    statusFilters.includes(blogStatus[blog.status].name) &&
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const tableHeaders = ["Last Updated", "Title", "Category", "Status"];


export default function AllStory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    blogs,
    searchTerm,
    statusFilters,
    loading,
    error,
  } = state;

  const handleDelete = () => {
    //TODO delete story
    console.log("story deleted");
  };

  const handleEdit = () => {
    //TODO edit blog, should open the blog on the new blog view
    console.log("story edited");
  };

  useEffect(() => {
    const blogEndpoint = "/blog";

    API.get(blogEndpoint)
      .then((blogResponse) => {
        dispatch({type: "set_blogs", payload: blogResponse.data.data});
        dispatch({type: "set_loading", payload: false});
      })
      .catch((error) => {
        dispatch({type: "set_error", payload: error});
        dispatch({type: "set_loading", payload: false});
      });   
  }, []);



  if (loading) return <div className="flex w-full h-full justify-center items-center"><Spinner /></div>;
  if (error) return <p>Error: {error.message} </p>;

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-semibold text-center">Your Stories</h1>
      <div className="px-3 mt-4">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearch={(value) => dispatch({type: "set_search_term", payload: value})} 
        />
        <div className="flex mt-4 space-x-8">
          {blogStatus.map((status) => (
            <label key={status.id} className="ms-2  text-md text-gray-900">
              <input
                className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                type="checkbox"
                checked={statusFilters.includes(status.name)}
                onChange={() => dispatch({ type: "toggle_status_filter", payload: status.name})}
              />
              {status.name}
            </label>
          ))}
        </div>
      </div>
      <main className="flex-grow p-6">
        <Table 
          headers={tableHeaders} 
          content={getFilteredBlogs(blogs, statusFilters, blogStatus, searchTerm).map(blog => [
            new Date(blog.updatedAt).toLocaleDateString(),
            blog.title,
            blogCategories[blog.category_id].name,
            <span
              className={`px-2 py-1 rounded-md ${blogStatus[blog.status].color.bgClass} ${blogStatus[blog.status].color.textClass}`}
              key={blog.category_id}
            >
              <TagIcon className="w-4 h-4 inline-block mr-1" />
              {blogStatus[blog.status].name}
            </span>,
            <MoreMenu onDelete={handleDelete} onEdit={handleEdit} key={blog.id}/>
          ])}
          // todo : huh? more unknown attributes?
          // onDelete={handleDelete} 
          // onEdit={handleEdit}  
        />
      </main>
    </div>
  );
}
