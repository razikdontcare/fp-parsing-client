import { Routes, Route } from "react-router";
import Home from "./routes/home";
import Parser from "./routes/parser";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="parser" element={<Parser />} />
      </Routes>
    </>
  );
}

export default App;
