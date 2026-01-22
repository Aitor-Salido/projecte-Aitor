import { useState } from "react";
import styles from "./IniciarSessio.module.css";
import {Form,Button,Label,Input,FormGroup} from 'reactstrap';
import {httpRequest} from '../httpRequestUtils';

function Iniciar_Sessio(props) {
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");

    const enviar = (e) => {
      e.preventDefault();
      const signInData={
        email:email,
        contra:contra
      }
      console.log(signInData);
      httpRequest('http://localhost/Projecte_Backend/login/login.php', 'POST', signInData)
        .then(function(result) {
        console.log(result)
        props.modLogged(result.valor);
        });
    
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
