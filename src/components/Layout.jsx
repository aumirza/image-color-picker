import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { BgPatch } from "./BgPatch";

export const Layout = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
        <Header />
        <main className="flex items-center justify-center py-5">
          <BgPatch
            color="bg-pink-200"
            opacity={60}
            size={48}
            postition="-translate-x-96 -translate-y-52"
          />
          <BgPatch
            color="bg-pink-300"
            opacity={60}
            size={48}
            postition="bottom-5 left-10"
          />
          <BgPatch
            color="bg-pink-200"
            opacity={60}
            size={20}
            postition="translate-x-10 translate-y-20"
          />
          <BgPatch
            color="bg-pink-200"
            opacity={50}
            size={36}
            postition="right-32 bottom-64"
          />
          <Main />
        </main>
      </div>
      <Footer />
    </div>
  );
};
