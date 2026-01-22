import { useState } from "react";
import styles from "./Registrat.module.css";
import {Form,Button,Label,Input,FormGroup} from 'reactstrap';
import {httpRequest} from '../httpRequestUtils';

function Registrar() {
  const [nom, setNom] = useState("");
  const [cognoms, setCognoms] = useState("");
  const [data_nei, setData_nei] = useState("");
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");

    const enviar = (e) => {
      e.preventDefault();
      const signInData={
        nom:nom,
        cognoms:cognoms,
        data_nei:data_nei,
        email:email,
        contra:contra
      }
      console.log(signInData);
      httpRequest('http://localhost/Projecte_Backend/register/register.php', 'POST', signInData)
        .then(function(result) {
        console.log(result)
        props.pepe(result.valor);
        });
    
    };

  return (
    <div className={styles.contenidorPrincipal}>
      <div className={styles.formulari_IS_Conetnidor}>
        <Form onSubmit={enviar} className={styles.formulari_IS}>
          <FormGroup className={styles.conetnidorAux}>
            <Input
              type="text"
              id="nom"
              value={nom}
              placeholder=" "
              onChange={(e) => setNom(e.target.value)}
            />
            <Label htmlFor="nom">Nom</Label>
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Input
              type="text"
              id="cognoms"
              value={cognoms}
              placeholder=" "
              onChange={(e) => setCognoms(e.target.value)}
            />
            <Label htmlFor="cognoms">Cognoms</Label>
          </FormGroup>

          <FormGroup className={styles.conetnidorAux}>
            <Input
              type="date"
              id="data_nei"
              value={data_nei}
              placeholder=" "
              onChange={(e) => setData_nei(e.target.value)}
            />
            <Label htmlFor="data_nei">Data Naixement</Label>
          </FormGroup>

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

          <Button type="submit">Registrat</Button>
        </Form>
      </div>
    </div>
  );
}

export default Registrar;
