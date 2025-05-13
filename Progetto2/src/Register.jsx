import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Registrazione() {
  // Inizializziamo lo stato con un oggetto "user" che conterrà i dati inseriti dall’utente nel form
  const [user, setUser] = useState({
    id: Date.now(),
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  // Prendiamo la funzione di registrazione dal nostro context (quello creato in AuthProvider)
  const { registrazione, error, validate } = useAuth();
  const navigate = useNavigate();

  // Questa funzione si attiva ogni volta che l’utente scrive qualcosa in un input
  // Aggiorna dinamicamente lo stato dell’utente (basandosi sul nome del campo)
  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  const notifica = () =>
    toast(
      "La password deve contenere almeno 8 caratteri, una lettera maiuscola, un carattere speciale ed almeno un numero."
    );
  const notifica2 = () => toast("Utente già registrato");

  const [success, setSuccess] = useState(false);
  // Questa è la funzione che si attiverà al submit del form
  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate(user.password);
    console.log(error);

    if (!validationError) {
      return notifica();
      //window.alert(
      //   "La password deve contenere almeno 8 caratteri, una lettera maiuscola, un carattere speciale ed almeno un numero."
      // );
    }

    if (validationError) {
      const reg = registrazione(user);
      if (reg) {
        notifica2();
        return navigate("/login");
      }
      setSuccess(true);
      // window.alert("Registrazione avvenuta con successo");
      const notifica = () => toast("Registrazione avvenuta con successo"); //// NOTIFICHE
      notifica(), navigate("/login");
    }
  }

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
