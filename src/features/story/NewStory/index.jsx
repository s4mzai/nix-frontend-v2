import { useEffect, useState } from "react";
import { TextEditor } from "../../../components/TextEditor";


export default function NewStory() {
    const [title, setTitle] = useState('');
    const [byliner, setByliner] = useState('');
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [blogImage, setBlogImage] = useState(undefined);
    const [metaDescription, setMetaDescription] = useState('');
    const [metaTitle, setMetaTitle] = useState('');

    return (
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow rounded ">
        <h1 className="text-4xl font-bold mb-4">
          <input 
            className="text-4xl  mb-4 focus:outline-none leading-tight"
            id="title"
            placeholder="Give this story some title"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setByliner(e.target.value)}           
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2" htmlFor="byliner">
              Content
          </label>
          <div className="w-full border-gray-300 rounded">
            <TextEditor></TextEditor>
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
            onChange={(e) => setSelectedCategory(e.target.value)}

          />
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
            onChange={(e) => setBlogImage(e.target.files[0])}/>
        </div>

        <div className="mb-6">
          <label className="block mb-2" htmlFor="meta-description">
            Meta Description here
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded h-20"
            id="meta-description"
            placeholder="Meta Description here"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2" htmlFor="meta-title">
            Meta Title here
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded h-20"
            id="meta-title"
            placeholder="Meta Title here"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
        </div>

        <div className="flex space-x-4">
          <button className="bg-gray-200 text-black p-2 rounded hover:bg-indigo-500">Save as Draft</button>
          <button className="bg-green-500 text-white p-2 rounded hover:bg-indigo-500">Submit for approval</button>
        </div>
      </div>
    )
  }
