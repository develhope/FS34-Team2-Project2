import { useState } from "react";
// Importiamo useState per gestire i dati inseriti nel form

import { useAuth } from "./Context/authContext";
import { Link, useNavigate } from "react-router-dom";
// Importiamo il nostro hook personalizzato che ci dà accesso alla funzione login del context
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  // Stato locale per tenere traccia dell'email e della password inserite nel form
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // Estraiamo la funzione di login dal context, che useremo quando l’utente invia il form
  const { login, error } = useAuth();

  // Funzione che si attiva quando cambiamo valore in un campo del form
  // Aggiorna dinamicamente il campo giusto in base al nome dell’input (email o password)
  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  // Funzione che si attiva quando inviamo il form

  function handleSubmit(event) {
    event.preventDefault(); // Previene il refresh della pagina
    // Chiamiamo la funzione di login passando i dati dell’utente
    const loggato = login(user);
    if (!loggato) {
      navigate("/dashboard");
    } else {
      // window.alert("Credenziali Errate");
      const notifica = () => toast("Credenziali Errate!");
      notifica();
    }
  }

  return (
    <div className="login">
      <div className="form-container">
        <p className="title">Login</p>

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            name="email"
            placeholder="Inserisci la tua email"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Inserisci la tua password"
            onChange={handleChange}
            required
          />

          <button className="form-btn">Login</button>
        </form>
        <p className="sign-up-label">
          Non hai un account?{" "}
          <span className="sign-up-link">
            <a href="/register">Registrati</a>
          </span>
        </p>
        <span className="sign-up-link">
          <a href="/">Ritorna alla Home</a>
        </span>
      </div>
    </div>

    // <div className="login">
    //   <div className="login2">
    //     <h2>Login</h2>

    //     <form className="form-login" onSubmit={handleSubmit}>
    //       <div>
    //         <label>Email</label> <br />
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="Inserisci la tua email"
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label>Password</label> <br />
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Inserisci la tua password"
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label>
    //           <input className="checkbox" type="checkbox" />
    //           <span>Ricordami</span>
    //         </label>
    //         <a href="#">Password Dimentica?</a>
    //       </div>

    //       <button type="submit">Login</button>
    //       {error && <p>{error}</p>}
    //     </form>

    //     <div>
    //       Non hai un Account?
    //       <a href="/register">Registrati</a>
    //     </div>
    //     <a href="/">Ritorna alla Home</a>
    //   </div>
    // </div>
  );
}
