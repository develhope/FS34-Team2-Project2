export default function Bestiario() {
  return (
    <>
      <div className="negozio-gioco" id="n-gioco">
        <h1 className="bestiario">BESTIARIO</h1>
        <div id="monster-carousel" className="carousel"></div>
        <div className="carousel-controls">
          <button id="prev">←</button>
          <button id="next">→</button>
        </div>
      </div>
    </>
  );
}
