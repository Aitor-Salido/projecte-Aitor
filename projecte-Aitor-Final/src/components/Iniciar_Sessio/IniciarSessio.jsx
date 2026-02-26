import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./IniciarSessio.module.css";
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { httpRequest } from '../httpRequestUtils';

function Iniciar_Sessio({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    const signInData = {
      email: email,
      contra: contra
    }
    
    try {
      const data = await httpRequest('http://localhost/Projecte_Backend/login/login.php', 'POST', signInData);
      
      if (data.valor === true) {
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.contenidorPrincipal}>
      <div className={styles.formulari_IS_Conetnidor}>
        
        {/* Cabecera con Logo, Título y Subtítulo */}
        <div className={styles.header}>
          {/* Sustituye la ruta del src por la de tu imagen del coche/planeta */}
          <img src="./img/logo_Box.png" alt="BoxSphere Logo" className={styles.logo} />
          <h1 className={styles.title}>Iniciar sessió</h1>
          <p className={styles.subtitle}>Benvingut/da de nou a BoxSphere</p>
        </div>

        <Form onSubmit={enviar} className={styles.formulari_IS} noValidate>
          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="email" className={styles.label}>Correu electrònic</Label>
            <div className={styles.inputWrapper}>
              {/* Icono de Email */}
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
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

          <FormGroup className={styles.conetnidorAux}>
            <Label htmlFor="contra" className={styles.label}>Contrasenya</Label>
            <div className={styles.inputWrapper}>
              {/* Icono de Candado */}
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <Input
                type="password"
                id="contra"
                value={contra}
                placeholder="••••••••"
                onChange={(e) => setContra(e.target.value)}
                className={styles.input}
              />
              {/* Icono de Ojo cerrado */}
              <svg className={styles.iconRight} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </div>
            <Link className={styles.linkForgot} to="/">Has oblidat la contrasenya?</Link>
          </FormGroup>

          <Button type="submit" className={styles.button}>Iniciar sessió</Button>
          
          <div className={styles.footerText}>
            No tens compte? <Link className={styles.link} to="/registrat">Registra't</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Iniciar_Sessio;