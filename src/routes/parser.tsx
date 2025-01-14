import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";
import Ellipse from "../assets/ellipse";
import Dialog from "../components/dialog";

export interface Data {
  accepted: boolean;
  text: string;
  table: string[][];
  tree: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function Parser() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<Data>({} as Data);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [maximize, setMaximize] = useState(false);
  const [active, setActive] = useState(0);

  const handle: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setShow(true);
    setLoading(true);
    const res = await axios.post(`${API_URL}/parse`, {
      text: input,
    });
    const data = res.data as Data;
    setResult(data);
    setLoading(false);
  };
  return (
    <>
      <Helmet>
        <title>4Parser | Parser</title>
      </Helmet>

      <div className="relative flex flex-col items-center mx-auto min-h-screen w-full bg-background overflow-hidden">
        <Navbar />
        <Ellipse className="hidden md:inline absolute bottom-0 text-[#222831] w-full inset-0 z-10 opacity-[0.36]" />

        <div className="flex items-center justify-center flex-col container mx-auto py-20 z-20 text-white">
          <form
            onSubmit={handle}
            className="flex flex-col items-center justify-center gap-5"
          >
            <div className="flex flex-col items-center max-w-xs md:max-w-2xl lg:max-w-full justify-center gap-10">
              <h1 className="font-bold text-6xl text-center">
                Parsing Kalimat
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-center max-w-3xl">
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
              type="submit"
              className="bg-button text-[#222831] px-16 py-5 rounded-xl font-medium hover:bg-button/80 transition-all duration-300 disabled:bg-neutral-500"
              disabled={loading || input === ""}
            >
              Periksa
            </button>
          </form>
        </div>
      </div>

      <Dialog
        show={show}
        loading={loading}
        close={() => setShow((prev) => !prev)}
        maximize={[maximize, setMaximize]}
      >
        <span className="text-xl">Hasil Parsing</span>
        <span
          className={`font-bold text-3xl ${
            result.accepted ? "text-green-500" : "text-red-500"
          }`}
        >
          {result.accepted ? "VALID" : "TIDAK VALID"}
        </span>
        <span className="text-xl">
          Untuk kalimat <span className="font-bold">{result.text}</span>
        </span>
        {result.accepted && (
          <>
            <div className="w-full flex items-center justify-center gap-3">
              <button
                onClick={() => setActive(0)}
                className={`w-full border ${
                  active === 0 ? "bg-button" : "bg-white"
                } transition-all duration-300`}
              >
                Tabel
              </button>
              <button
                onClick={() => setActive(1)}
                className={`w-full border ${
                  active === 1 ? "bg-button" : "bg-white"
                } transition-all duration-300`}
              >
                Tree
              </button>
            </div>
            {active === 0 ? (
              <div
                className={`w-full md:h-full ${
                  maximize ? "h-full" : "h-72"
                } overflow-x-auto md:overflow-hidden`}
              >
                <table className="table-auto container mx-auto mt-5 ">
                  <tbody>
                    {result.table.map((row, rindex) => (
                      <tr key={rindex}>
                        {row.map((text, cindex) => (
                          <td
                            key={cindex}
                            className={`text-xs md:text-base text-center p-5 border-2 border-black ${
                              rindex === result.table.length - 1
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            {text}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div
                  className={`w-full md:h-full ${
                    maximize ? "h-full" : "h-72"
                  } overflow-x-auto md:overflow-hidden flex items-center justify-center`}
                >
                  <img src={result.tree} alt={result.text} className="w-96" />
                </div>
              </>
            )}
          </>
        )}
      </Dialog>
    </>
  );
}
