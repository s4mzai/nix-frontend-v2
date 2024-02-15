import MoreVerticalIcon from "@/assets/MoreIcon";
import BlogStatus from "@/types/blogStatus";
import { useEffect, useState } from "react";
import { PermissionProtector } from "../PermissionProtector";
import Permission from "@/types/permissions";

interface MoreMenuProps {
  onDelete: (blogId: string) => void;
  onArchive: (blogId: string) => void;
  onEdit: (blogId: string) => void;
  onSubmit: (blogId: string) => void;
  blogId: string;
  status: BlogStatus;
}

export default function MoreMenu({ onDelete, onArchive, onEdit, onSubmit, blogId, status }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  //let menuRef = useRef(null);

  const handleDelete = () => {
    console.log("hi im in more menu this is blogid ", blogId);
    onDelete(blogId);
    setIsOpen(false);
  };

  const handleArchive = () => {
    console.log("hi im in more menu archive this is blogid ", blogId);
    onArchive(blogId);
    setIsOpen(false);
  };

  const handleEdit = () => {
    // these checks will actually make use feel ui isn't working, as it shows nothing if onEdit is not passed
    // better would be to let the global error handler handle and "post a toast"
    // if (onEdit) {
    onEdit(blogId);
    setIsOpen(false);
    // }
  };

  const handleSubmit = () => {
    onSubmit(blogId);
    setIsOpen(false);
  };

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
  });


  return (
    <div className="relative text-left">
      {/* <div ref={menuRef}> */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="px-2 py-1  text-black"
        >
          <MoreVerticalIcon />
        </button>
      </div>
      {isOpen && (
        <div className="z-10 origin-top-right absolute  bg-gray-200 rounded-md shadow-md">
          {!(status == BlogStatus.Published || status == BlogStatus.Approved) && (
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

          {
            (status == BlogStatus.Published || status == BlogStatus.Approved || status == BlogStatus.Pending) ?
              <PermissionProtector silent={true} permission={[Permission.DeleteBlog]}>
                <button
                  className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={handleArchive}
                >
                  Archive
                </button>
              </PermissionProtector>
              : <></>
          }

          {
            (status == BlogStatus.Draft) ?
              <button
                className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={handleSubmit}
              >
                Submit
              </button> : <></>
          }
        </div>
      )}
    </div>
  );
}
