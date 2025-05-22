import React, { useEffect, useState } from "react";
import { useAuth } from "./Context/authContext";
import NavBarDash from "./Components/NavBarDash";
import { notificaErrore, notificaSuccesso } from "./Notifiche/Notifiche";
import { useNavigate } from "react-router-dom";

export default function Profilo() {
  const { user } = useAuth();
  const navigazione = useNavigate();

  async function handleDelete(event) {
    if (confirm("Sei sicuro di eliminare il tuo account? ")) {
      try {
        const response = await fetch(
          `http://localhost:3000/utente/${user.id}`,
          {
            method: "DELETE",
          }
        );
        const result = await response.json();
        if (response.ok) {
          console.log("utente cancellato con successo");
          localStorage.removeItem("user");
          notificaSuccesso("Account eliminato con successo!");
          navigazione("/");
        } else {
          console.log("Utente non trovato");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Operazione annullata");
    }
  }

  return (
    <div className="ordini-container">
      <NavBarDash></NavBarDash>
      <div id="claudio">
        <h1 className="titolo-ordini">I tuoi dati</h1>
        <div className="ordine-card">
          <div>
            <p>
              <strong>ID: #</strong> {user.id}
            </p>
            <p>
              <strong>Nome: </strong> {user.nome}
            </p>
            <p>
              <strong>Cognome: </strong> {user.cognome}
            </p>
            <p>
              <strong>Email: </strong> {user.email}
            </p>
            <button
              className="normal-signin"
              style={{ fontSize: 15 }}
              onClick={handleDelete}
            >
              Cancella dati utente
            </button>
          </div>
        </div>
        ;
        <div id="back-home">
          <a id="back-home" href="/dashboard">
            Ritorna alla Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
