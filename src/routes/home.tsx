import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>4Parser | Home</title>
        <meta
          name="description"
          content="4Parser adalah sebuah website yang dirancang untuk memproses dan menganalisis data dalam bentuk kalimat maupun angka."
        />
      </Helmet>

      <div className="flex flex-col items-center mx-auto min-h-screen w-full bg-background overflow-hidden">
        <Navbar />

        <div className="flex items-center justify-center flex-col container mx-auto py-20 gap-24 transition-all duration-300">
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="flex flex-col gap-3 max-w-sm w-full items-center justify-center">
              <h1 className="text-white text-2xl xl:text-4xl italic font-bold">
                What is <span className="text-title">Parser</span>
              </h1>
              <span className="h-[0.1rem] w-full bg-title" />
            </div>
            <p className="italic text-white md:text-center text-sm max-w-xs md:max-w-full text-justify xl:text-xl">
              Parser adalah alat atau program yang digunakan untuk menganalisis
              dan memproses data, seperti teks atau angka, dengan cara
              memecahnya menjadi bagian-bagian yang lebih kecil dan terstruktur.
              Tujuan utamanya adalah untuk memahami dan mengubah data dari satu
              format ke format lain yang lebih terorganisir, sehingga dapat
              diproses atau digunakan lebih lanjut.
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="flex flex-col gap-3 max-w-sm w-full items-center justify-center">
              <h2 className="text-white text-2xl xl:text-4xl italic font-bold">
                About <span className="text-title">Us</span>
              </h2>
              <span className="h-[0.1rem] w-full bg-title" />
            </div>
            <p className="italic text-white md:text-center text-sm max-w-xs md:max-w-full text-justify xl:text-xl">
              4Parser adalah sebuah website yang dirancang untuk memproses dan
              menganalisis data dalam bentuk kalimat maupun angka. Website ini
              berfungsi untuk melakukan parsing, yaitu memecah data menjadi
              elemen-elemen yang lebih terstruktur dan mudah dipahami, sehingga
              memudahkan pengguna dalam mengelola atau memanfaatkan informasi
              tersebut.
            </p>
          </div>
          <div className="flex items-center justify-center flex-col gap-3">
            <div className="flex flex-col gap-3 max-w-sm w-full items-center justify-center">
              <h2 className="text-white text-2xl xl:text-4xl italic font-bold">
                <span className="text-title">4</span>Parser Developer
              </h2>
              <span className="h-[0.1rem] w-full bg-title" />
            </div>
            <div className="flex-col md:flex-row flex-nowrap flex md:flex-wrap items-center justify-center container mx-auto gap-5 pt-5 max-w-xs md:max-w-full">
              <img
                src="/razik.jpg"
                alt="razik"
                className="aspect-square rounded-xl md:size-72 lg:size-52 xl:size-72"
              />
              <img
                src="/rika.jpg"
                alt="rika"
                className="aspect-square rounded-xl md:size-72 lg:size-52 xl:size-72"
              />
              <img
                src="/jonathan.jpg"
                alt="jonathan"
                className="aspect-square rounded-xl md:size-72 lg:size-52 xl:size-72"
              />
              <img
                src="/krisna.jpg"
                alt="krisna"
                className="aspect-square rounded-xl md:size-72 lg:size-52 xl:size-72"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
