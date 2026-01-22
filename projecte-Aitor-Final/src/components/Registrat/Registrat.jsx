import { useState } from "react";
import styles from "./IniciarSessio.module.css";

function Iniciar_Sessio() {
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Contrasenya:", contra);
  };

  return (
    <div className={styles.contenidorPrincipal}>
      <div className={styles.formulari_IS_Conetnidor}>
        <form onSubmit={enviar} className={styles.formulari_IS}>
          <div className={styles.conetnidorAux}>
            <input
              type="email"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Dirección de correo electrónico</label>
          </div>

          <div className={styles.conetnidorAux}>
            <input
              type="password"
              id="contra"
              value={contra}
              placeholder=" "
              onChange={(e) => setContra(e.target.value)}
            />
            <label htmlFor="contra">Contrasenya</label>
          </div>

          <button type="submit">Iniciar Sessió</button>
        </form>
      </div>
    </div>
  );
}

export default Iniciar_Sessio;
