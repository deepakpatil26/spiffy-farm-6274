import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../types";

const Pagination1: React.FC = () => {
  const { total } = useSelector((store: RootState) => store.MenReducer);
  
  const getCurrentPage = (page: string | null): number => {
    const pageNum = Number(page);
    return typeof pageNum !== "number" || pageNum <= 0 || !pageNum ? 1 : pageNum;
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(getCurrentPage(searchParams.get("page")));

  const handlePage = (val: number) => {
    setPage((prev) => prev + val);
  };

  useEffect(() => {
    const params: Record<string, string> = {
      page: page.toString(),
    };
    setSearchParams(params);
  }, [page, setSearchParams]);

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="w-4/5 mx-auto my-8">
      <div className="flex justify-center items-center space-x-4">
        <button
          disabled={page === 1}
          onClick={() => handlePage(-1)}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors duration-200"
        >
          Prev
        </button>
        
        <span className="px-4 py-2 bg-gray-100 rounded-lg font-medium">
          {page}
        </span>
        
        <button
          disabled={page === totalPages}
          onClick={() => handlePage(+1)}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors duration-200"
        >
          Next
        </button>
      </div>
      
      <div className="text-center mt-4 text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination1;