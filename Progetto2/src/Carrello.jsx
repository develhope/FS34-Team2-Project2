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

  const notify = () => toast("Prodotti Acquistati Con Successo!!");
  return (
    <div className="shopcart">
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

              {user ? (
                <form class="form-carrello" onSubmit={handleSubmit}>
                  <p class="title-carrello">Register </p>
                  <p class="message">
                    Signup now and get full access to our app.{" "}
                  </p>
                  <div class="flex">
                    <label>
                      <input
                        onChange={handleChange}
                        name="nome"
                        value={user.nome}
                        required
                        type="text"
                        class="input"
                      />
                      <span>Firstname</span>
                    </label>

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
                      <span>Lastname</span>
                    </label>
                  </div>
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
                    <span>Email</span>
                  </label>
                  <label>
                    <input
                      onChange={handleChange}
                      name="IndirizzoResidenza"
                      required
                      placeholder=""
                      type="text"
                      class="input"
                    />
                    <span>Indirizzo Residenza</span>
                  </label>
                  <label>
                    <input
                      name="NumeroCarta"
                      required
                      placeholder=""
                      type="number"
                      class="input"
                    />
                    <span>Numero Carta</span>
                  </label>
                  <label>
                    <input
                      name="CVV"
                      required
                      placeholder=""
                      type="number"
                      class="input"
                    />
                    <span>Inserire CVV</span>
                  </label>
                  <label>
                    <input
                      name="ScadenzaCarta"
                      required
                      placeholder=""
                      type="date"
                      class="input"
                    />
                    <span>Scadenza Carta</span>
                  </label>
                  <button
                    type="submit"
                    onClick={notify}
                    className="normal-signin"
                  >
                    CheckOut
                  </button>
                  <p class="signin">
                    Already have an acount ? <a href="#">Signin</a>{" "}
                  </p>
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
