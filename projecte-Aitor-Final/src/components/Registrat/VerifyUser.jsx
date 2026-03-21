import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";
import httpRequest from "../httpRequestUtils";
import styles from "./VerifyUser.module.css";

function VerifyUser() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const verifyUserRef = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (verifyUserRef.current) return;
        verifyUserRef.current = true;
        verifyUser();
    }, []);

    const verifyUser = async () => {
        try {
            const data = await httpRequest("http://localhost/Projecte_Backend/register/verify.php", "POST", { token: token });

            if (data.valor === true) {
                setSuccess(data.mensaje);
            } else {
                setError(data.mensaje);
            }
        } catch (error) {
            setError("Error al verificar l'usuari");
        }
    };
    return (
        <div className={styles.div_principal}>
            <div className={styles.div_secundari}>
                <div className={styles.header}>
                    <img src="./img/logo_Box.png" alt="BoxSphere Logo" className={styles.logo} />
                    <h1 className={styles.title}>Verificació</h1>
                    <p className={styles.subtitle}>Verifica el teu compte a BoxSphere</p>
                </div>
                {error &&
                    <>
                        <p className={styles.error}>{error}</p>
                        <div className={styles.centrar}>
                            <svg width="100" height="100" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="#ff796a63" stroke="none" stroke-width="5" />
                                <line x1="35" y1="35" x2="65" y2="65" stroke="#ff4b4bff" stroke-width="5" />
                                <line x1="65" y1="35" x2="35" y2="65" stroke="#ff4b4bff" stroke-width="5" />
                            </svg>
                        </div>
                        <button onClick={() => navigate("/registrat")} className={styles.button}>Tornar a Registrar-se</button>
                    </>
                }
                {success &&
                    <>
                        <p className={styles.success}>{success}</p>
                        <div className={styles.centrar}>
                            <svg width="100" height="100" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="#6aff7663" stroke="none" />
                                <polyline points="30,55 45,70 70,35" fill="none" stroke="#269e29ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <button onClick={() => navigate("/iniciar_sessio")} className={styles.button}>Iniciar Sessió</button>
                    </>
                }
            </div>
        </div>
    );
}

export default VerifyUser;