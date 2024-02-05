import { useState, useRef, useEffect } from "react"
import MoreVerticalIcon from "@/assets/MoreIcon";

export default function MoreMenu({ onDelete, onEdit }) {
    const [isOpen, setIsOpen] = useState(false);
    let menuRef = useRef(null);

    const handleDelete = () => {
        onDelete();
        setIsOpen(false);
    }

    const handleEdit = () => {
        onEdit();
        setIsOpen(false);
    }

    useEffect(() => {
        let handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    })


    return (
        <div className="relative text-left">
            <div ref={menuRef}>
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
                        <button
                            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                </div>
            )}
        </div>
    )
}

