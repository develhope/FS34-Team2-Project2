import { createContext, useContext, useEffect, useState } from "react";
// Importiamo da React tutto ciò che ci serve per gestire il context, gli stati e gli effetti collaterali (tipo salvare nel localStorage)

// Creiamo il context che useremo per gestire login, logout, registrazione, ecc.
const AuthContext = createContext();

// Hook personalizzato: così invece di scrivere ogni volta useContext(AuthContext), possiamo semplicemente fare useAuth()
export const useAuth = () => useContext(AuthContext);

// Questo è il componente che "avvolge" tutta l'app e fornisce il contesto a chi ne ha bisogno
export default function AuthProvider({ children }) {
  // Stato per sapere chi è loggato. Se c’è già un utente salvato nel localStorage, lo carichiamo
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });

  // Stato per tenere tutti gli utenti registrati. Anche qui: se ci sono già salvati nel localStorage, li recuperiamo
  const [users, setUsers] = useState(() => {
    const localUsers = localStorage.getItem("users");
    return localUsers ? JSON.parse(localUsers) : [];
  });

  // Ogni volta che cambia la lista utenti, aggiorniamo il localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Funzione per il login
  function login({ email, password }) {
    // Cerchiamo nella lista utenti se c'è qualcuno con email e password che combaciano
    const userExist = users.find(
      (user) => user.email === email && user.password === password
    );
    //TODO Verificare se email e password sono null o stringa vuota

    // Se non lo troviamo, ritorniamo un errore
    if (!userExist) {
      setError("credenziali errate");
      return { esito: false, messaggio: "credenziali errate" };
    }

    // Se l'utente esiste, lo salviamo nello stato e anche nel localStorage per tenerlo "loggato"
    // TODO Fare la chiamata fetch al backend,
    setUser(userExist);
    setError(null);
    localStorage.setItem("user", JSON.stringify(userExist));
  }
  function validate(password) {
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password);
  }

  // Funzione per registrare un nuovo utente
  function registrazione(userData) {
    // Controlliamo se c'è già un utente registrato con quella email
    const userExist = users.find((user) => user.email === userData.email);

    // Se esiste già, blocchiamo tutto
    if (userExist) {
      setError("email già registrata");
      return { esito: false, messaggio: "Email già registrata" };
    }
    if (!validate(userData.password)) {
      setError(
        "La password deve contenere almeno 8 caretteri, una lettera maiuscola, un carattere speciale ed alemno un numero."
      );
      return { esito: false, messaggio: "Password non corretta" };
    }

    // Altrimenti, aggiungiamo il nuovo utente alla lista
    setUsers((prev) => [...prev, userData]);
    setError(null);
  }

  // Funzione per fare logout
  function logout() {
    // Puliamo il localStorage e lo stato: l’utente viene "sloggato"
    localStorage.removeItem("user");
    setUser(null);
  }

  // Qui forniamo tutti i dati e le funzioni utili a chiunque userà useAuth() nella propria componente
  return (
    <AuthContext.Provider
      value={{ user, users, login, registrazione, logout, error, validate }}
    >
      {children}
    </AuthContext.Provider>
  );
}
