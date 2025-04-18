import { useState } from "react";
import { useAuth } from "./Context/authContext";
import { useNavigate, Link } from "react-router-dom";

export default function Registrazione() {
  // Inizializziamo lo stato con un oggetto "user" che conterrà i dati inseriti dall’utente nel form
  const [user, setUser] = useState({
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
const [success, setSuccess] = useState(false);
  // Questa è la funzione che si attiverà al submit del form
  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate(user);
    if (validationError) {
      return alert(validationError);
    }
    const valida = registrazione(user);

    if (valida) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    }
  }

  return (
    <>
      <div className="login">
        <div className="form-container-register">
          <p className="title">Register</p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="nome"
              placeholder="Inserisci il tuo nome"
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              name="cognome"
              placeholder="Inserisci il tuo cognome"
              onChange={handleChange}
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Inserisci la tua email"
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Inserisci la tua password"
              onChange={handleChange}
            />
            <button className="form-btn">Create account</button>
            {error && <p>{error}</p>}
            {success && (
              <p className="success-message">
                La registrazione è avvenuta con successo.
              </p>
            )}
          </form>
          <p className="sign-up-label">
            Already have an account?
            <span className="sign-up-link">
              <a href="/login">Log in</a>
            </span>
          </p>
          <span className="sign-up-link">
            <a href="/">Ritorna alla Home</a>
          </span>
          <div className="buttons-container">
            <div className="apple-login-button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                className="apple-icon"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
              </svg>
              <span>Sign up with Apple</span>
            </div>
            <div className="google-login-button">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                x="0px"
                y="0px"
                className="google-icon"
                viewBox="0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span>Sign up with Google</span>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
            Registrazione
          </h1>
          <form
            action="#"
            className="w-full flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex items-start flex-col justify-start">
              <label
                for="firstName"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Nome:
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Inserisci il tuo nome"
                onChange={handleChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                for="lastName"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Cognome:
              </label>
              <input
                type="text"
                name="cognome"
                placeholder="Inserisci il tuo cognome"
                onChange={handleChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                for="username"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Numero Telefonico:
              </label>
              <input
                type="tel"
                name="tel"
                placeholder="Inserisci il tuo numero"
                onChange={handleChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                for="email"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                onChange={handleChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start flex-col justify-start">
              <label
                for="password"
                className="text-sm text-gray-700 dark:text-gray-200 mr-2"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                placeholder="Inserisci la tua password"
                onChange={handleChange}
                className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Registrati
            </button>
            {error && <p>{error}</p>}
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Hai già un Account?{" "}
            </span>
            <a
              href="/login"
              className=" text-indigo-600 hover:text-indigo-500 "
            >
              Login
            </a>
          </div>
          <div>
            <a
              href="/"
              className="flex justify-center text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Ritorna alla home
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
}
