import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Registrazione() {
  // Inizializziamo lo stato con un oggetto "user" che conterrà i dati inseriti dall’utente nel form
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    id: Date.now(),
  });

  // Prendiamo la funzione di registrazione dal nostro context (quello creato in AuthProvider)
  const { registrazione, validate } = useAuth();
  const navigate = useNavigate();

  const notificaSuccesso = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notificaErrore = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifica3 = () =>
    toast(
      "La password deve contenere almeno 8 caratteri una lettera maiuscola e un numero speciale"
    );

  // Questa funzione si attiva ogni volta che l’utente scrive qualcosa in un input
  // Aggiorna dinamicamente lo stato dell’utente (basandosi sul nome del campo)
  function handleChange(event) {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/utenti", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (result.ok) {
        setMessage(result.message);
        notificaSuccesso("Registrazione avvenuta con successo!");
        return navigate("/login");
      } else {
        setMessage(result.message);
        notificaErrore("Utente già registrato");
        navigate("/login");
      }
    } catch {
      return setMessage("errore catch");
    }
  }
  // Questa è la funzione che si attiverà al submit del form
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const validationError = validate(user.password);

  //   if (!validationError) {
  //     return notifica();
  //   }

  //   if (validationError) {
  //     const reg = registrazione(user);
  //     if (reg) {
  //       notifica2();
  //       return navigate("/login");
  //     }
  //     setSuccess(true);
  //     const notifica = () => toast("Registrazione avvenuta con successo"); //// NOTIFICHE
  //     notifica(), navigate("/login");
  //   }
  // }

  return (
    <>
      <div className="login">
        <div className="form-container-register">
          <p className="title">Registrazione</p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="nome"
              placeholder="Inserisci il tuo nome"
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="text"
              name="cognome"
              placeholder="Inserisci il tuo cognome"
              onChange={handleChange}
              required
            />
            <input
              className="input"
              type="email"
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
            <button className="form-btn">Crea l'account</button>
            {message && <p>{message}</p>}
          </form>
          <p className="sign-up-label">
            Hai già un account?{" "}
            <span className="sign-up-link">
              <a href="/login">Login</a>
            </span>
          </p>
          <div className="sign-up-link">
            <a href="/">Ritorna alla Home</a>
          </div>
        </div>
      </div>
    </>
  );
}
