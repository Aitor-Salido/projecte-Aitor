import { useState, useMemo } from "react";
import styles from "./AfegirVehicle.module.css";
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';

export default function RepostarVehicle({ alTerminar, id_vehicle, tipus_combustible }) {
    const [form, setForm] = useState({
        id_vehicle: id_vehicle,
        data: "",
        litres: "",
        kwh: "",
        quilometres_recorreguts: "",
        cost_total: "",
        quilometres_actuals: "",
        consum_mitja: "",
    });

    const [carrega, setCarga] = useState(false);
    const [errorBack, setErrorBack] = useState("");
    const [successBack, setSuccessBack] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Calcular el consum mitjà
    const consumMitjaCalculat = useMemo(() => {
        const km = parseFloat(form.quilometres_recorreguts);
        if (!km || km <= 0) return "";

        if (tipus_combustible === "Elèctric") {
            const kwh = parseFloat(form.kwh);
            if (kwh > 0) {
                return ((kwh / km) * 100).toFixed(2);
            }
        } else {
            const litres = parseFloat(form.litres);
            if (litres > 0) {
                return ((litres / km) * 100).toFixed(2);
            }
        }

        return "";
    }, [form.quilometres_recorreguts, form.litres, form.kwh, tipus_combustible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarga(true);
        const formData = new FormData();
        formData.append("id_vehicle", form.id_vehicle);
        formData.append("data", form.data);
        formData.append("litres", form.litres || null);
        formData.append("kwh", form.kwh || null);
        formData.append("quilometres_recorreguts", form.quilometres_recorreguts);
        formData.append("cost_total", form.cost_total);
        formData.append("quilometres_actuals", form.quilometres_actuals);
        formData.append("consum_mitja", consumMitjaCalculat);

        try {
            const res = await fetch("http://localhost/Projecte_Backend/garatge/repostarVehicle.php", {
                method: "POST",
                credentials: "include",
                body: formData,
            }).finally(() => setCarga(false));

            const data = await res.json();

            if (data.ok) {
                if (alTerminar) {
                    setSuccessBack("Vehicle repostat correctament");
                    setTimeout(() => {
                        alTerminar();
                    }, 2000);
                }
            } else {
                setErrorBack("Error al repostar el vehicle");
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

            <div className={styles.formulari_IS_Conetnidor} style={{ display: carrega || successBack !== "" ? "none" : "block" }}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Repostar Vehicle</h1>
                    <p className={styles.subtitle}>Introdueix les dades del repostatge</p>
                </div>

                {errorBack && <div className={styles.error}><p>{errorBack}</p></div>}

                <Form onSubmit={handleSubmit} className={styles.formulari_IS}>
                    {/* DATA */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="data" className={styles.label}>Data</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path></svg>
                            <Input
                                type="date"
                                name="data"
                                id="data"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* LÓGICA DE COMBUSTIBLE */}
                    {tipus_combustible === "Elèctric" ? (
                        <FormGroup className={styles.conetnidorAux}>
                            <Label htmlFor="kwh" className={styles.label}>kWh</Label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.icon} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612.000000 612.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,612.000000) scale(0.100000,-0.100000)" fill="#6b6d76" stroke="none">
                                        <path d="M1558 4724 c-42 -22 -48 -43 -48 -158 l0 -106 -323 0 c-369 0 -374 -1 -415 -81 l-22 -44 2 -1425 3 -1425 24 -34 c13 -18 42 -42 65 -52 40 -18 117 -19 2216 -19 l2176 0 44 23 c24 12 53 35 64 50 21 28 21 33 24 1455 l2 1427 -22 44 c-41 80 -46 81 -410 81 l-318 0 0 111 c0 109 0 111 -30 140 l-29 30 -350 -3 -351 -3 -25 -26 c-25 -24 -26 -32 -28 -135 l-2 -109 -739 0 -739 0 2 82 c3 107 -11 158 -49 178 -43 22 -681 22 -722 -1z m3499 -1801 l3 -1223 -1995 0 -1995 0 -2 1221 c-2 671 -1 1223 1 1225 2 2 900 3 1995 2 l1991 -3 2 -1222z" />
                                        <path d="M4142 3970 c-52 -32 -62 -69 -62 -235 l0 -145 -152 0 c-132 0 -157 -3 -184 -19 -61 -37 -79 -126 -39 -188 29 -43 71 -53 230 -53 l145 0 0 -148 c0 -124 3 -153 18 -182 40 -76 145 -91 206 -31 l31 31 5 163 5 162 163 5 164 5 34 37 c28 32 34 45 34 84 0 50 -20 92 -54 115 -15 10 -67 15 -181 19 l-160 5 -5 162 -5 163 -32 31 c-41 42 -112 50 -161 19z" />
                                        <path d="M1464 3580 c-11 -4 -33 -22 -47 -40 -35 -41 -38 -114 -6 -154 44 -56 41 -56 511 -56 406 0 435 1 464 19 32 20 64 74 64 110 0 40 -28 90 -62 111 -32 19 -49 20 -468 19 -239 0 -444 -4 -456 -9z" />
                                    </g>
                                </svg>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="kwh"
                                    id="kwh"
                                    placeholder="Ex: 50"
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </FormGroup>
                    ) : tipus_combustible === "Híbrid" || tipus_combustible === "Híbrid Endollable" ? (
                        <>
                            <FormGroup className={styles.conetnidorAux}>
                                <Label htmlFor="kwh" className={styles.label}>kWh</Label>
                                <div className={styles.inputWrapper}>
                                    <svg className={styles.icon} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612.000000 612.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,612.000000) scale(0.100000,-0.100000)" fill="#6b6d76" stroke="none">
                                            <path d="M1558 4724 c-42 -22 -48 -43 -48 -158 l0 -106 -323 0 c-369 0 -374 -1 -415 -81 l-22 -44 2 -1425 3 -1425 24 -34 c13 -18 42 -42 65 -52 40 -18 117 -19 2216 -19 l2176 0 44 23 c24 12 53 35 64 50 21 28 21 33 24 1455 l2 1427 -22 44 c-41 80 -46 81 -410 81 l-318 0 0 111 c0 109 0 111 -30 140 l-29 30 -350 -3 -351 -3 -25 -26 c-25 -24 -26 -32 -28 -135 l-2 -109 -739 0 -739 0 2 82 c3 107 -11 158 -49 178 -43 22 -681 22 -722 -1z m3499 -1801 l3 -1223 -1995 0 -1995 0 -2 1221 c-2 671 -1 1223 1 1225 2 2 900 3 1995 2 l1991 -3 2 -1222z" />
                                            <path d="M4142 3970 c-52 -32 -62 -69 -62 -235 l0 -145 -152 0 c-132 0 -157 -3 -184 -19 -61 -37 -79 -126 -39 -188 29 -43 71 -53 230 -53 l145 0 0 -148 c0 -124 3 -153 18 -182 40 -76 145 -91 206 -31 l31 31 5 163 5 162 163 5 164 5 34 37 c28 32 34 45 34 84 0 50 -20 92 -54 115 -15 10 -67 15 -181 19 l-160 5 -5 162 -5 163 -32 31 c-41 42 -112 50 -161 19z" />
                                            <path d="M1464 3580 c-11 -4 -33 -22 -47 -40 -35 -41 -38 -114 -6 -154 44 -56 41 -56 511 -56 406 0 435 1 464 19 32 20 64 74 64 110 0 40 -28 90 -62 111 -32 19 -49 20 -468 19 -239 0 -444 -4 -456 -9z" />
                                        </g>
                                    </svg>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        name="kwh"
                                        id="kwh"
                                        placeholder="Ex: 15"
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup className={styles.conetnidorAux}>
                                <Label htmlFor="litres" className={styles.label}>Litres</Label>
                                <div className={styles.inputWrapper}>
                                    <svg className={styles.icon} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#6b6d76" stroke="none">
                                            <path d="M57 482 c-15 -16 -17 -47 -17 -220 0 -128 -4 -202 -10 -202 -5 0 -10 -13 -10 -30 l0 -30 175 0 175 0 0 30 c0 17 -4 30 -10 30 -6 0 -10 35 -10 86 0 76 2 85 15 74 9 -8 15 -30 15 -56 0 -73 56 -108 100 -64 17 17 20 33 20 123 l0 103 -60 59 c-33 32 -63 56 -67 52 -3 -4 6 -20 20 -35 22 -23 27 -37 27 -78 0 -43 4 -55 30 -79 27 -26 31 -35 28 -79 -2 -33 -9 -52 -21 -60 -30 -19 -51 5 -57 64 -5 40 -11 57 -28 68 -20 13 -22 22 -22 122 0 142 2 140 -157 140 -103 0 -122 -3 -136 -18z m261 -14 c9 -9 12 -69 12 -210 l0 -198 -135 0 -135 0 0 198 c0 141 3 201 12 210 17 17 229 17 246 0z m162 -186 c0 -34 0 -35 -20 -17 -13 12 -20 31 -20 53 0 34 0 35 20 17 13 -12 20 -31 20 -53z m-130 -252 c0 -6 -58 -10 -155 -10 -97 0 -155 4 -155 10 0 6 58 10 155 10 97 0 155 -4 155 -10z" />
                                            <path d="M84 447 c-3 -8 -4 -43 -2 -78 l3 -64 110 0 110 0 0 75 0 75 -108 3 c-84 2 -109 0 -113 -11z m206 -67 l0 -60 -95 0 -95 0 0 60 0 60 95 0 95 0 0 -60z" />
                                        </g>
                                    </svg>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        name="litres"
                                        id="litres"
                                        placeholder="Ex: 30"
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                            </FormGroup>
                        </>
                    ) : (
                        <FormGroup className={styles.conetnidorAux}>
                            <Label htmlFor="litres" className={styles.label}>Litres</Label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.icon} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#6b6d76" stroke="none">
                                        <path d="M57 482 c-15 -16 -17 -47 -17 -220 0 -128 -4 -202 -10 -202 -5 0 -10 -13 -10 -30 l0 -30 175 0 175 0 0 30 c0 17 -4 30 -10 30 -6 0 -10 35 -10 86 0 76 2 85 15 74 9 -8 15 -30 15 -56 0 -73 56 -108 100 -64 17 17 20 33 20 123 l0 103 -60 59 c-33 32 -63 56 -67 52 -3 -4 6 -20 20 -35 22 -23 27 -37 27 -78 0 -43 4 -55 30 -79 27 -26 31 -35 28 -79 -2 -33 -9 -52 -21 -60 -30 -19 -51 5 -57 64 -5 40 -11 57 -28 68 -20 13 -22 22 -22 122 0 142 2 140 -157 140 -103 0 -122 -3 -136 -18z m261 -14 c9 -9 12 -69 12 -210 l0 -198 -135 0 -135 0 0 198 c0 141 3 201 12 210 17 17 229 17 246 0z m162 -186 c0 -34 0 -35 -20 -17 -13 12 -20 31 -20 53 0 34 0 35 20 17 13 -12 20 -31 20 -53z m-130 -252 c0 -6 -58 -10 -155 -10 -97 0 -155 4 -155 10 0 6 58 10 155 10 97 0 155 -4 155 -10z" />
                                        <path d="M84 447 c-3 -8 -4 -43 -2 -78 l3 -64 110 0 110 0 0 75 0 75 -108 3 c-84 2 -109 0 -113 -11z m206 -67 l0 -60 -95 0 -95 0 0 60 0 60 95 0 95 0 0 -60z" />
                                    </g>
                                </svg>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="litres"
                                    id="litres"
                                    placeholder="Ex: 50"
                                    onChange={handleChange}
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </FormGroup>
                    )}

                    {/* QUILOMETRES RECORREGUTS */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="quilometres_recorreguts" className={styles.label}>Quilòmetres recorreguts</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501.015 501.015">
                                <g fill="#6b6d76">
                                    <path d="M242.105,115.922L242.105,115.922h-0.006V96.015V56.188h0.006h16.804v59.734h-0.018v0.012l-8.391-0.012H242.105z M39.555,317.098l41.919-7.389l16.908-2.979v-0.012h0.006l-1.478-8.334l-1.442-8.193h-0.006v-0.012l-58.83,10.368L39.555,317.098z M411.266,169.234l-30.228,17.437v0.012l0,0l4.663,8.086l3.735,6.452l0,0l51.731-29.864l-8.405-14.549L411.266,169.234z M150.24,390.923l-6.623-5.556l0,0l0,0l-38.402,45.749l12.879,10.805l16.71-19.919l21.687-25.842l0,0L150.24,390.923z M432.562,386.81l8.394-14.559l-18.046-10.421l-33.673-19.458v0.012l0,0l-4.641,8.027l-3.753,6.514l0,0v0.012L432.562,386.81z M36.703,242.282l20.98,3.686l37.84,6.69v-0.012h0.006l2.5-14.215l0.405-2.329v-0.012l-58.827-10.382L36.703,242.282z M461.04,226.158l-15.989,2.813l-42.841,7.542v0.012h-0.006l2.163,12.256l0.757,4.279l0,0v0.012l58.836-10.367L461.04,226.158z M189.346,128.104v0.012l13.636-4.974l2.143-0.78h0.006l-20.422-56.14l-15.791,5.757l2.911,8.003L189.346,128.104L189.346,128.104z M67.814,386.431l51.725-29.86v-0.012l0,0l-6.469-11.201l-1.93-3.346l0,0l0,0l-51.734,29.861l8.402,14.552h0.006V386.431z M343.782,396.432l38.396,45.773L395.04,431.4v-0.012l-38.385-45.762v0.012v-0.012l-8.931,7.495L343.782,396.432L343.782,396.432z M59.625,170.992L59.625,170.992l51.731,29.876l0,0l7.276-12.613l1.12-1.936v-0.012l-51.731-29.864L59.625,170.992z M463.877,300.973L463.877,300.973l-58.824-10.379l-0.626,3.547l-2.294,13.004l58.83,10.379L463.877,300.973z M118.408,101.05 l-12.868,10.802l14.109,16.81l24.291,28.948l0,0l0,0l7.601-6.384l5.26-4.412l0,0l0.006-0.012L118.408,101.05z M311.249,80.203 L295.846,122.5l0.012,0.012l0,0l10.521,3.818l5.261,1.912l0,0h0.006l20.434-56.126l-15.794-5.742L311.249,80.203z M353.712,155.154 l3.263,2.731l0,0l0,0l38.402-45.767l-12.873-10.79h-0.006l0,0l-38.396,45.752l0,0v0.012L353.712,155.154z M250.507,27.021 C112.382,27.021,0,139.394,0,277.531c0,79.57,37.333,150.535,95.361,196.462h25.36C57.036,431.778,14.939,359.49,14.939,277.531 c0-129.896,105.673-235.568,235.567-235.568c129.898,0,235.571,105.672,235.571,235.568c0,81.959-42.097,154.247-105.785,196.462 h25.363c58.02-45.927,95.358-116.892,95.358-196.462C501.015,139.399,388.633,27.021,250.507,27.021z M201.607,387.234 c5.255,0,7.876-5.236,7.876-15.698c0-10.829-2.568-16.255-7.713-16.255c-5.423,0-8.139,5.503-8.139,16.521 C193.631,382.093,196.294,387.234,201.607,387.234z M179.152,336.71h44.553v69.699h-44.553V336.71z M189.177,372.009 c0,6.124,1.052,10.793,3.165,14.032c2.11,3.233,5.048,4.858,8.819,4.858c4.031,0,7.164-1.702,9.41-5.083 c2.246-3.398,3.372-8.299,3.372-14.735c0-12.986-3.978-19.482-11.931-19.482c-4.158,0-7.33,1.708-9.531,5.172 C190.276,360.211,189.177,365.294,189.177,372.009z M229.56,336.71h43.754v69.699H229.56V336.71z M241.053,389.327 c1.738,1.04,4.359,1.572,7.874,1.572c4.17,0,7.459-1.123,9.847-3.369s3.594-5.213,3.594-8.89c0-3.547-1.111-6.348-3.334-8.394 c-2.233-2.033-5.378-3.062-9.445-3.062c-0.993,0-2.065,0.035-3.233,0.106v-11.136h14.287v-3.925h-18.403V371.3 c2.92-0.213,4.909-0.319,5.964-0.319c3.136,0,5.538,0.697,7.214,2.092c1.679,1.396,2.524,3.346,2.524,5.828 c0,2.519-0.822,4.527-2.471,6.053c-1.646,1.525-3.807,2.281-6.493,2.281c-2.689,0-5.326-0.839-7.93-2.518v4.61H241.053z M277.848,336.71h44.006v69.699h-44.006V336.71z M288.788,372.009c0,6.124,1.053,10.793,3.168,14.032 c2.11,3.233,5.049,4.858,8.819,4.858c4.031,0,7.17-1.702,9.41-5.083c2.246-3.398,3.369-8.299,3.369-14.735 c0-12.986-3.984-19.482-11.935-19.482c-4.154,0-7.329,1.708-9.533,5.172C289.888,360.211,288.788,365.294,288.788,372.009z M301.225,387.234c5.249,0,7.879-5.236,7.879-15.698c0-10.829-2.571-16.255-7.714-16.255c-5.426,0-8.139,5.503-8.139,16.521 C293.245,382.093,295.905,387.234,301.225,387.234z M257.815,300.725c-1.052,0-1.974,0.379-2.943,0.58L140.064,200.018 L242.191,314.97c-0.068,0.579-0.358,1.1-0.358,1.673c0,8.849,7.144,16,15.982,16c8.784,0,15.924-7.151,15.924-16 C273.751,307.877,266.6,300.725,257.815,300.725z" />
                                </g>
                            </svg>
                            <Input
                                type="number"
                                name="quilometres_recorreguts"
                                id="quilometres_recorreguts"
                                placeholder="Ex: 600"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* QUILOMETRES ACTUALS */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="quilometres_actuals" className={styles.label}>Quilòmetres actuals</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501.015 501.015">
                                <g fill="#6b6d76">
                                    <path d="M242.105,115.922L242.105,115.922h-0.006V96.015V56.188h0.006h16.804v59.734h-0.018v0.012l-8.391-0.012H242.105z M39.555,317.098l41.919-7.389l16.908-2.979v-0.012h0.006l-1.478-8.334l-1.442-8.193h-0.006v-0.012l-58.83,10.368L39.555,317.098z M411.266,169.234l-30.228,17.437v0.012l0,0l4.663,8.086l3.735,6.452l0,0l51.731-29.864l-8.405-14.549L411.266,169.234z M150.24,390.923l-6.623-5.556l0,0l0,0l-38.402,45.749l12.879,10.805l16.71-19.919l21.687-25.842l0,0L150.24,390.923z M432.562,386.81l8.394-14.559l-18.046-10.421l-33.673-19.458v0.012l0,0l-4.641,8.027l-3.753,6.514l0,0v0.012L432.562,386.81z M36.703,242.282l20.98,3.686l37.84,6.69v-0.012h0.006l2.5-14.215l0.405-2.329v-0.012l-58.827-10.382L36.703,242.282z M461.04,226.158l-15.989,2.813l-42.841,7.542v0.012h-0.006l2.163,12.256l0.757,4.279l0,0v0.012l58.836-10.367L461.04,226.158z M189.346,128.104v0.012l13.636-4.974l2.143-0.78h0.006l-20.422-56.14l-15.791,5.757l2.911,8.003L189.346,128.104L189.346,128.104z M67.814,386.431l51.725-29.86v-0.012l0,0l-6.469-11.201l-1.93-3.346l0,0l0,0l-51.734,29.861l8.402,14.552h0.006V386.431z M343.782,396.432l38.396,45.773L395.04,431.4v-0.012l-38.385-45.762v0.012v-0.012l-8.931,7.495L343.782,396.432L343.782,396.432z M59.625,170.992L59.625,170.992l51.731,29.876l0,0l7.276-12.613l1.12-1.936v-0.012l-51.731-29.864L59.625,170.992z M463.877,300.973L463.877,300.973l-58.824-10.379l-0.626,3.547l-2.294,13.004l58.83,10.379L463.877,300.973z M118.408,101.05 l-12.868,10.802l14.109,16.81l24.291,28.948l0,0l0,0l7.601-6.384l5.26-4.412l0,0l0.006-0.012L118.408,101.05z M311.249,80.203 L295.846,122.5l0.012,0.012l0,0l10.521,3.818l5.261,1.912l0,0h0.006l20.434-56.126l-15.794-5.742L311.249,80.203z M353.712,155.154 l3.263,2.731l0,0l0,0l38.402-45.767l-12.873-10.79h-0.006l0,0l-38.396,45.752l0,0v0.012L353.712,155.154z M250.507,27.021 C112.382,27.021,0,139.394,0,277.531c0,79.57,37.333,150.535,95.361,196.462h25.36C57.036,431.778,14.939,359.49,14.939,277.531 c0-129.896,105.673-235.568,235.567-235.568c129.898,0,235.571,105.672,235.571,235.568c0,81.959-42.097,154.247-105.785,196.462 h25.363c58.02-45.927,95.358-116.892,95.358-196.462C501.015,139.399,388.633,27.021,250.507,27.021z M201.607,387.234 c5.255,0,7.876-5.236,7.876-15.698c0-10.829-2.568-16.255-7.713-16.255c-5.423,0-8.139,5.503-8.139,16.521 C193.631,382.093,196.294,387.234,201.607,387.234z M179.152,336.71h44.553v69.699h-44.553V336.71z M189.177,372.009 c0,6.124,1.052,10.793,3.165,14.032c2.11,3.233,5.048,4.858,8.819,4.858c4.031,0,7.164-1.702,9.41-5.083 c2.246-3.398,3.372-8.299,3.372-14.735c0-12.986-3.978-19.482-11.931-19.482c-4.158,0-7.33,1.708-9.531,5.172 C190.276,360.211,189.177,365.294,189.177,372.009z M229.56,336.71h43.754v69.699H229.56V336.71z M241.053,389.327 c1.738,1.04,4.359,1.572,7.874,1.572c4.17,0,7.459-1.123,9.847-3.369s3.594-5.213,3.594-8.89c0-3.547-1.111-6.348-3.334-8.394 c-2.233-2.033-5.378-3.062-9.445-3.062c-0.993,0-2.065,0.035-3.233,0.106v-11.136h14.287v-3.925h-18.403V371.3 c2.92-0.213,4.909-0.319,5.964-0.319c3.136,0,5.538,0.697,7.214,2.092c1.679,1.396,2.524,3.346,2.524,5.828 c0,2.519-0.822,4.527-2.471,6.053c-1.646,1.525-3.807,2.281-6.493,2.281c-2.689,0-5.326-0.839-7.93-2.518v4.61H241.053z M277.848,336.71h44.006v69.699h-44.006V336.71z M288.788,372.009c0,6.124,1.053,10.793,3.168,14.032 c2.11,3.233,5.049,4.858,8.819,4.858c4.031,0,7.17-1.702,9.41-5.083c2.246-3.398,3.369-8.299,3.369-14.735 c0-12.986-3.984-19.482-11.935-19.482c-4.154,0-7.329,1.708-9.533,5.172C289.888,360.211,288.788,365.294,288.788,372.009z M301.225,387.234c5.249,0,7.879-5.236,7.879-15.698c0-10.829-2.571-16.255-7.714-16.255c-5.426,0-8.139,5.503-8.139,16.521 C293.245,382.093,295.905,387.234,301.225,387.234z M257.815,300.725c-1.052,0-1.974,0.379-2.943,0.58L140.064,200.018 L242.191,314.97c-0.068,0.579-0.358,1.1-0.358,1.673c0,8.849,7.144,16,15.982,16c8.784,0,15.924-7.151,15.924-16 C273.751,307.877,266.6,300.725,257.815,300.725z" />
                                </g>
                            </svg>
                            <Input
                                type="number"
                                name="quilometres_actuals"
                                id="quilometres_actuals"
                                placeholder="Ex: 20000"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* COST TOTAL */}
                    <FormGroup className={styles.conetnidorAux}>
                        <Label htmlFor="cost_total" className={styles.label}>Cost total (€)</Label>
                        <div className={styles.inputWrapper}>
                            <svg className={styles.icon} fill="#6b6d76" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.2,17.41A6,6,0,0,1,14.46,20c-2.68,0-5-2-6-5H14a1,1,0,0,0,0-2H8.05c0-.33-.05-.67-.05-1s0-.67.05-1H14a1,1,0,0,0,0-2H8.47c1-3,3.31-5,6-5A6,6,0,0,1,19.2,6.59a1,1,0,1,0,1.6-1.18A7.92,7.92,0,0,0,14.46,2c-3.76,0-7,2.84-8.07,7H4a1,1,0,0,0,0,2H6.05c0,.33,0,.67,0,1s0,.67,0,1H4a1,1,0,0,0,0,2H6.39c1.09,4.16,4.31,7,8.07,7a7.92,7.92,0,0,0,6.34-3.41,1,1,0,0,0-1.6-1.18Z" /></svg>
                            <Input
                                type="number"
                                step="0.01"
                                name="cost_total"
                                id="cost_total"
                                placeholder="Ex: 70"
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>
                    </FormGroup>

                    {/* CÁLCULO DE CONSUMO MEDIO (Visualización) */}
                    {consumMitjaCalculat && (
                        <FormGroup className={styles.conetnidorAux}>
                            <Label className={styles.label}>Consum Mitjà (Estimat)</Label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.icon} version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#6b6d76" stroke="none">
                                        <path d="M57 482 c-15 -16 -17 -47 -17 -220 0 -128 -4 -202 -10 -202 -5 0 -10 -13 -10 -30 l0 -30 175 0 175 0 0 30 c0 17 -4 30 -10 30 -6 0 -10 35 -10 86 0 76 2 85 15 74 9 -8 15 -30 15 -56 0 -73 56 -108 100 -64 17 17 20 33 20 123 l0 103 -60 59 c-33 32 -63 56 -67 52 -3 -4 6 -20 20 -35 22 -23 27 -37 27 -78 0 -43 4 -55 30 -79 27 -26 31 -35 28 -79 -2 -33 -9 -52 -21 -60 -30 -19 -51 5 -57 64 -5 40 -11 57 -28 68 -20 13 -22 22 -22 122 0 142 2 140 -157 140 -103 0 -122 -3 -136 -18z m261 -14 c9 -9 12 -69 12 -210 l0 -198 -135 0 -135 0 0 198 c0 141 3 201 12 210 17 17 229 17 246 0z m162 -186 c0 -34 0 -35 -20 -17 -13 12 -20 31 -20 53 0 34 0 35 20 17 13 -12 20 -31 20 -53z m-130 -252 c0 -6 -58 -10 -155 -10 -97 0 -155 4 -155 10 0 6 58 10 155 10 97 0 155 -4 155 -10z" />
                                        <path d="M84 447 c-3 -8 -4 -43 -2 -78 l3 -64 110 0 110 0 0 75 0 75 -108 3 c-84 2 -109 0 -113 -11z m206 -67 l0 -60 -95 0 -95 0 0 60 0 60 95 0 95 0 0 -60z" />
                                    </g>
                                </svg>
                                <Input
                                    type="text"
                                    value={consumMitjaCalculat}
                                    className={styles.input}
                                    style={{ backgroundColor: "#f0f0f0", color: "#666" }}
                                    disabled
                                />
                            </div>
                        </FormGroup>
                    )}

                    <Button type="submit" className={styles.button}>Registrar repostatge</Button>
                </Form>
            </div>
        </div>
    );
}