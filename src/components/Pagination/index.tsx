interface PaginationProps<T> {
  filtered_content: T[];
  current_page: number;
  per_page: number;
  handlePageChange: (newPage: number) => void;
}

export default function Pagination<T>({
  filtered_content,
  current_page,
  per_page,
  handlePageChange,
}: PaginationProps<T>) {
  if (filtered_content.length === 0) {
    return <></>;
  }
  const totalPages = Math.ceil(filtered_content.length / per_page);

  //   const handlePageChange = (newPage: number) => {
  //     dispatch({ type: ActionType.SetCurrentPage, payload: newPage });
  //   };

  const isFirstPage = current_page === 1;
  const isLastPage = current_page === totalPages || totalPages === 0;
  const MAX_PAGES_TO_SHOW = 5;
  const startIndex = Math.max(
    1,
    current_page - Math.floor(MAX_PAGES_TO_SHOW / 2),
  );
  const endIndex = Math.min(
    Math.max(
      MAX_PAGES_TO_SHOW,
      current_page + Math.floor(MAX_PAGES_TO_SHOW / 2),
    ),
    totalPages,
  );

  const pages = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, index) => startIndex + index,
  );
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => !isFirstPage && handlePageChange(current_page - 1)}
        disabled={isFirstPage}
        className={`px-3 py-1 rounded-md border ${
          isFirstPage
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-white text-gray-700"
        }`}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            current_page === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => !isLastPage && handlePageChange(current_page + 1)}
        disabled={isLastPage}
        className={`px-3 py-1 rounded-md border ${
          isLastPage
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-white text-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}
