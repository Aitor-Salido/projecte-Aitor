import { useState } from "react";
import styles from "./Registrat.module.css";
import { httpRequest } from '../httpRequestUtils';

function Registrar() {
  const [nom, setNom] = useState("");
  const [cognoms, setCognoms] = useState("");
  const [data_nei, setData_nei] = useState("");
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [rep_contra, setRep_contra] = useState("");

  // Control de errores visuales
  const [errors, setErrors] = useState({});

  const validarFormulario = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contraRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    const nuevosErrores = {
      nom: nom.trim() === "",
      cognoms: cognoms.trim() === "",
      data_nei: data_nei.trim() === "",
      email: !emailRegex.test(email),
      contra: !contraRegex.test(contra),
      rep_contra: rep_contra.trim() === "" || contra !== rep_contra
    };

    setErrors(nuevosErrores);
    return !Object.values(nuevosErrores).some(error => error === true);
  };

  const enviar = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const signInData = { nom, cognoms, data_nei, email, contra, rep_contra};
      
      httpRequest('http://localhost/Projecte_Backend/register/register.php', 'POST', signInData)
        .then(res => {
          console.log("Registre completat amb èxit!", res);
          setNom(""); setCognoms(""); setData_nei(""); setEmail(""); setContra(""), setRep_contra("");
        })
        .catch(err => {
          console.error("Error al registrar:", err);
        });
    } else {
      console.log("Revisa els camps en vermell.");
    }
  };

  const handleChange = (setter, campo, valor) => {
    setter(valor);
    // Quita la alerta roja en cuanto el usuario empieza a escribir de nuevo
    if (errors[campo]) {
      setErrors(prev => ({ ...prev, [campo]: false }));
    }
  };

  return (
    <div className={styles.contenidorPrincipal}>
      <div className={styles.formulari_IS_Conetnidor}>
        <form onSubmit={enviar} className={styles.formulari_IS}>
          
          <div className={styles.conetnidorAux}>
            <input
              type="text"
              id="nom"
              value={nom}
              placeholder=" "
              onChange={(e) => handleChange(setNom, 'nom', e.target.value)}
              style={errors.nom ? { borderBottomColor: '#e74c3c' } : {}} 
            />
            <label htmlFor="nom" style={errors.nom ? { color: '#e74c3c' } : {}}>Nom</label>
            {errors.nom && <span className={styles.errorText}>El nom és obligatori.</span>}
          </div>

          <div className={styles.conetnidorAux}>
            <input
              type="text"
              id="cognoms"
              value={cognoms}
              placeholder=" "
              onChange={(e) => handleChange(setCognoms, 'cognoms', e.target.value)}
              style={errors.cognoms ? { borderBottomColor: '#e74c3c' } : {}}
            />
            <label htmlFor="cognoms" style={errors.cognoms ? { color: '#e74c3c' } : {}}>Cognoms</label>
            {errors.cognoms && <span className={styles.errorText}>Els cognoms són obligatoris.</span>}
          </div>

          <div className={styles.conetnidorAux}>
            <input
              type="date"
              id="data_nei"
              value={data_nei}
              placeholder=" "
              onChange={(e) => handleChange(setData_nei, 'data_nei', e.target.value)}
              style={errors.data_nei ? { borderBottomColor: '#e74c3c' } : {}}
            />
            <label htmlFor="data_nei" style={errors.data_nei ? { color: '#e74c3c' } : {}}>Data Naixement</label>
            {errors.data_nei && <span className={styles.errorText}>La data és obligatòria.</span>}
          </div>

          <div className={styles.conetnidorAux}>
            <input
              type="text"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => handleChange(setEmail, 'email', e.target.value)}
              style={errors.email ? { borderBottomColor: '#e74c3c' } : {}}
            />
            <label htmlFor="email" style={errors.email ? { color: '#e74c3c' } : {}}>Correu electrònic</label>
            {errors.email && <span className={styles.errorText}>Introdueix un correu vàlid.</span>}
          </div>

          <div className={styles.conetnidorAux}>
            <input
              type="password"
              id="contra"
              value={contra}
              placeholder=" "
              onChange={(e) => handleChange(setContra, 'contra', e.target.value)}
              style={errors.contra ? { borderBottomColor: '#e74c3c' } : {}}
            />
            <label htmlFor="contra" style={errors.contra ? { color: '#e74c3c' } : {}}>Contrasenya</label>
            {errors.contra && <span className={styles.errorText}>Mín. 8 caràcters, 1 maj, 1 min, 1 núm, 1 símbol.</span>}
          </div>

          <div className={styles.conetnidorAux}>
            <input
              type="password"
              id="rep_contra"
              value={rep_contra}
              placeholder=" "
              onChange={(e) => handleChange(setRep_contra, 'rep_contra', e.target.value)}
              style={errors.rep_contra ? { borderBottomColor: '#e74c3c' } : {}}
            />
            <label htmlFor="rep_contra" style={errors.rep_contra ? { color: '#e74c3c' } : {}}>Repeteix la contrasenya</label>
            {errors.rep_contra && <span className={styles.errorText}>La contrasenya no coincideix.</span>}
          </div>

          <button type="submit">Registrat</button>
        </form>
      </div>
    </div>
  );
}

export default Registrar;