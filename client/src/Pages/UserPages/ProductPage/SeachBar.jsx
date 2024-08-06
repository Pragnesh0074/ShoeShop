import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function SeachBar({ onSearchChange }) {
  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="flex bg-gray-300 h-12 w-full mt-7 rounded-2xl sm:h-14 lg:h-16">
      <div className="flex-row flex justify-center items-center mx-4 sm:mx-6 lg:mx-8">
        <MagnifyingGlassIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-gray-600" />
        <input
          type="text"
          name="search"
          className="ml-3 sm:ml-5 bg-gray-300 text-lg sm:text-xl lg:text-2xl outline-none w-full"
          placeholder="Search for tutorial videos"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default SeachBar;
