import { useEffect, useState } from "react";
import { useAuth } from "./Context/authContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Carrello() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
  console.log(totale);

  /////////
  // Stato per tenere tutti gli utenti registrati. Anche qui: se ci sono già salvati nel localStorage, li recuperiamo
  const [orders, setOrders] = useState(() => {
    const ordini = localStorage.getItem("orders");
    return ordini ? JSON.parse(ordini) : [];
  });

  const [ordine, setOrdine] = useState(
    user
      ? {
          id: Date.now(),
          nome: user.nome,
          cognome: user.cognome,
          email: user.email,
        }
      : []
  );

  // Ogni volta che cambia la lista utenti, aggiorniamo il localStorage
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function handleChange(event) {
    setOrdine({
      ...ordine,
      prodottiCarrello,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setOrders((prev) => [...prev, ordine]);
    localStorage.setItem("prodotti", []);
    setProdottiCarrello([]);
    // window.alert("Prodotti Acquistati Con Successo!!");
    const notify = () => toast("Prodotti Acquistati Con Successo!!");
    notify();
  }
  function handleCk() {
    const notifica = () =>
      toast("Per effettuare il checkout è necessario effettuare l'accesso"); //// NOTIFICHE
    notifica(),
      // window.alert(
      //   "Per effettuare il checkout è necessario effettuare l'accesso"
      // ),
      navigate("/login");
  }

  return (
    <div
      className="shopcart"
      style={{
        height: orders && user ? "100vh" : "100vh",
        overflow: orders && user ? "auto" : "hidden",
      }}
    >
      <div className="inner-shopcart">
        <h1 className="title">CARRELLO</h1>
        {prodottiCarrello.length === 0 ? (
          <div id="carrello-vuoto">
            <p>Il carrello è vuoto.</p>
            <a href="/">Ritorna alla Home</a>
          </div>
        ) : (
          <>
            <div className="carrello-container">
              {prodottiCarrello.map((item, index) => (
                <div className="carrello-item" key={index}>
                  <h3>{item.title}</h3>
                  <img src={item.image} alt={item.title} width="100" />
                  <p>Prezzo: €{item.price}</p>
                  <p>Quantità: {item.quantity}</p>
                  <button
                    className="normal-signin"
                    onClick={() => rimuoviDalCarrello(item.id)}
                  >
                    Rimuovi
                  </button>
                </div>
              ))}
            </div>
            <div>
              {user ? (
                <form className="form-carrello" onSubmit={handleSubmit}>
                  <p className="title-carrello">Inserire Dati Pagamento: </p>

                  <div class="flex">
                    <span>Nome:</span>
                    <label>
                      <input
                        onChange={handleChange}
                        name="nome"
                        value={user.nome}
                        required
                        type="text"
                        class="input"
                      />
                    </label>
                  </div>
                  <span>Cognome:</span>

                  <label>
                    <input
                      onChange={handleChange}
                      name="cognome"
                      value={user.cognome}
                      required
                      placeholder=""
                      type="text"
                      class="input"
                    />
                  </label>
                  <span>Email:</span>
                  <label>
                    <input
                      onChange={handleChange}
                      name="email"
                      value={user.email}
                      required
                      placeholder=""
                      type="email"
                      class="input"
                    />
                  </label>
                  <span>Indirizzo Residenza:</span>
                  <label>
                    <input
                      onChange={handleChange}
                      name="IndirizzoResidenza"
                      required
                      placeholder="Inserire residenza"
                      type="text"
                      class="input"
                    />
                  </label>
                  <span>Numero Carta:</span>
                  <label>
                    <input
                      name="NumeroCarta"
                      required
                      placeholder="Inserire numero carta"
                      type="number"
                      class="input"
                    />
                  </label>
                  <span>Inserire CVV:</span>
                  <label>
                    <input
                      name="CVV"
                      required
                      placeholder="inserire codice CVV "
                      type="number"
                      class="input"
                    />
                  </label>
                  <span>Scadenza Carta:</span>
                  <label>
                    <input
                      name="ScadenzaCarta"
                      required
                      placeholder=""
                      type="date"
                      class="input"
                    />
                  </label>
                  <button type="submit" className="normal-signin">
                    CheckOut
                  </button>
                </form>
              ) : null}
            </div>
            <h2>Totale: €{totale.toFixed(2)}</h2>

            {user ? null : (
              <button onClick={handleCk} className="normal-signin">
                CheckOut
              </button>
            )}
            <button onClick={svuotaCarrello} className="normal-signin">
              Svuota carrello
            </button>
            <a href="/">Ritorna alla Home</a>
          </>
        )}
      </div>
    </div>
  );
}
