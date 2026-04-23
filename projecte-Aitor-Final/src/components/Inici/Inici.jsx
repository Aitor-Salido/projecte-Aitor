import { Button } from "reactstrap";
import styles from "./Inici.module.css";
import { useNavigate } from "react-router-dom";

export default function Inici() {
  const navigate = useNavigate();
  return (
    <div className={styles.contenedorPrincipal}>
      <section className={styles.seccionHero}>
        <div className={styles.etiquetaMiniTitulo}>
          <img src="./img/miniTitolIcon.svg" alt="" />
          <span>El teu garatge virtual</span>
        </div>
        <h1 className={styles.tituloPrincipal}>Controla el teu vehicle.<br />Estalvia temps i diners.</h1>
        <p className={styles.textoSecundario}>BoxSphere centralitza el manteniment, els despeses i el consum dels teus vehicles en una sola plataforma. Oblida't dels papers i les fulles de càlcul.</p>
        <div className={styles.grupoBotones}>
          <Button className={styles.botonPrincipal} onClick={() => navigate("/registrat")}>Comença ara</Button>
          <Button className={styles.botonSecundario} onClick={() => navigate("/registrat")}>Saber més</Button>
        </div>
        <div className={styles.contenedorImagenHero}>
          <img src="./img/dashboard.png" alt="" className={styles.imagenHero} />
        </div>
        <div className={styles.barraConfianza}>
          <span>Confien en nosaltres:</span>
          <span className={styles.elementoConfianza}><span className={styles.icono}>🚗</span> +500 vehicles</span>
          <span className={styles.elementoConfianza}><span className={styles.icono}>👤</span> +200 usuaris</span>
          <span className={styles.elementoConfianza}><span className={styles.icono}>⭐</span> 4.8/5 valoració</span>
        </div>
      </section>

      <section className={styles.seccionNormal}>
        <header className={styles.cabeceraSeccion}>
          <span className={styles.etiquetaSeccion}>FUNCIONALITATS</span>
          <h2>Tot el que necessites per al teu vehicle</h2>
          <p>Gestiona el manteniment, les despeses i el consum en un sol lloc</p>
        </header>
        <div className={styles.cuadriculaTresColumnas}>
          <div className={styles.tarjetaInformacion}>
            <div className={styles.contenedorIcono}><img src="./img/icon1.svg" alt="" /></div>
            <h3>Garatge Virtual</h3>
            <p>Registra múltiples vehicles, controla les dades bàsiques, historial de manteniment i tots els detalls importants en un sol lloc.</p>
          </div>
          <div className={styles.tarjetaInformacion}>
            <div className={styles.contenedorIcono}><img src="./img/icon2.svg" alt="" /></div>
            <h3>Manteniment i Despeses</h3>
            <p>Registra canvis d'oli, pneumàtics, revisions, ITV i qualsevol intervenció amb els seus costos i dates de forma organitzada.</p>
          </div>
          <div className={styles.tarjetaInformacion}>
            <div className={styles.contenedorIcono}><img src="./img/icon3.svg" alt="" /></div>
            <h3>Control d'Eficiència</h3>
            <p>Introdueix les dades de repostatge (km i litres) per calcular automàticament el consum mitjà del teu vehicle i optimitzar costos.</p>
          </div>
        </div>
      </section>

      <section className={styles.seccionNormal}>
        <header className={styles.cabeceraSeccion}>
          <span className={styles.etiquetaSeccion}>COM FUNCIONA</span>
          <h2>Tres passos per tenir-ho tot controlat</h2>
        </header>
        <div className={styles.cuadriculaTresColumnas}>
          <div className={styles.tarjetaPaso}>
            <div className={styles.numeroPaso}>1</div>
            <h3>Registra't</h3>
            <p>Crea el teu compte gratuït i accedeix al teu garatge virtual en segons.</p>
          </div>
          <div className={styles.tarjetaPaso}>
            <div className={styles.numeroPaso}>2</div>
            <h3>Afegeix vehicles</h3>
            <p>Afegeix els teus cotxes, motos o furgonetes amb totes les seves dades principals.</p>
          </div>
          <div className={styles.tarjetaPaso}>
            <div className={styles.numeroPaso}>3</div>
            <h3>Controla tot</h3>
            <p>Gestiona manteniment, despeses de combustible, compara vehicles i participa al rànquing.</p>
          </div>
        </div>
      </section>

      <section className={styles.seccionDividida}>
        <div className={styles.textoDividido}>
          <span className={styles.etiquetaSeccion}>MÒDUL COMPARATIVA</span>
          <h2>Compara els teus vehicles i descobreix quin surt més car</h2>
          <p>Visualitza gràfics comparatius de consum, costos de manteniment i eficiència entre tots els vehicles del teu garatge. Pren decisions informades sobre quin vehicle val més la pena.</p>
        </div>
        <div className={styles.imagenDividida}>
          <img src="./img/comparativaVehicles.png" alt="" />
        </div>
      </section>

      <section className={styles.seccionNormal}>
        <header className={styles.cabeceraSeccion}>
          <span className={styles.etiquetaSeccion}>COMUNITAT</span>
          <h2>Rànquing i Fòrum per a entusiastes</h2>
          <p>Competeix per ser el vehicle més eficient i comparteix consells amb la comunitat</p>
        </header>
        <div className={styles.cuadriculaDosColumnas}>
          <div className={styles.tarjetaInformacion}>
            <div className={styles.contenedorIcono}><img src="./img/trofeuRanking.svg" alt="" /></div>
            <h3>Rànquing Global</h3>
            <p>Mira quins vehicles són els més eficients de la plataforma. Competeix amb altres usuaris i fomenta la conducció sostenible.</p>
          </div>
          <div className={styles.tarjetaInformacion}>
            <div className={styles.contenedorIcono}><img src="./img/forumComunitat.svg" alt="" /></div>
            <h3>Fòrum de la Comunitat</h3>
            <p>Comparteix experiències, demana consells sobre manteniment i descobreix trucs per estalviar en el dia a dia del teu vehicle.</p>
          </div>
        </div>
      </section>

      <section className={styles.seccionEstadisticas}>
        <div className={styles.cajaEstadistica}>
          <span className={styles.textoNumeroEstadistica}>500+</span>
          <span className={styles.etiquetaEstadistica}>Vehicles registrats</span>
        </div>
        <div className={styles.cajaEstadistica}>
          <span className={styles.textoNumeroEstadistica}>200+</span>
          <span className={styles.etiquetaEstadistica}>Usuaris actius</span>
        </div>
        <div className={styles.cajaEstadistica}>
          <span className={styles.textoNumeroEstadistica}>15k+</span>
          <span className={styles.etiquetaEstadistica}>Manteniments registrats</span>
        </div>
        <div className={styles.cajaEstadistica}>
          <span className={styles.textoNumeroEstadistica}>4.8</span>
          <span className={styles.etiquetaEstadistica}>Valoració mitjana</span>
        </div>
      </section>

      <section className={styles.seccionLlamadaAccion}>
        <h2>Preparat per controlar el teu vehicle?</h2>
        <p>Uneix-te a BoxSphere i comença a estalviar temps i diners avui mateix.</p>
        <Button className={styles.botonPrincipal} onClick={() => navigate("/registrat")}>Crea el teu compte gratuït</Button>
      </section>
    </div>
  )
}