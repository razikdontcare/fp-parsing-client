import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`md:hidden flex-col flex items-center justify-center w-full absolute bg-white z-30 ${
          open ? "top-20" : "-top-96"
        } transition-all duration-500 ease-in-out p-5 gap-2`}
      >
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "w-full bg-button text-center p-3 rounded-xl font-bold"
              : "w-full text-center p-3"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/parser"}
          className={({ isActive }) =>
            isActive
              ? "w-full bg-button text-center p-3 rounded-xl font-bold"
              : "w-full text-center p-3"
          }
        >
          Parser
        </NavLink>
      </div>
      <nav className={`w-full flex items-center justify-center bg-navbar z-40`}>
        <div className="flex items-center justify-between container p-5 mx-auto">
          <div className="flex items-center justify-center gap-2 md:gap-5">
            <div className="size-10 md:size-12 lg:size-16 relative">
              <img
                src="/logo.png"
                alt="4Parser"
                className="absolute object-contain"
              />
            </div>
            <span className="text-2xl md:text-3xl lg:text-5xl font-bold italic text-white">
              <span className="text-title">4</span>Parser
            </span>
          </div>
          <div className="relative inset-0 md:hidden flex items-center justify-center gap-5 text-2xl lg:text-3xl text-white font-bold italic">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex relative items-center justify-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-8 ${
                  open ? "opacity-0 rotate-45" : "opacity-100"
                } absolute transition-all ease-in-out duration-300`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-8 ${
                  open ? "opacity-100" : "opacity-0 -rotate-45"
                } absolute transition-all ease-in-out duration-300`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center gap-5 text-2xl lg:text-3xl text-white font-bold italic">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/parser"}>Parser</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
