import Footer from "./Components/Footer";
export default function Home() {
  return (
    <>
      <header>
        <div className="logo-navbar">
          <img
            src="assets/logo-gioco.png"
            alt="logo gioco"
            className="logo-gioco"
            width="40"
            height="40"
          />
          <p className="titolo-navbar">Le Cronache dell'Igrall</p>
        </div>

        <div className="loghi">
          <div className="navigazione-container">
            <svg
              className="navigazione"
              fill="#ffffff"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              enable-background="new 0 0 512 512"
              xml:space="preserve"
              stroke="#ffffff"
              width="50"
              height="50"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M256,0C114.609,0,0,114.609,0,256s114.609,256,256,256s256-114.609,256-256S397.391,0,256,0z M256,472 c-119.297,0-216-96.703-216-216S136.703,40,256,40s216,96.703,216,216S375.297,472,256,472z"></path>
                  <polygon points="224.391,224.469 231.359,196.641 144.359,144.438 196.547,231.438 "></polygon>
                  <polygon points="315.281,231.172 367.125,144 280.5,196.406 287.5,224.344 "></polygon>
                  <polygon points="287.688,287.453 280.828,315.344 368,367.219 315.469,280.391 "></polygon>
                  <polygon points="196.547,280.672 144.359,367.656 231.547,315.312 224.516,287.641 "></polygon>
                  <path d="M256,128l-25.594,102.391L128,256l102.5,25.625L256.5,384l25.234-102.547L384,255.5l-102.422-25.203L256,128z M256,272 c-8.828,0-16-7.172-16-16s7.172-16,16-16s16,7.172,16,16S264.828,272,256,272z"></path>
                </g>
              </g>
            </svg>
            <p>Naviga</p>
            <div className="menu-dropdown">
              <a href="#">Torna su</a>
              <a href="#gioco">Panoramica gioco</a>
              <a href="#n-gioco">Bestiario</a>
              <a href="#cardContainer">Negozio accessori </a>
              <a href="#contatti">Contatti </a>
            </div>
          </div>
          <div className="carrello-container">
            <svg
              className="carrello"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g clip-path="url(#clip0_901_1512)">
                  <path
                    d="M8 16H2M9 20H3M7 12H1M26 16H11M25 20H12M27 12H10M10 24H27C28.125 24 28.862 23.038 29 22L31 8H6L4 1H1M13 29C13 27.896 12.104 27 11 27C9.896 27 9 27.896 9 29C9 30.104 9.896 31 11 31C12.104 31 13 30.104 13 29ZM25 29C25 27.896 24.104 27 23 27C21.896 27 21 27.896 21 29C21 30.104 21.896 31 23 31C24.104 31 25 30.104 25 29Z"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_901_1512">
                    <rect width="32" height="32" fill="white"></rect>
                  </clipPath>
                </defs>
              </g>
            </svg>

            <p>Carrello</p>
            <div className="menu-dropdown3">
              <div id="carrello-lista"></div>
              <button id="acq-carrello">Acquista</button>
            </div>
          </div>
          <div className="accedi-container">
            <svg
              className="accedi"
              fill="#ffffff"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g id="viking">
                  <path d="M24.707,42H37.3193a2.652,2.652,0,0,0,2.3975-1.5215,2.8063,2.8063,0,0,0-.33-2.9863C37.68,35.3379,34.4727,34,31.0176,34c-3.5547,0-6.8067,1.3965-8.4859,3.6436A2.7444,2.7444,0,0,0,24.707,42Z"></path>
                  <circle cx="38" cy="27" r="2"></circle>
                  <path d="M23.3384,28.8184a1,1,0,0,0,1.414,0l.7669-.767.7668.767A1,1,0,1,0,27.7,27.4043l-.767-.7671L27.7,25.87a1,1,0,1,0-1.4141-1.414l-.7668.7669-.7669-.7669a1,1,0,0,0-1.414,1.414l.7669.7671-.7669.7671A1,1,0,0,0,23.3384,28.8184Z"></path>
                  <circle cx="46" cy="7" r="1"></circle>
                  <path d="M64.4961,36.001a1.0447,1.0447,0,0,0-.7036-.3457,16.5557,16.5557,0,0,1-9.1753-3.6392l-.1807-.1451a23.813,23.813,0,0,0-5.19-10.4358l.0711-.0109a6.5549,6.5549,0,0,0,4.8594-3.542l4.7177-9.435A1,1,0,0,0,57.293,7.293L51.73,12.8564a4.5518,4.5518,0,0,1-2.8369,1.3155l-8.2593.6885a.9648.9648,0,0,0-.2617.0759,23.7178,23.7178,0,0,0-18.8527.0348c-.0254-.0041-.0461-.0187-.0721-.0209l-9.3394-.7783a4.5518,4.5518,0,0,1-2.8369-1.3155L3.707,7.293A1,1,0,0,0,2.1055,8.4473l4.7177,9.435a6.5512,6.5512,0,0,0,3.9465,3.326L9.2432,22.9746a.999.999,0,0,0-.2412.7134L9.197,26.96a23.8955,23.8955,0,0,0-.7409,18.2225A.9826.9826,0,0,0,8,46a3.9963,3.9963,0,0,0,3,3.858v6.287A4.0229,4.0229,0,0,0,8.1345,59H4a1,1,0,0,0,0,2H60a1,1,0,0,0,0-2H57.3261a11.7238,11.7238,0,0,0,5.4229-6.0806,15.8955,15.8955,0,0,0,1.1826-5.12l.8243-11.07A1.0183,1.0183,0,0,0,64.4961,36.001ZM52.2417,31.3218l-1.208.9272a16.5624,16.5624,0,0,1-8.8672,3.4092,1,1,0,0,0-.9224,1.0713l.8243,11.07a15.9024,15.9024,0,0,0,1.1821,5.1191,14.8823,14.8823,0,0,0,.8763,1.7157A21.7449,21.7449,0,0,1,31,59a22.0192,22.0192,0,0,1-14-5.0349V49.858A3.9963,3.9963,0,0,0,20,46a1,1,0,0,0-1-1H17.7277l1.27-21.312a.999.999,0,0,0-.2412-.7134l-2.1979-2.5433A21.9605,21.9605,0,0,1,52.2417,31.3218ZM11.0225,23.9746,14,20.5293l2.9775,3.4453L15.7241,45H12.2759Zm-1.51,8.2721.7112,11.9316a21.9219,21.9219,0,0,1-.7112-11.9316ZM10.2686,47h7.4628A2.0009,2.0009,0,0,1,16,48H12A2.0009,2.0009,0,0,1,10.2686,47ZM12,58h4a1.9943,1.9943,0,0,1,1.7275,1H10.2786A2.0056,2.0056,0,0,1,12,58Zm7.86,1a3.9614,3.9614,0,0,0-.3855-.9663q.9688.53,1.9818.9663Zm25.4179-2.7319A10.4388,10.4388,0,0,0,48.6738,59h-8.06A23.95,23.95,0,0,0,45.2783,56.2681Z"></path>
                  <path d="M24,9a3,3,0,1,0-3-3A3.0033,3.0033,0,0,0,24,9Zm0-4a1,1,0,1,1-1,1A1.0013,1.0013,0,0,1,24,5Z"></path>
                </g>
              </g>
            </svg>
            <p>Accedi</p>
            <div className="dropdown-menu2">
              <form>
                <div>
                  <input type="text" placeholder="Username" required />
                </div>
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </header>
      <main className="corpo">
        <div className="hero-container">
          <div className="hero">
            <div className="hero-descrizione">
              <h1 className="titolo-hero">Le Cronache dell'Igrall</h1>
              <p className="descrizione-hero">
                Preparati a varcare i confini della realtà e ad immergerti in un
                mondo dove l'avventura ti attende ad ogni passo. In questo
                leggendario gioco da tavolo fantasy, tu e i tuoi compagni di
                viaggio assumete il ruolo di eroi coraggiosi, pronti a sfidare
                il destino e a forgiare la vostra leggenda. Esplorate terre
                incantate, svelate antiche profezie e affrontate creature
                mitologiche mentre scrivete, turno dopo turno, la vostra epopea
                personale. Il destino del vostro mondo è nelle vostre mani.
                Siete pronti a scrivere la vostra leggenda?
              </p>
            </div>
          </div>
        </div>
        <div className="hero-descrizione-2">
          <h1 className="titolo-hero-2">Le Cronache dell'Igrall</h1>
          <p className="descrizione-hero-2">
            Preparati a varcare i confini della realtà e ad immergerti in un
            mondo dove l'avventura ti attende ad ogni passo. In questo
            leggendario gioco da tavolo fantasy, tu e i tuoi compagni di viaggio
            assumete il ruolo di eroi coraggiosi, pronti a sfidare il destino e
            a forgiare la vostra leggenda. Esplorate terre incantate, svelate
            antiche profezie e affrontate creature mitologiche mentre scrivete,
            turno dopo turno, la vostra epopea personale. Il destino del vostro
            mondo è nelle vostre mani. Siete pronti a scrivere la vostra
            leggenda?
          </p>
        </div>
        <div className="centro">
          <div className="main">
            <div className="gioco" id="gioco">
              <p>
                E se vi dicessimo che il destino di un mondo intero è nelle
                vostre mani? Che siate maghi saggi, guerrieri impavidi o ladri
                astuti, ogni vostra scelta sarà una tessera fondamentale di un
                epico mosaico d'avventura. Ogni missione affrontata, ogni
                alleanza stretta e ogni battaglia combattuta scolpirà il vostro
                cammino, dando vita a una storia unica e irripetibile, che si
                evolve Giocatori in tutto il mondo hanno già risposto alla
                chiamata, immergendosi in questa straordinaria saga di
                immaginazione, strategia e collaborazione. Ora è il vostro
                turno! Radunate la vostra squadra, affilate le spade, preparate
                i vostri incantesimi e lasciatevi trasportare in un regno dove
                il coraggio è la chiave, l'astuzia è il vostro alleato e
                l'impossibile diventa realtà. Il viaggio sta per cominciare
              </p>
            </div>
            <div className="negozio-gioco" id="n-gioco">
              <h1 className="bestiario">BESTIARIO</h1>
              <div id="monster-carousel" className="carousel"></div>
              <div className="carousel-controls">
                <button id="prev">←</button>
                <button id="next">→</button>
              </div>
            </div>
            <h1 className="bestiario">NEGOZIO</h1>
            <div className="card-container" id="cardContainer"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
