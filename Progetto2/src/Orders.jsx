import React, { useEffect, useState } from "react";
import { useAuth } from "./Context/authContext";

export default function Orders() {
  const { user } = useAuth();
  const [ordiniUtente, setOrdiniUtente] = useState([]);

 useEffect(() => {
   const ordiniSalvati = JSON.parse(localStorage.getItem("orders")) || [];
   setOrdiniUtente(ordiniSalvati);
 }, []);

  return (
    <div className="ordini-container">
      <h1 className="titolo-ordini">I tuoi ordini</h1>
      {ordiniUtente.length === 0 ? (
        <p>Non hai ancora effettuato ordini.</p>
      ) : (
        ordiniUtente.map((ordine, index) => {
          const totaleOrdine = ordine.prodottiCarrello?.reduce(
            (tot, prod) => tot + prod.price * prod.quantity,
            0
          );

          return (
            <div className="ordine-card" key={ordine.id || index}>
              <h2>Ordine #{ordine.id}</h2>
              <p>
                <strong>Nome:</strong> {ordine.nome} {ordine.cognome}
              </p>
              <p>
                <strong>Email:</strong> {ordine.email}
              </p>
              {ordine.IndirizzoResidenza && (
                <p>
                  <strong>Indirizzo:</strong> {ordine.IndirizzoResidenza}
                </p>
              )}
              <h3>Prodotti:</h3>
              <ul className="ordine-prodotti">
                {ordine.prodottiCarrello?.map((prodotto, idx) => (
                  <li key={idx}>
                    {prodotto.title} - €{prodotto.price} x {prodotto.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Totale ordine:</strong> €{totaleOrdine.toFixed(2)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}

