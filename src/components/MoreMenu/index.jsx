import { useState, useRef, useEffect } from "react"
import MoreVerticalIcon from "@/assets/MoreIcon";

export default function MoreMenu({ onDelete, onArchive, onEdit=null, blogId }) {
  const [isOpen, setIsOpen] = useState(false);
  //let menuRef = useRef(null);

  const handleDelete = () => {
    console.log("hi im in more menu this is blogid ", blogId);
    onDelete(blogId);
    setIsOpen(false);
  }

  const handleArchive = () => {
    console.log("hi im in more menu archive this is blogid ", blogId);
    onArchive(blogId);
    setIsOpen(false);
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(blogId);
      setIsOpen(false);
    }

  }

  useEffect(() => {
    // let handler = (e) => {
    //   if (menuRef.current && !menuRef.current.contains(e.target)) {
    //     setIsOpen(false);
    //   }
    // };

    // document.addEventListener("mousedown", handler);

    // return() => {
    //   document.removeEventListener("mousedown", handler);
    // }
  })


  return (
    <div className="relative text-left">
      {/* <div ref={menuRef}> */}
      <div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="px-2 py-1  text-black"
        >
          <MoreVerticalIcon/>
        </button>
      </div>
      {isOpen && (
        <div  className="z-10 origin-top-right absolute  bg-gray-200 rounded-md shadow-md">
          {onEdit && (
            <button
              className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleEdit}
            >
                             Edit
            </button>
          )}
         
          <button
            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={handleDelete}
          >
                            Delete
          </button>
          <button
            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={handleArchive}
          >
                            Archive
          </button>
        </div>
      )}
    </div>
  )
}

