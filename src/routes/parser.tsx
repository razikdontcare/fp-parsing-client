import { MouseEventHandler, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";
import Ellipse from "../assets/ellipse";

export interface Data {
  accepted: boolean;
  text: string;
  table: string[][];
  mermaid: string;
  dot: string;
}

export default function Parser() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<Data>({} as Data);

  const handle: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://fp-parsing.vercel.app/parse", {
      text: input,
    });
    const data = res.data as Data;
    setResult(data);
  };
  return (
    <>
      <Helmet>
        <title>4Parser | Parser</title>
      </Helmet>

      <div className="flex flex-col items-center mx-auto min-h-screen w-full bg-background">
        <Navbar />
        <Ellipse className="absolute top-0 left-0 z-10 opacity-[0.36]" />

        <div className="flex items-center justify-center flex-col container mx-auto py-20 z-20 text-white">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center justify-center gap-10">
              <h1 className="font-bold text-6xl">Parsing Kalimat</h1>
              <p className="text-2xl text-center max-w-3xl">
                Periksa kalimat dengan pola dasar dalam bahasa Indonesiadengan
                algoritma Cocke-Younger-Kasami (CYK)
              </p>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Masukkan kalimat..."
                className="bg-white rounded-xl py-5 px-5 text-black container mx-auto"
              />
            </div>
            <span className="text-[#F3F3F3]/50 self-start">
              Contoh: Saya sedang belajar di kampus
            </span>
            <button
              onClick={handle}
              className="bg-button text-[#222831] px-16 py-5 rounded-xl font-medium hover:bg-button/80 transition-all duration-300"
            >
              Periksa
            </button>
          </div>
          {result.accepted && (
            <table className="table-auto container mx-auto z-30 mt-20">
              <tbody>
                {result.table.map((row, rindex) => (
                  <tr key={rindex}>
                    {row.map((text, cindex) => (
                      <td
                        key={cindex}
                        className={` text-center p-5 border-2 border-white text-white ${
                          rindex === result.table.length - 1 ? "font-bold" : ""
                        }`}
                      >
                        {text}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
