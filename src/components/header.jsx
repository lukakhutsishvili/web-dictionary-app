import axios from "axios";
import Book from "./book";
import Moon from "./moon";
import Search from "./search";
import { useEffect, useState } from "react";

const Header = (props) => {
  const {
    value,
    handleSubmit,
    handleValue,
    font,
    setfont,
    submitvalue,
    handledark,
    dark,
    setdark,
  } = props;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(!isHovered);
  };

  const handlefont = (font) => {
    setfont(font);
  };

  const whichfont = () => {
    switch (font) {
      case "Lora":
        return "Serif";
      case "Inconsolata":
        return "Mono";
      default:
        return "Sans serif";
    }
  };

  return (
    <>
      <div className="flex pt-6 align-items-center desktop:pt-14">
        <Book />
        <div className="flex items-center ml-auto">
          <div
            className="flex items-center relative hover:cursor-pointer "
            onClick={handleMouseEnter}
          >
            <h1 className=" font-bold text-base md:text-lg">{whichfont()}</h1>
            <svg
              className="ml-4"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              viewBox="0 0 14 8"
            >
              <path
                fill="none"
                stroke="#A445ED"
                strokeWidth="1.5"
                d="m1 1 6 6 6-6"
              />
            </svg>
            <div
              className={`absolute pt-4 pb-4 pl-4 top-11 z-10 -left-4 w-28 rounded-2xl shadow-box  gap-2  md:w-44 md:py-6 md:pl-6 md:gap-4 md:-left-14
             ${isHovered ? "grid" : "hidden"} ${
                dark ? "bg-darkinput shadow-hovervolor" : " bg-white "
              }`}
            >
              <p
                onClick={() => handlefont("Inter")}
                className=" font-bold text-base font-inter hover:cursor-pointer hover:text-hovervolor md:text-lg"
              >
                Sans Serif
              </p>
              <p
                onClick={() => handlefont("Lora")}
                className=" font-bold text-base font-lora hover:cursor-pointer hover:text-hovervolor md:text-lg"
              >
                Serif
              </p>
              <p
                onClick={() => handlefont("Inconsolata")}
                className=" font-bold text-base font-inconsolata hover:cursor-pointer hover:text-hovervolor md:text-lg"
              >
                Mono
              </p>
            </div>
          </div>
          <div className=" ml-4 w-px h-full bg-gray-200 md:ml-6 "></div>
          <div
            onClick={handledark}
            className={`ml-4  w-10 h-5  rounded-xl grid items-center pl-1 pr-1 hover:bg-hovervolor hover:cursor-pointer md:ml-6 ${
              dark ? "bg-hovervolor" : "bg-slate-500"
            } `}
          >
            <div
              className={`w-oval h-oval bg-white rounded-2xl transition ${
                dark && " ml-auto "
              }`}
            ></div>
          </div>
          <Moon dark={dark} />
        </div>
      </div>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className=" mt-6 md:mt-14"
      >
        <div
          className={`   ${
            dark ? "bg-darkinput" : "bg-gray-200"
          }  grid relative items-center  rounded-2xl overflow-hidden hover:border hover: border-hovervolor  pr-6 md:h-16   ${
            submitvalue === "" && " border border-red-700"
          }`}
        >
          <input
            onChange={handleValue}
            value={value}
            type="text"
            className={` appearance-none ${
              dark ? "bg-darkinput" : "bg-gray-200"
            } pt-4 pr-6 pb-4 pl-6 border-none outline-none md:pt-5 md:pr-6 md:pb-5 md:pl-6 text-Base font-bold  w-full `}
          />
          <Search handleSubmit={handleSubmit} submitvalue={submitvalue} />
        </div>
      </form>
    </>
  );
};

export default Header;
