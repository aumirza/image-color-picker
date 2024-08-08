import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Main } from "../components/Main";

export const App = () => {
  return (
    <div className="h-screen bg-green-500">
      <Header />
      <main
        className="my-9
       flex justify-center items-center"
      >
        <div className="fixed -translate-x-96 -translate-y-52  z-0 h-48 w-48 rounded-full bg-white"></div>
        <div className="fixed bottom-5 left-10  z-0 h-48 w-48 rounded-full bg-white"></div>
        <div className="fixed translate-x-10 translate-y-20  z-0 h-20 w-20 rounded-full bg-white"></div>
        <div className="fixed right-32 bottom-64 z-0 h-36 w-36 rounded-full bg-white"></div>
        <Main />
      </main>
      <Footer />
    </div>
  );
};
