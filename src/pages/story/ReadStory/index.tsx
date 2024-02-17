import { ErrorContext } from "@/contexts/error";
import { useContext, useReducer } from "react";
import { TagIcon } from "@/assets/TagIcon";
import { useLocation, useNavigate } from "react-router-dom";
import BlogStatus from "@/types/blogStatus";
import API from "@/services/API";
import { toast } from "react-toastify";
import parse from 'html-react-parser';

const convertHtml = (html: string): string => {
    const tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
};

export default function ReadStory() {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location.state?.key;
    const { setError } = useContext(ErrorContext);

    const handlePublishNow = () => {
        const choice = window.confirm(
            "Are you sure you want to publish this story?"
          );
          if (choice) {
            const publishEndPoint = `/blog/publish-blog/${blog._id}`;

            API.put(publishEndPoint)
                .then(() => {
                    toast.success("Successfully publishd");
                    navigate("/story/pending-stories");
                })
                .catch((e) => setError(e));
          }
    }

    const handlePublishLater = () => {
        //TODO: get some datetime picker
        console.log("Published later works");
    }

    const handleSaveToDraft = () => {
        //TODO: there should be an option to convert pending blogs to drafts
        console.log("Save to draft not impl in backend rn");
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow rounded">
            <h1 className="mb-10 text-4xl font-semibold text-center">{blog.title}</h1>
            <h4 className="m-2 font-semibold text-gray-500">Created By {blog.user.name}, Last Updated on {new Date(blog.updatedAt).toLocaleDateString()} </h4>
            <span
                className={`m-2 px-2 py-1 rounded-md ${BlogStatus[blog.status]}`}
                key={blog.category_id}
            >
                <TagIcon className="w-4 h-4 inline-block mr-1" />
                {BlogStatus[blog.status]}
            </span>
            <div className="m-2">
                <div> {blog.image} </div> {/*todo*/}
                <div className="mt-2 mb-2 text-gray-500"> {blog.byliner} </div>  
                <div className="text-gray-900 leading-relaxed"> {parse(blog.body)} </div>
            </div>
            
            <div>
                <button
                    onClick={handlePublishNow}
                    type="button"
                    className="py-1 px-2 me-2 m-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    >
                        Publish Now
                </button>
                <button
                    onClick={handlePublishLater}
                    type="button"
                    className="py-1 px-2 me-2 m-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    >
                        Publish Later
                </button>
                <button
                    onClick={handleSaveToDraft}
                    type="button"
                    className="py-1 px-2 me-2 m-1 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    >
                        Save Back to Draft
                </button>
            </div>

        </div>
    )
} 