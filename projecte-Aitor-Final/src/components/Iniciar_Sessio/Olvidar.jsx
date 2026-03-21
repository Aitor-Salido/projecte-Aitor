import { useState } from "react";
import styles from "./Olvidar.module.css";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";
import { httpRequest } from "../httpRequestUtils";

function Olvidar() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const enviar = async (e) => {
        e.preventDefault();
        const signInData = {
            email: email,
        };

        try {
            const data = await httpRequest(
                "http://localhost/Projecte_Backend/login/olvidar.php",
                "POST",
                signInData,
            );

            if (data.valor === true) {
                setSuccess(data.mensaje);
            } else {
                setError(data.mensaje);
            }
        } catch (error) {
            setError("Error al oblidar contrasenya");
        }
    };

    return (
        <div className={styles.contenidorPrincipal}>
            <div className={styles.formulari_IS_Conetnidor}>
                <div className={styles.header}>
                    <img
                        src="./img/logo_Box.png"
                        alt="BoxSphere Logo"
                        className={styles.logo}
                    />
                    <h1 className={styles.title}>Oblidar contrasenya</h1>
                    <p className={styles.subtitle}>Introdueix el teu correu electrònic per restablir la contrasenya</p>
                </div>

                {error && <div className={styles.error}><p>{error}</p></div>}
                {success && <div className={styles.success}><p>{success}</p></div>}

                <Form onSubmit={enviar} className={styles.formulari_IS} noValidate>
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="email" className={styles.label}>
                            Correu electrònic
                        </Label>
                        <div className={styles.inputWrapper}>
                            <svg
                                className={styles.icon}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                placeholder="el-teu@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </FormGroup>

                    <Button type="submit" className={styles.button}>
                        Enviar correu electrònic
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Olvidar;
