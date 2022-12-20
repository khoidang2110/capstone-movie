import React from "react";

const CardLoading = () => {
  return (
    <div className="h-80 w-full animate-pulse bg-slate-200">
      <div className="w-full h-full flex flex-col">
        <div className="p-3 h-4/6 w-full">
          <div className="bg-slate-300 h-full w-full rounded-md"></div>
        </div>
        <div className="grow p-3 flex flex-col justify-between">
          <div className="h-3 bg-slate-300 rounded"></div>
          <div className="flex justify-between">
            <div className="h-4 w-10 mr-3 bg-slate-300 rounded"></div>
            <div className="h-4 w-full ml-3 bg-slate-300 rounded"></div>
          </div>
          <div className="h-10 bg-slate-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
