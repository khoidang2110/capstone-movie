import React from "react";

const PageLoading = ({ classname }) => {
  return (
    <div className={`${classname ?? "h-screen"} w-full flex items-center justify-center bg-slate-700`}>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-orange-600"></div>
    </div>
  );
};

export default PageLoading;
