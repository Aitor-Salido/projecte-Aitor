import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./IniciarSessio.module.css";
import {Form, Button, Label, Input, FormGroup} from 'reactstrap';
import {httpRequest} from '../httpRequestUtils';

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
      } else {
        alert(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.contenidorPrincipal}>
      <div className={styles.formulari_IS_Conetnidor}>
        <Form onSubmit={enviar} className={styles.formulari_IS}>
          <FormGroup className={styles.conetnidorAux}>
            <Input
              type="email"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label htmlFor="email">Correu electrònic</Label>
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Input
              type="password"
              id="contra"
              value={contra}
              placeholder=" "
              onChange={(e) => setContra(e.target.value)}
            />
            <Label htmlFor="contra">Contrasenya</Label>
          </FormGroup>

          <Button type="submit">Iniciar Sessió</Button>
        </Form>
      </div>
    </div>
  );
}

export default Iniciar_Sessio;