import { utenti } from "./utenti.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(express.json()); // middleware
app.use(cors()); // middleware

app.get("/utenti", (req, res) => {
  return res.status(200).json(utenti);
});

app.post("/utenti", (req, res) => {
  const { id, nome, cognome, email, eta, password } = req.body;
  const userExist = utenti.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );
  if (userExist) {
    return res.status(404).json({ message: "Utente gia registrato" });
  } else {
    const newUser = {
      id: id,
      nome: nome,
      cognome: cognome,
      eta: eta,
      email: email,
      pasword: password,
    };
    utenti.push(newUser);
    return res
      .status(201)
      .json({ ok: true, message: "Utente registrato con successo" });
  }
});

app.post("utenti/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const userExist = utenti.find((utente) => {
      utente.email.toLowerCase() === email.toLowerCase() &&
        utente.password === password;
    });
    if (userExist) {
      return req
        .status(201)
        .json({ message: "Login effettuato con successo!", userExist });
    } else {
      return res.status(400).json({ message: "Credenziali Errate" });
    }
  } else {
    return res.status(404), json({ message: "Inserisci Email e password" });
  }
});

app.listen(PORT, () => {
  console.log("Server startato con successo");
});
