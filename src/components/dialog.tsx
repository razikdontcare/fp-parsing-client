import { Dispatch, ReactNode, SetStateAction } from "react";
import Loading from "../assets/loading";

export default function Dialog({
  children,
  show,
  loading,
  maximize,
  close,
}: {
  children: ReactNode;
  show: boolean;
  loading: boolean;
  maximize: [boolean, Dispatch<SetStateAction<boolean>>];
  close: () => void;
}) {
  const [isMaximize, setMaximize] = maximize;

  return (
    <>
      {show && (
        <div className="flex items-center justify-center w-full h-screen fixed top-0 left-0 z-50 backdrop-blur-[1px] bg-black/15 transition-all duration-300">
          <div
            className={`relative flex items-center justify-center flex-col bg-white p-5 md:p-10 ${
              isMaximize
                ? "min-w-full min-h-full"
                : "max-w-xs md:max-w-full md:min-w-96 md:min-h-96"
            } rounded-xl shadow-[0px_0px_13.1px_-1px_#00000045] transition-all duration-500 ease-in-out overflow-hidden`}
          >
            {loading ? <Loading className="size-52" /> : <>{children}</>}
            <div
              className={`absolute top-0 right-0 flex ${
                loading ? "hidden" : ""
              }`}
            >
              <button
                onClick={() => setMaximize((prev) => !prev)}
                className=" text-black p-2"
              >
                {isMaximize ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z"
                    ></path>
                  </svg>
                )}
              </button>
              <button onClick={close} className=" text-black p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
