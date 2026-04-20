import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className={styles.pieDePagina}>
      <div className={styles.contenedorColumnasPie}>
        <div className={styles.columnaLogoPie}>
          <img src="./img/logo_Box.png" alt="" className={styles.logoPie} onClick={() => navigate("/")} />
        </div>
        <div className={styles.columnaEnlacesPie}>
          <p className={styles.tituloColumnaPie} onClick={() => navigate("/garatge")}>Producte</p>
          <p className={styles.enlacePie} onClick={() => navigate("/garatge")}>Garatge</p>
          <p className={styles.enlacePie} onClick={() => navigate("/garatge")}>Manteniment</p>
          <p className={styles.enlacePie} onClick={() => navigate("/garatge")}>Comparativa</p>
          <p className={styles.enlacePie} onClick={() => navigate("/garatge")}>Eficiència</p>
        </div>
        <div className={styles.columnaEnlacesPie}>
          <p className={styles.tituloColumnaPie} onClick={() => navigate("/forum")}>Comunitat</p>
          <p className={styles.enlacePie} onClick={() => navigate("/ranking")}>Rànquing</p>
          <p className={styles.enlacePie} onClick={() => navigate("/forum")}>Fòrum</p>
          <p className={styles.enlacePie} onClick={() => navigate("/forum")}>Suport</p>
        </div>
        <div className={styles.columnaEnlacesPie}>
          <p className={styles.tituloColumnaPie}>Legal</p>
          <p className={styles.enlacePie}>Privacitat</p>
          <p className={styles.enlacePie}>Termes d'ús</p>
        </div>
      </div>
      <div className={styles.derechosReservadosPie}>
        <p>© 2026 BoxSphere — Tots els drets reservats Barcelona, Espanya, 2026</p>
      </div>
    </footer>
  )
}
