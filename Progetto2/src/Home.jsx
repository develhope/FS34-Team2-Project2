import Descrizione from "./Components/Descrizione";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import NavBar from "./Components/NavBar";
import Negozio from "./Components/Negozio";
export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <main className="corpo">
        <div className="centro">
          <div className="main">
            <Descrizione />
            <Negozio></Negozio>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
