import { notificaSuccesso, notificaErrore } from "../Notifiche/Notifiche";
import { createContext, useContext, useEffect, useState } from "react";
// Importiamo da React tutto ciò che ci serve per gestire il context, gli stati e gli effetti collaterali (tipo salvare nel localStorage)

// Creiamo il context che useremo per gestire login, logout, registrazione, ecc.
const AuthContext = createContext();

// Hook personalizzato: così invece di scrivere ogni volta useContext(AuthContext), possiamo semplicemente fare useAuth()
export const useAuth = () => useContext(AuthContext);

// Questo è il componente che "avvolge" tutta l'app e fornisce il contesto a chi ne ha bisogno
export default function AuthProvider({ children }) {
  // Stato per sapere chi è loggato. Se c’è già un utente salvato nel localStorage, lo carichiamo

  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(data) {
    try {
      const response = await fetch("http://localhost:3000/utenti/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        notificaSuccesso("Login effettuato con successo!");
        setMessage(result.message);
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user)); // <-- aggiunto
        return result.user;
      } else {
        notificaErrore("Credenziali errate");
        setMessage(result.message);
        setUser(null);
        console.log("else");
      }
    } catch (error) {
      console.log("catch");
      console.error(error);
      setMessage("errore");
      setUser(null);
    }
  }

  function validate(password) {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  }

  // Funzione per fare logout
  function logout() {
    // Puliamo il localStorage e lo stato: l’utente viene "sloggato"
    localStorage.removeItem("user");
    setUser(null);
  }

  // Qui forniamo tutti i dati e le funzioni utili a chiunque userà useAuth() nella propria componente
  return (
    <AuthContext.Provider value={{ user, login, logout, validate }}>
      {children}
    </AuthContext.Provider>
  );
}
