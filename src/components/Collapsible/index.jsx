// use : <Collapsible label="your_label"> children </Collapsible>
export default function Collapsible (props) {
    return (
      <div className="max-w-4xl mx-auto py-12">
          <details className="bg-white rounded-md shadow-md">
            <summary className="flex justify-between items-center p-4 cursor-pointer">
              <h2 className="text-xl font-medium">{props.label}</h2>
              <ChevronDownIcon className="text-gray-400" />
            </summary>
            <div className="p-4">
              {props.children}
            </div>
          </details>
      </div>
    )
  }
  
  function ChevronDownIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    )
  }
