import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";
import { HistoryIcon } from "lucide-react";
import Loading from "../assets/loading";
import saveHistory from "../lib/saveHistory";
import getHistory, { type History } from "../lib/getHistory";

export interface Data {
  accepted: boolean;
  text: string;
  table: string[][];
  tree: string | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function Parser() {
  const [history, setHistory] = useState<History[]>([]);
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<Data>({} as Data);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<boolean>(false);
  const [notEmpty, setNotEmpty] = useState<boolean>(false);
  const [isFromHistory, setIsFromHistory] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handle: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setShow(true);
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/parse`, {
        text: input,
      });

      const data = res.data as Data;
      if (!isFromHistory) {
        await saveHistory(data);
      }
      setResult(data);
      setLoading(false);
      setNotEmpty(true);

      const timeout = setTimeout(() => {
        setInput("");
      }, 100);

      return () => clearTimeout(timeout);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      setError(true);
      setLoading(false);
    }
  };

  const handleHistoryClick = (text: string) => {
    if (formRef.current) {
      setInput(text);
      setIsFromHistory(true);

      const timeout = setTimeout(() => {
        formRef.current?.requestSubmit();

        const isFromHistoryTimeout = setTimeout(() => {
          setIsFromHistory(false);
        }, 200);

        return () => clearTimeout(isFromHistoryTimeout);
      }, 100);

      return () => clearTimeout(timeout);
    }
  };

  useEffect(() => {
    getHistory().then((data) => setHistory(data));
  }, [history]);

  return (
    <>
      <Helmet>
        <title>4Parser | Parser</title>
      </Helmet>

      <div className="relative flex flex-col items-center mx-auto w-full min-h-screen md:h-screen bg-white p-2 gap-2">
        <Navbar />

        <div className="flex md:flex-row flex-col flex-1 items-center justify-center container mx-auto p-2 gap-3 lg:gap-8 z-20 text-white bg-gradient-to-b from-background-primary to-background-secondary rounded-xl overflow-hidden">
          <div className="flex items-center container max-w-lg justify-center flex-col h-full p-3 lg:p-8">
            <form
              ref={formRef}
              onSubmit={handle}
              className="flex flex-col items-center justify-center gap-5 h-full"
            >
              <div className="flex flex-col items-center max-w-xs md:max-w-full justify-center gap-10">
                <h1 className="font-bold md:text-4xl lg:text-5xl xl:text-6xl text-center">
                  Parsing Kalimat
                </h1>
                <p className="text-base md:text-sm lg:text-xl text-center max-w-3xl">
                  Periksa kalimat dengan pola dasar dalam bahasa Indonesia
                  dengan algoritma Cocke-Younger-Kasami (CYK)
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
                {loading ? "Loading..." : "Periksa"}
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center bg-white container h-full rounded-lg text-black p-5">
            <div className="flex items-center w-full justify-end">
              <button
                onClick={() => {
                  if (notEmpty) {
                    setShow((prev) => !prev);
                  }
                }}
                className="flex items-center gap-2"
              >
                <HistoryIcon />
                History
              </button>
            </div>
            <div
              className={`flex-1 flex flex-col overflow-auto items-center container h-full ${
                show && "justify-center"
              }`}
            >
              {show ? (
                loading ? (
                  <>
                    <Loading className="size-52" />
                  </>
                ) : (
                  <>
                    {!error ? (
                      <>
                        <span
                          className={`font-bold text-3xl ${
                            result.accepted ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {result.accepted ? "VALID" : "TIDAK VALID"}
                        </span>
                        <span className="text-xl text-center">
                          Untuk kalimat{" "}
                          <span className="font-bold">{result.text}</span>
                        </span>
                        {result.accepted && (
                          <>
                            <div className="w-full flex items-center justify-center gap-3">
                              {result.tree && (
                                <>
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
                                </>
                              )}
                            </div>
                            {active === 0 ? (
                              <div
                                className={`w-full h-full flex items-center justify-center overflow-x-auto`}
                              >
                                <table className="table-auto table-cell md:flex items-center justify-center container mx-auto">
                                  <tbody>
                                    {result.table.map((row, rindex) => (
                                      <tr key={rindex}>
                                        {row.map((text, cindex) => (
                                          <td
                                            key={cindex}
                                            className={`text-xs md:text-sm text-center p-3 ${
                                              rindex === result.table.length - 1
                                                ? "font-bold"
                                                : "border-2 border-black"
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
                              result.tree && (
                                <>
                                  <div
                                    className={`w-full h-full overflow-x-auto md:overflow-hidden flex items-center justify-center`}
                                  >
                                    <img
                                      src={result.tree}
                                      alt={result.text}
                                      className="w-96"
                                    />
                                  </div>
                                </>
                              )
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">Terjadi kesalahan</span>
                      </>
                    )}
                  </>
                )
              ) : (
                <>
                  <div className="flex flex-col w-full border-t border-b border-black mt-5">
                    {history.length > 0 ? (
                      history.map((h, index) => (
                        <button
                          key={index}
                          onClick={() => handleHistoryClick(h.text)}
                          className={`flex flex-col items-center justify-center w-full text-start ${
                            index !== history.length - 1 && "border-b"
                          } border-black py-3 hover:bg-black/5`}
                        >
                          <div className="flex items-center w-full gap-2">
                            <span className="min-w-20">Kalimat</span>
                            <span>:</span>
                            <span className="w-full">{h.text}</span>
                          </div>
                          <div className="flex items-center w-full gap-2">
                            <span className="min-w-20">Hasil</span>
                            <span>:</span>
                            <span
                              className={`w-full ${
                                h.accepted ? "text-[#159656]" : "text-[#D90000]"
                              }`}
                            >
                              {h.accepted ? "Valid" : "Tidak Valid"}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="flex items-center justify-center w-full py-5">
                        <span className="text-center">Tidak ada riwayat</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
