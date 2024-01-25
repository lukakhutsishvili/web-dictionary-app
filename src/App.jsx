import { useEffect, useRef, useState } from "react";
import { Header } from "./components";
import axios from "axios";

function App() {
  const [value, setvalue] = useState("");
  const [submitvalue, setsubmitvalue] = useState("keyboard");
  const [font, setfont] = useState("Inter");
  const [data, setdata] = useState();
  const [dark, setdark] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    const audioplay = data[0].phonetics.find((item) => item.audio !== "").audio;
    if (audioplay) {
      audioRef.current.src = audioplay;
      console.log(audioRef.current);
      audioRef.current.play();
    }
  };
  const handledark = () => {
    setdark(!dark);
  };

  const handleValue = (event) => {
    setvalue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setsubmitvalue(value);
  };

  const getdata = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${submitvalue}`
      );
      setdata(response.data);
      console.log(response.data);
    } catch (error) {
      setdata(false);
    }
  };

  useEffect(() => {
    getdata();
  }, [submitvalue]);

  return (
    <>
      <main
        className={` min-h-screen pl-6 pr-6 md:pl-10 md:pr-10 desktop:pl-large desktop:pr-large  ${
          font === "Lora"
            ? "font-lora"
            : font === "Inconsolata"
            ? "font-inconsolata"
            : font === "Inter"
            ? "font-inter"
            : null
        }  ${dark && "bg-black text-white"}`}
      >
        <Header
          value={value}
          handleValue={handleValue}
          handleSubmit={handleSubmit}
          font={font}
          setfont={setfont}
          submitvalue={submitvalue}
          dark={dark}
          setdark={setdark}
          handledark={handledark}
        />
        <section className="mt-6">
          {data && (
            <div>
              <div className="flex items-center">
                <div>
                  <h2 className=" font-bold text-3xl md:text-large">
                    {data[0].word}
                  </h2>
                  <p className=" text-hovervolor mt-2 md:mt-3 md:text-2xl">
                    {data[0].phonetic}
                  </p>
                </div>
                <svg
                  className="play ml-auto w-12 h-12 hover:fill-hovervolor hover:cursor-pointer  md:w-svg md:h-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 75 75"
                  onClick={handlePlay}
                >
                  <g fill="#A445ED" fillRule="evenodd">
                    <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                    <path className="path " d="M29 27v21l21-10.5z" />
                  </g>
                </svg>
              </div>
            </div>
          )}
          {data &&
            data[0].meanings.map((meaning, index) => {
              return (
                <div key={index}>
                  <div className="flex mt-7 items-center md:mt-10">
                    <p className=" font-bold text-lg italic md:text-2xl">
                      {meaning.partOfSpeech}
                    </p>
                    <div
                      className={`ml-4 w-full h-px  ${
                        dark ? "bg-darkdiv" : "bg-grey"
                      }`}
                    ></div>
                  </div>
                  <p className=" mt-8  text-md font-normal text-txtgrey md:mt-10 md:text-xl">
                    Meaning
                  </p>
                  <ul className="mt-4 flex flex-col gap-y-3">
                    {meaning.definitions.map((item, index) => {
                      return (
                        <div key={index}>
                          <li>
                            <p className=" font-normal text-base md:ml-2">
                              {item.definition}
                            </p>
                          </li>
                          {item.example && (
                            <p className="ml-6 mt-3 text-txtgrey font-normal text-base md:ml-12">
                              "{item.example}"
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </ul>
                  <div className="flex mt-6 gap-6 font-bold">
                    {meaning.synonyms.length > 0 && (
                      <p className=" font-normal text-txtgrey text-base">
                        synonyms
                      </p>
                    )}
                    {meaning.synonyms.map((synonym, index) => {
                      return (
                        <p
                          className=" font-bold text-hovervolor text-base"
                          key={index}
                        >
                          {synonym}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          <div
            className={` mt-8 h-px w-full  ${data ? "block" : "hidden"} ${
              dark ? "bg-darkdiv" : "bg-grey"
            }`}
          ></div>

          {data && (
            <div className="flex gap-4 mt-6">
              <p className="  underline font-normal text-txtgrey text-base">
                source
              </p>
              <div className="flex">
                <a
                  className="font-normal text-base underline flex items-center"
                  href={data[0].sourceUrls}
                >
                  <p>{data[0].sourceUrls}</p>
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <path
                      fill="none"
                      stroke="#838383"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {submitvalue === "" && (
            <p className=" -mt-4   text-red-600  font-normal text-xl">
              Whoops, can’t be empty…
            </p>
          )}

          {data == false && submitvalue !== "" && (
            <div className=" mt-32 grid justify-center">
              <img className="justify-self-center" src="/emojy.png" />
              <h3 className=" text-center  mt-11 font-bold text-xl">
                {" "}
                No Definitions Found
              </h3>
              <p className=" text-center font-normal text-lg text-txtgrey">
                Sorry pal, we couldn't find definitions for the word you were
                looking for. You can try the search again at later time or head
                to the web instead.
              </p>
            </div>
          )}
        </section>
        <audio ref={audioRef}></audio>
      </main>
    </>
  );
}

export default App;
