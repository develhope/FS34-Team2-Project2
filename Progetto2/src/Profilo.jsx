import React, { useEffect, useState } from "react";
import { useAuth } from "./Context/authContext";
import NavBarDash from "./Components/NavBarDash";

export default function Profilo() {
  const { user } = useAuth();

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
