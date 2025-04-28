
import { useEffect, useState } from "react";

export default function Carrello() {
  const [prodottiCarrello, setProdottiCarrello] = useState([]);

  useEffect(() => {
    const prodottiSalvati = JSON.parse(
      localStorage.getItem("prodotti") || "[]"
    );
    setProdottiCarrello(prodottiSalvati);
  }, []);

  function rimuoviDalCarrello(id) {
    const nuoviProdotti = prodottiCarrello.filter((item) => item.id !== id);
    setProdottiCarrello(nuoviProdotti);
    localStorage.setItem("prodotti", JSON.stringify(nuoviProdotti));
  }

  function svuotaCarrello() {
    setProdottiCarrello([]);
    localStorage.removeItem("prodotti");
  }

  const totale = prodottiCarrello.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1 className="bestiario">CARRELLO</h1>
      {prodottiCarrello.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          <div className="carrello-container">
            {prodottiCarrello.map((item, index) => (
              <div className="carrello-item" key={index}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} width="100" />
                <p>Prezzo: €{item.price}</p>
                <p>Quantità: {item.quantity}</p>
                <button onClick={() => rimuoviDalCarrello(item.id)}>
                  Rimuovi
                </button>
              </div>
            ))}
          </div>
          <h2>Totale: €{totale.toFixed(2)}</h2>
          <button onClick={svuotaCarrello}>Svuota carrello</button>
        </>
      )}
    </div>
  );
}
