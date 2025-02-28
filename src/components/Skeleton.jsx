import React from "react";

const Skeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
            <div className="w-[250px] p-4 rounded  shadow-xl animate-pulse">
      <div className="w-full bg-gray-200 mb-3 h-[200px] rounded"></div>
      <div className="h-4 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
    </div>

    <div className="w-[250px] p-4 rounded  shadow-xl animate-pulse">
      <div className="w-full bg-gray-200 mb-3 h-[200px] rounded"></div>
      <div className="h-4 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
    </div>

    <div className="w-[250px] p-4 rounded  shadow-xl animate-pulse">
      <div className="w-full bg-gray-200 mb-3 h-[200px] rounded"></div>
      <div className="h-4 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
    </div>

    <div className="w-[250px] p-4 rounded  shadow-xl animate-pulse">
      <div className="w-full bg-gray-200 mb-3 h-[200px] rounded"></div>
      <div className="h-4 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
    </div>
    </div>
  );
};

export default Skeleton;
