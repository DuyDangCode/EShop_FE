"use client";
const Search = () => {
  const handleOnClick = () => {
    console.log("Hello");
  };
  return (
    <div className=" flex gap-0">
      <input className=" border-0 w-[200px] lg:w-[500px]" />
      <button
        onClick={handleOnClick}
        className=" bg-zinc-700  w-[90px] text-white"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
