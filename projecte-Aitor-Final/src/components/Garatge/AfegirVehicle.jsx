import { useState } from "react";
import styles from "./AfegirVehicle.module.css";
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';

export default function AfegirVehicle({ alTerminar }) {
    const [form, setForm] = useState({
        marca: "",
        model: "",
        tipus_combustible: "",
        matricula: "",
        color: "",
        any: "",
        publicar_ranking: false,
    });

    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState(null);
    const [carrega, setCarga] = useState(false);

    const [errorBack, setErrorBack] = useState("");
    const [successBack, setSuccessBack] = useState("");

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImagen(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarga(true);
        const formData = new FormData();
        formData.append("marca", form.marca);
        formData.append("model", form.model);
        formData.append("tipus_combustible", form.tipus_combustible);
        formData.append("matricula", form.matricula);
        formData.append("color", form.color);
        formData.append("any", form.any);
        formData.append("imagen", imagen);
        formData.append("publicar_ranking", form.publicar_ranking ? 1 : 0);

        try {
            const res = await fetch("http://localhost/Projecte_Backend/garatge/afegirVehicle.php", {
                method: "POST",
                credentials: "include",
                body: formData,
            }).finally(() => setCarga(false));

            const data = await res.json();

            if (data.ok) {
                if (alTerminar) {
                    setSuccessBack("Vehicle afegit correctament");
                    setTimeout(() => {
                        alTerminar();
                    }, 2000);
                }
            } else {
                setErrorBack(data.error);
            }
        } catch (err) {
            console.error(err);
            setErrorBack(data.error);
        }
    };

    return (
        <div className={styles.contenidorPrincipal}>
            {carrega && <div className={styles.loaderContainer}><span className={styles.loader}></span></div>}
            {successBack && <div className={styles.resultatContainer}><span className={styles.resultat}>{successBack}</span></div>}
            <div className={styles.formulari_IS_Conetnidor} style={{ display: carrega ? "none" : "" || successBack != "" ? "none" : "" }}>

                <div className={styles.header}>
                    <h1 className={styles.title}>Afegir Vehicle</h1>
                    <p className={styles.subtitle}>Introdueix les dades del nou cotxe al garatge</p>
                </div>
                {errorBack && <div className={styles.error}><p>{errorBack}</p></div>}
                {successBack && <div className={styles.success}><p>{successBack}</p></div>}

                <Form onSubmit={handleSubmit} className={styles.formulari_IS}>

                    {/* MARCA */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="marca" className={styles.label}>Marca</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            <Input
                                type="text"
                                name="marca"
                                id="marca"
                                placeholder="Ex: Toyota"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* MODEL */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="model" className={styles.label}>Model</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            <Input
                                type="text"
                                name="model"
                                id="model"
                                placeholder="Ex: Corolla"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* COMBUSTIBLE */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="tipus_combustible" className={styles.label}>Tipus de combustible</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#6b6d76" stroke="none">
                                    <path d="M57 482 c-15 -16 -17 -47 -17 -220 0 -128 -4 -202 -10 -202 -5 0 -10 -13 -10 -30 l0 -30 175 0 175 0 0 30 c0 17 -4 30 -10 30 -6 0 -10 35 -10 86 0 76 2 85 15 74 9 -8 15 -30 15 -56 0 -73 56 -108 100 -64 17 17 20 33 20 123 l0 103 -60 59 c-33 32 -63 56 -67 52 -3 -4 6 -20 20 -35 22 -23 27 -37 27 -78 0 -43 4 -55 30 -79 27 -26 31 -35 28 -79 -2 -33 -9 -52 -21 -60 -30 -19 -51 5 -57 64 -5 40 -11 57 -28 68 -20 13 -22 22 -22 122 0 142 2 140 -157 140 -103 0 -122 -3 -136 -18z m261 -14 c9 -9 12 -69 12 -210 l0 -198 -135 0 -135 0 0 198 c0 141 3 201 12 210 17 17 229 17 246 0z m162 -186 c0 -34 0 -35 -20 -17 -13 12 -20 31 -20 53 0 34 0 35 20 17 13 -12 20 -31 20 -53z m-130 -252 c0 -6 -58 -10 -155 -10 -97 0 -155 4 -155 10 0 6 58 10 155 10 97 0 155 -4 155 -10z" />
                                    <path d="M84 447 c-3 -8 -4 -43 -2 -78 l3 -64 110 0 110 0 0 75 0 75 -108 3 c-84 2 -109 0 -113 -11z m206 -67 l0 -60 -95 0 -95 0 0 60 0 60 95 0 95 0 0 -60z" /></g></svg>
                            <Input
                                type="select"
                                name="tipus_combustible"
                                id="tipus_combustible"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            >
                                <option value="" className={styles.darkOption}>Selecciona combustible</option>
                                <option value="Gasolina" className={styles.darkOption}>Gasolina</option>
                                <option value="Dièsel" className={styles.darkOption}>Dièsel</option>
                                <option value="Gas" className={styles.darkOption}>Gas</option>
                                <option value="Elèctric" className={styles.darkOption}>Elèctric</option>
                                <option value="Híbrid" className={styles.darkOption}>Híbrid</option>
                                <option value="Híbrid Endollable" className={styles.darkOption}>Híbrid Endollable</option>
                            </Input>
                        </div>
                    </FormGroup>

                    {/* MATRICULA */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="matricula" className={styles.label}>Matrícula</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <Input
                                type="text"
                                name="matricula"
                                id="matricula"
                                placeholder="1111AAA"
                                onChange={handleChange}
                                className={styles.input}
                                style={{ textTransform: "uppercase" }}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* ANY */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="any" className={styles.label}>Any</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path></svg>
                            <Input
                                type="text"
                                name="any"
                                id="any"
                                placeholder="Ex: 2024"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* COLOR */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="color" className={styles.label}>Color</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                            <Input
                                type="text"
                                name="color"
                                id="color"
                                placeholder="Ex: Vermell"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* PUBLICAR RANKING */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="publicar_ranking" className={styles.label}>Vols publicar el teu vehicle en el ranking?</Label>
                        <div className={styles.checkContainer}>
                            <Input
                                type="checkbox"
                                name="publicar_ranking"
                                id="publicar_ranking"
                                checked={form.publicar_ranking}
                                onChange={handleChange}
                                className={styles.check}
                            />
                            <Label htmlFor="publicar_ranking" className={styles.label}>Sí, vull publicar el meu vehicle en el ranking</Label>
                        </div>
                    </FormGroup>

                    {/* IMATGE */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="imagen" className={styles.label}>Foto</Label>
                        <div className={styles.inputWrapper} style={{ height: "auto", padding: "10px 16px" }}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                            <Input
                                type="file"
                                id="imagen"
                                accept="image/*"
                                onChange={handleImage}
                                className={styles.input}
                                required
                            />
                        </div>
                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                className={styles.imagePreview}
                            />
                        )}
                    </FormGroup>

                    <Button type="submit" className={styles.button}>Afegeix vehicle</Button>
                </Form>
            </div>
        </div>
    );
}