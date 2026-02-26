import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Registrat.module.css";
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { httpRequest } from '../httpRequestUtils';

function Registrar() {
  const [nom, setNom] = useState("");
  const [cognoms, setCognoms] = useState("");
  const [data_nei, setData_nei] = useState("");
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [rep_contra, setRep_contra] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      const signInData = { nom, cognoms, data_nei, email, contra, rep_contra };
      
      httpRequest('http://localhost/Projecte_Backend/register/register.php', 'POST', signInData)
        .then(res => {
          setNom(""); setCognoms(""); setData_nei(""); setEmail(""); setContra(""); setRep_contra("");
          navigate('/');
        })
        .catch(err => {
          console.error(err);
        });
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
          <img src="./img/logo_Box.png" alt="BoxSphere Logo" className={styles.logo} />
          <h1 className={styles.title}>Registra't</h1>
          <p className={styles.subtitle}>Crea el teu compte a BoxSphere</p>
        </div>

        <Form onSubmit={enviar} className={styles.formulari_IS} noValidate>
          
          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="nom" className={styles.label} style={errors.nom ? { color: '#e74c3c' } : {}}>Nom</Label>
            <div className={styles.inputWrapper} style={errors.nom ? { borderColor: '#e74c3c' } : {}}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <Input
                type="text"
                id="nom"
                value={nom}
                placeholder="El teu nom"
                onChange={(e) => handleChange(setNom, 'nom', e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.nom && <span className={styles.errorText}>El nom és obligatori.</span>}
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="cognoms" className={styles.label} style={errors.cognoms ? { color: '#e74c3c' } : {}}>Cognoms</Label>
            <div className={styles.inputWrapper} style={errors.cognoms ? { borderColor: '#e74c3c' } : {}}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              <Input
                type="text"
                id="cognoms"
                value={cognoms}
                placeholder="Els teus cognoms"
                onChange={(e) => handleChange(setCognoms, 'cognoms', e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.cognoms && <span className={styles.errorText}>Els cognoms són obligatoris.</span>}
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="data_nei" className={styles.label} style={errors.data_nei ? { color: '#e74c3c' } : {}}>Data Naixement</Label>
            <div className={styles.inputWrapper} style={errors.data_nei ? { borderColor: '#e74c3c' } : {}}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <Input
                type="date"
                id="data_nei"
                value={data_nei}
                onChange={(e) => handleChange(setData_nei, 'data_nei', e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.data_nei && <span className={styles.errorText}>La data és obligatòria.</span>}
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="email" className={styles.label} style={errors.email ? { color: '#e74c3c' } : {}}>Correu electrònic</Label>
            <div className={styles.inputWrapper} style={errors.email ? { borderColor: '#e74c3c' } : {}}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder="el-teu@email.com"
                onChange={(e) => handleChange(setEmail, 'email', e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.email && <span className={styles.errorText}>Introdueix un correu vàlid.</span>}
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="contra" className={styles.label} style={errors.contra ? { color: '#e74c3c' } : {}}>Contrasenya</Label>
            <div className={styles.inputWrapper} style={errors.contra ? { borderColor: '#e74c3c' } : {}}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <Input
                type="password"
                id="contra"
                value={contra}
                placeholder="••••••••"
                onChange={(e) => handleChange(setContra, 'contra', e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.contra && <span className={styles.errorText}>Mín. 8 caràcters, 1 maj, 1 min, 1 núm, 1 símbol.</span>}
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="rep_contra" className={styles.label} style={errors.rep_contra ? { color: '#e74c3c' } : {}}>Repeteix la contrasenya</Label>
            <div className={styles.inputWrapper} style={errors.rep_contra ? { borderColor: '#e74c3c' } : {}}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <Input
                type="password"
                id="rep_contra"
                value={rep_contra}
                placeholder="••••••••"
                onChange={(e) => handleChange(setRep_contra, 'rep_contra', e.target.value)}
                className={styles.input}
              />
            </div>
            {errors.rep_contra && <span className={styles.errorText}>La contrasenya no coincideix.</span>}
          </FormGroup>

          <Button type="submit" className={styles.button}>Registrar-se</Button>
          
          <div className={styles.footerText}>
            Ja tens compte? <Link className={styles.link} to="/iniciar_sessio">Inicia sessió</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Registrar;