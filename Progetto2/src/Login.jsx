import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { notificaErrore, notificaSuccesso } from "./Notifiche/Notifiche";

export default function Login() {
  const [data, setData] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const logged = await login(data);
      console.log(logged);
      if (logged) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // function handleChange(event) {
  //   setUser({ ...user, [event.target.name]: event.target.value });
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const loggato = login(user);
  //   if (!loggato) {
  //     navigate("/dashboard");
  //     notificaSuccesso("Login Effettuato");
  //   } else {
  //     notificaErrore("Credenziali Errate!");
  //   }
  // }

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
  );
}
