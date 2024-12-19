import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <>
      <nav className="w-full flex items-center justify-center bg-navbar z-40">
        <div className="flex items-center justify-between container p-5 mx-auto">
          <div className="flex items-center justify-center gap-5">
            <div className="size-16 relative">
              <img
                src="/logo.png"
                alt="4Parser"
                className="absolute object-contain"
              />
            </div>
            <span className="text-5xl font-bold italic text-white">
              <span className="text-title">4</span>Parser
            </span>
          </div>
          <div className="flex items-center justify-center gap-5 text-3xl text-white font-bold italic">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/parser"}>Parser</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}
