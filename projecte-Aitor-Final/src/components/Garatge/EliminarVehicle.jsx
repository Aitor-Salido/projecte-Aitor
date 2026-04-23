import { useState } from "react";
import styles from "./EliminarVehicle.module.css";
import { Button } from "reactstrap";

export default function EliminarVehicle({ alTerminar, id_vehicle }) {
    const [carrega, setCarga] = useState(false);

    const [errorBack, setErrorBack] = useState("");
    const [successBack, setSuccessBack] = useState("");

    const handleEliminar = async (e) => {
        e.preventDefault();
        setCarga(true);
        const formData = new FormData();
        formData.append("id_vehicle", id_vehicle);

        try {
            const res = await fetch("http://localhost/Projecte_Backend/garatge/eliminarVehicle.php", {
                method: "POST",
                credentials: "include",
                body: formData,
            }).finally(() => setCarga(false));

            const data = await res.json();

            if (data.ok) {
                if (alTerminar) {
                    setSuccessBack("Vehicle eliminat correctament");
                    setTimeout(() => {
                        alTerminar();
                    }, 2000);
                }
            } else {
                setErrorBack("Error al eliminar el vehicle");
            }
        } catch (err) {
            console.error(err);
            setErrorBack("Error del servidor");
        }
    };

    return (
        <div className={styles.contenidorPrincipal}>
            {carrega && <div className={styles.loaderContainer}><span className={styles.loader}></span></div>}
            {successBack && <div className={styles.resultatContainer}><span className={styles.resultat}>{successBack}</span></div>}
            <div className={styles.formulari_IS_Conetnidor} style={{ display: carrega ? "none" : "" || successBack != "" ? "none" : "" }}>

                <div className={styles.header}>
                    <h1 className={styles.title}>Eliminar Vehicle</h1>
                    <p className={styles.subtitle}>Estàs segur que vols eliminar el vehicle?</p>
                </div>
                {errorBack && <div className={styles.error}><p>{errorBack}</p></div>}
                <div className={styles.formulari_IS}>
                    <Button className={styles.botonEliminar} onClick={handleEliminar}>Eliminar</Button>
                    <Button className={styles.botonCancelar} onClick={alTerminar}>Cancelar</Button>
                </div>
            </div>
        </div>
    );
}