import { utenti } from "./utenti.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./database/db.js";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const PORT = 3000;
const salto = 10;

app.use(express.json());
app.use(cors());

//// 1 GetAll

app.get("/", async (req, res) => {
  try {
    const users = await db.many(`SELECT * FROM utenti`);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Errore durante la richiesta ${error.message}` });
  }
});

// app.get("/utenti", (req, res) => {
//   return res.status(200).json(utenti);
// });

//// 2 getByid

app.get("/utente/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const utente = await db.one(`SELECT * FROM utenti WHERE id=$1`, [id]);
    res.status(200).json(utente);
  } catch (error) {
    res.status(404).json({ message: `utente non trovato ` });
  }
});

// app.get("/utenti/:id", (req, res) => {
//   const { id } = req.params;
//   const users = utenti.find((user) => user.id == id);
//   if (users) {
//     res.json(users);
//   } else {
//     res.status(404).send("id non trovato");
//   }
// });

//// 3 Registrazione

app.post("/utenti", async (req, res) => {
  const { nome, cognome, email, password } = req.body;

  try {
    const passwordCryptata = await bcrypt.hash(password, salto);
    await db.none(
      `INSERT INTO utenti ( nome, cognome, email , password )
      VALUES
      ($1, $2, $3, $4)
      `,
      [nome, cognome, email, passwordCryptata]
    );
    return res
      .status(201)
      .json({ ok: true, message: "utente registrato con successo" });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error.message });
  }
});

// app.post("/utenti", (req, res) => {
//   const { id, nome, cognome, email, eta, password } = req.body;
//   const userExist = utenti.find(
//     (user) => user.email.toLowerCase() === email.toLowerCase()
//   );
//   if (userExist) {
//     return res.status(404).json({ message: "Utente gia registrato" });
//   } else {
//     const newUser = {
//       id: id,
//       nome: nome,
//       cognome: cognome,
//       eta: eta,
//       email: email,
//       password: password,
//     };
//     utenti.push(newUser);
//     return res
//       .status(201)
//       .json({ ok: true, message: "Utente registrato con successo" });
//   }
// });

//// 4 Login

app.post("/utenti/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const userExist = await db.oneOrNone(
        `SELECT * FROM utenti WHERE email=$1`,
        [email]
      );
      if (userExist) {
        const hashedPassword = userExist.password;
        const isTrue = await bcrypt.compare(password, hashedPassword);
        if (isTrue) {
          return res.status(200).json({
            message: "login effettuato con successo",
            user: userExist,
          });
        } else {
          return res.status(400).json({ message: "credenziali errate" });
        }
      } else {
        return res.status(404).json({ message: "credenziali errate" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "inserisci email e password" });
  }
});

// app.post("/utenti/login", (req, res) => {
//   const { email, password } = req.body;
//   if (email && password) {
//     const userExist = utenti.find((utente) => {
//       return (
//         utente.email.toLowerCase() === email.toLowerCase() &&
//         utente.password === password
//       );
//     });
//     if (userExist) {
//       return res
//         .status(201)
//         .json({ message: "Login effettuato con successo!", user: userExist });
//     } else {
//       return res.status(400).json({ message: "Credenziali Errate" });
//     }
//   } else {
//     return res.status(404).json({ message: "Inserisci Email e password" });
//   }
// });

//// 5 delete

app.delete("/utente/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.none(`DELETE FROM utenti WHERE id=$1`, [id]);
    res.status(200).json({ message: "Utente cancellato con successo" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// app.delete("/utente/:id", (req, res) => {
//   const { id } = req.params;
//   const users = utenti.find((idUtente) => idUtente.id == id);
//   if (users) {
//     const indice = utenti.indexOf(users);
//     utenti.splice(indice, 1);
//     res.status(200).send({ message: "Utente cancellato con successo" });
//   } else {
//     res.status(404).send({ message: "utente non trovato" });
//   }
// });

//// 6 token

app.get("/dashboard", async (req, res) => {
  const auth = req.headers.authorization;

  try {
    const userExist = await db.one("SELECT * FROM utenti WHERE email=$1 ", [
      decoded.email,
    ]);
    res.json({ userExist });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server startato con successo");
});
