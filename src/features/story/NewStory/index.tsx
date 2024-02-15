import TextEditor from "@/components/TextEditor";
import { CurrUserCtx } from "@/contexts/current_user";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import { getUserFromStorage } from "@/services/localStorageParser";
import { useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// const TextEditor = React.lazy(() => import("@/components/TextEditor"))
const initialState = {
  title: "",
  byliner: "",
  content: "",
  slug: "",
  selectedCategory: 0, //to do 
  createdAt: "",
  blogImage: undefined,
  metaDescription: "",
  metaTitle: "",
  error: null,
};

const reducer = (state, action) => {
  const updatedData = { ...state };
  switch (action.type) {
  case "set_title":
    updatedData.title = action.payload;
    break;
  case "set_byliner":
    updatedData.byliner = action.payload;
    break;
  case "set_content":
    updatedData.content = action.payload;
    break;
  case "set_slug":
    updatedData.slug = action.payload;
    break;
  case "set_selected_category":
    updatedData.selectedCategory = action.payload;
    break;
  case "set_blog_image":
    updatedData.blogImage = action.payload;
    break;
  case "set_meta_description":
    updatedData.metaDescription = action.payload;
    break;
  case "set_meta_title":
    updatedData.metaTitle = action.payload;
    break;
  case "set_error":
    updatedData.error = action.payload;
    break;
  default:
    return updatedData;
  }
  return updatedData;
};

export default function NewStory() {
  const navigate = useNavigate();
  const { setError } = useContext(ErrorContext);
  const { user } = useContext(CurrUserCtx);

  const location = useLocation();
  const draftBlog = location.state?.key; //if we are redirected from edit in allstory
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    title,
    byliner,
    content,
    slug,
    selectedCategory,
    blogImage,
    metaDescription,
    metaTitle,
    error,
  } = state;

  const categories = ["Editorial", "Blog", "Interview", "Edition"];

  useEffect(() => {
    console.log(draftBlog);
    console.log(getUserFromStorage().user);
    if (draftBlog) {
      dispatch({ type: "set_title", payload: draftBlog.title });
      dispatch({ type: "set_byliner", payload: draftBlog.byliner });
      dispatch({ type: "set_content", payload: draftBlog.body });
      dispatch({ type: "set_slug", payload: draftBlog.slug });
      dispatch({ type: "set_selected_category", payload: draftBlog.category_id });
      dispatch({ type: "set_blog_image", payload: draftBlog.blog_image });
      dispatch({ type: "set_meta_description", payload: draftBlog.meta_description });
      dispatch({ type: "set_meta_title", payload: draftBlog.meta_title });
    }
  }, [draftBlog]);

  const handleSubmit = (e, saveAsDraft) => {
    console.log(saveAsDraft);
    e.preventDefault();

    if (!title || !byliner || !metaDescription || !metaTitle || !slug) {
      toast.error("Please fill out all the required fields.");
      return;
    }

    const request = {
      title: title,
      byliner: byliner,
      slug: slug,
      body: content,
      category_id: 0,
      meta_title: metaTitle,
      meta_description: metaDescription,
      user_id: user.id, // todo: what? where is this user? fix this: FIXED
      saveAsDraft: saveAsDraft,
    };


    const endPoint = draftBlog ? `/blog/update-blog/${draftBlog._id}` : "/blog/create-blog";
    const requestMethod = draftBlog ? "PUT" : "POST";

    API({
      method: requestMethod,
      url: endPoint,
      data: request
    })
      .then(() => {
        const successMessage = saveAsDraft ? "Successfully saved" : "Successfully submitted";
        toast.success(successMessage, {
          onClose: () => {
            //let the toast notif be seen its v pretty 
            setTimeout(() => {
              navigate("/story/all-story", { replace: true });
            }, 2000);
          }
        });
      })
      .catch((e) => setError(e));
  };

  if (error) return <p>Error: {error.message} </p>;

  return (
    <form className="max-w-4xl mx-auto my-10 p-8 bg-white shadow rounded">
      {/* {user ? <h1>{user.name}</h1> : <h1>HY</h1>} */}
      <h1 className="text-4xl font-bold mb-4">
        <input
          className="text-4xl  mb-4 focus:outline-none leading-tight"
          id="title"
          placeholder="Give this story some title"
          autoFocus={true}
          value={title}
          onChange={(e) => dispatch({ type: "set_title", payload: e.target.value })}
        />
      </h1>
      <div className="mb-6 ">
        <label className="block mb-2" htmlFor="byliner">
          Byliner
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          id="byliner"
          placeholder="Byliner sells the story, give this a byliner."
          value={byliner}
          onChange={(e) => dispatch({ type: "set_byliner", payload: e.target.value })}
        />
      </div>

      <div className="mb-6">
        {/*  todo: fix type error */}
        <div className="block mb-2" htmlFor="ck_editor">
          Content
          <div className="py-2 w-full border-gray-300 rounded" id="ck_editor">
            <TextEditor
              value={content}
              onChange={(value) => dispatch({ type: "set_content", payload: value })}
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">SEO Details</h2>
      <div className="mb-6">
        <label className="block mb-2" htmlFor="category">
          Category
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          id="category"
          value={selectedCategory}
          onChange={(e) => dispatch({ type: "set_selected_category", payload: e.target.value })}
        >
          {categories.map((category) => (
            <option className="bg-white border-none" key={category} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-2" htmlFor="blog-image">
          Blog image
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          id="blog-image"
          type="file"
          value={blogImage}
          onChange={(e) => dispatch({ type: "set_blog_image", payload: e.target.files[0] })}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2" htmlFor="meta-description">
          Meta Description
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded h-20"
          id="meta-description"
          placeholder="Enter meta description here"
          value={metaDescription}
          onChange={(e) => dispatch({ type: "set_meta_description", payload: e.target.value })}

        />
      </div>
      <div className="mb-6">
        <label className="block mb-2" htmlFor="meta-title">
          Meta Title
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded h-20"
          id="meta-title"
          placeholder="Enter meta title here"
          value={metaTitle}
          onChange={(e) => dispatch({ type: "set_meta_title", payload: e.target.value })}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2" htmlFor="slug">
          Slug
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          id="slug"
          placeholder="Enter slug here"
          value={slug}
          onChange={(e) => dispatch({ type: "set_slug", payload: e.target.value })}
        />
      </div>

      <div className="flex space-x-4">
        <button className="bg-gray-200 text-black p-2 rounded hover:bg-indigo-500" onClick={(e) => handleSubmit(e, true)}>Save as Draft</button>
        <button className="bg-green-500 text-white p-2 rounded hover:bg-indigo-500" onClick={(e) => handleSubmit(e, false)}>Submit for approval</button>
      </div>
    </form>
  );
}