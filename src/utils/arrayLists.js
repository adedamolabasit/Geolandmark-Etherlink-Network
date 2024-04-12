export function Modal({
  handleSelection,
  arrayState,
  setArrayState,
  listedData,
}) {
  const isEmptyArray = arrayState.length === 0;
  const handleArrayClick = (branch) => {
    if (arrayState.includes(branch)) {
      setArrayState(arrayState.filter((item) => item !== branch));
    } else {
      setArrayState([...arrayState, branch]);
    }
  };

  return (
    <div className="fixed flex justify-center items-center w-screen h-screen  bg-black bg-opacity-70 cursor-pointer z-15">
      <div className="flex flex-col justify-between gap-4 items-center w-[48.8vw] py-8 px-6 h-[51.6667vh] bg-[#1B1B1B] rounded-[3.1250vw]">
        <h1 className="text-xs ">
          {isEmptyArray ? "Choose Area(s)" : "Edit Choice(s)"}
        </h1>
        <div className="h-[30vh] overflow-y-auto w-full flex  justify-center items-center">
          <div className="flex flex-wrap justify-center gap-2 mt-6 text-[1.125rem]">
            {listedData.map((branch, index) => (
              <button
                key={index}
                onClick={() => handleArrayClick(branch)}
                className={`${
                  arrayState.includes(branch)
                    ? "text-violet-500 border-violet-500"
                    : "text-zinc-400 border-zinc-400"
                } px-4 py-2 rounded-[5.2083vw] border  text-xs`}
              >
                {branch}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSelection}
          className="w-[9.8438vw] h-[5.3704vh] bg-cyan-600 rounded-[10px]"
        >
          {" "}
          Done{" "}
        </button>
      </div>
    </div>
  );
}

export const Modal2 = ({ arrayState, setArrayState, listedData, ref }) => {
  const handleArrayClick = (branch) => {
    if (arrayState.includes(branch)) {
      setArrayState(arrayState.filter((item) => item !== branch));
    } else {
      setArrayState([...arrayState, branch]);
    }
  };
  return (
    <div
      ref={ref}
      className="absolute top-[8vh] z-10 left-0 w-full bg-[#D9D9D9]  h-[25vh] rounded-lg"
    >
      <div className="overflow-y-auto h-full">
        <div className="flex flex-col gap-2 justify-center items-start px-2  text-black ">
          {listedData.map((branch, index) => (
            <div
              key={index}
              onClick={() => handleArrayClick(branch)}
              className={`${
                arrayState.includes(branch)
                  ? "text-[#1B1B1B] bg-[#009FBD] w-full rounded-md"
                  : "text-[#1B1B1B] w-full "
              } px-4    text-xs cursor-pointer`}
            >
              {branch}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
