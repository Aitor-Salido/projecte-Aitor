import { useState } from "react";
import styles from "./ReiniciarContra.module.css";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";
import { httpRequest } from "../httpRequestUtils";
import { useSearchParams } from 'react-router-dom'

function ReiniciarContra() {
    const [searchParams] = useSearchParams();
    const [contra, setContra] = useState("");
    const [rep_contra, setRep_contra] = useState("");
    const [mostrarContra, setMostrarContra] = useState(false);
    const [mostrarContra2, setMostrarContra2] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = searchParams.get("token");



    const validarFormulario = () => {
        const contraRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        const nuevosErrores = {
            contra: !contraRegex.test(contra),
            rep_contra: rep_contra.trim() === "" || contra !== rep_contra
        };

        setErrors(nuevosErrores);
        return !Object.values(nuevosErrores).some(error => error === true);
    };

    const enviar = async (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            const signInData = { contra, rep_contra, token: token };

            try {
                const data = await httpRequest(
                    "http://localhost/Projecte_Backend/login/reiniciar_contra.php",
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
        }
    };

    const handleChange = (setter, campo, valor) => {
        setter(valor);
        if (errors[campo]) {
            setErrors(prev => ({ ...prev, [campo]: false }));
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
                        <Label htmlFor="contra" className={styles.label} style={errors.contra ? { color: '#e74c3c' } : {}}>Contrasenya</Label>
                        <div className={styles.inputWrapper} style={errors.contra ? { borderColor: '#e74c3c' } : {}}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <Input
                                type={mostrarContra ? "text" : "password"}
                                id="contra"
                                value={contra}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setContra(e.target.value)}
                                className={styles.input}
                            />
                            {mostrarContra ? (
                                <svg
                                    onClick={() => setMostrarContra(false)}
                                    className={styles.iconRight}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            ) : (
                                <svg
                                    onClick={() => setMostrarContra(true)}
                                    className={styles.iconRight}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            )}
                        </div>
                        {errors.contra && <span className={styles.errorText}>Mín. 8 caràcters, 1 maj, 1 min, 1 núm, 1 símbol.</span>}
                    </FormGroup>

                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="rep_contra" className={styles.label} style={errors.rep_contra ? { color: '#e74c3c' } : {}}>Repeteix la contrasenya</Label>
                        <div className={styles.inputWrapper} style={errors.rep_contra ? { borderColor: '#e74c3c' } : {}}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <Input
                                type={mostrarContra2 ? "text" : "password"}
                                id="rep_contra"
                                value={rep_contra}
                                placeholder="••••••••"
                                onChange={(e) => handleChange(setRep_contra, 'rep_contra', e.target.value)}
                                className={styles.input}
                            />
                            {mostrarContra2 ? (
                                <svg
                                    onClick={() => setMostrarContra2(false)}
                                    className={styles.iconRight}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            ) : (
                                <svg
                                    onClick={() => setMostrarContra2(true)}
                                    className={styles.iconRight}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            )}
                        </div>
                        {errors.rep_contra && <span className={styles.errorText}>La contrasenya no coincideix.</span>}
                    </FormGroup>

                    <Button type="submit" className={styles.button}>Reiniciar contrasenya</Button>
                </Form>
            </div>
        </div>
    );
}

export default ReiniciarContra;
