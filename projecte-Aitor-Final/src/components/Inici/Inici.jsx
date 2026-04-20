import { Button } from "reactstrap";
import styles from "./Inici.module.css";
import { useNavigate } from "react-router-dom";

export default function Inici() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.badge}>
          <img src="./img/miniTitolIcon.svg" alt="" />
          <span>El teu garatge virtual</span>
        </div>
        <h1 className={styles.heroTitle}>Controla el teu vehicle.<br />Estalvia temps i diners.</h1>
        <p className={styles.heroSubtitle}>BoxSphere centralitza el manteniment, els gastos i el consum dels teus vehicles en una sola plataforma. Oblida't dels papers i les fulles de càlcul.</p>
        <div className={styles.buttonGroup}>
          <Button className={styles.btnPrimary} onClick={() => navigate("/registrat")}>Comença ara</Button>
          <Button className={styles.btnSecondary} onClick={() => navigate("/registrat")}>Saber més</Button>
        </div>
        <div className={styles.heroImageWrapper}>
          <img src="./img/dashboard.png" alt="" className={styles.heroImage} />
        </div>
        <div className={styles.trustBar}>
          <span>Confien en nosaltres:</span>
          <span className={styles.trustItem}><span className={styles.icon}>🚗</span> +500 vehicles</span>
          <span className={styles.trustItem}><span className={styles.icon}>👤</span> +200 usuaris</span>
          <span className={styles.trustItem}><span className={styles.icon}>⭐</span> 4.8/5 valoració</span>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <span className={styles.tag}>FUNCIONALITATS</span>
          <h2>Tot el que necessites per al teu vehicle</h2>
          <p>Gestiona el manteniment, els gastos i el consum en un sol lloc</p>
        </header>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}><img src="./img/icon1.svg" alt="" /></div>
            <h3>Garatge Virtual</h3>
            <p>Registra múltiples vehicles, controla les dades bàsiques, historial de manteniment i tots els detalls importants en un sol lloc.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}><img src="./img/icon2.svg" alt="" /></div>
            <h3>Manteniment i Gastos</h3>
            <p>Registra canvis d'oli, pneumàtics, revisions, ITV i qualsevol intervenció amb els seus costos i dates de forma organitzada.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}><img src="./img/icon3.svg" alt="" /></div>
            <h3>Control d'Eficiència</h3>
            <p>Introdueix les dades de repostatge (km i litres) per calcular automàticament el consum mitjà del teu vehicle i optimitzar costos.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <span className={styles.tag}>COM FUNCIONA</span>
          <h2>Tres passos per tenir-ho tot controlat</h2>
        </header>
        <div className={styles.grid3}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3>Registra't</h3>
            <p>Crea el teu compte gratuït i accedeix al teu garatge virtual en segons.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3>Afegeix vehicles</h3>
            <p>Afegeix els teus cotxes, motos o furgonetes amb totes les seves dades principals.</p>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3>Controla tot</h3>
            <p>Gestiona manteniment, gastos de combustible, compara vehicles i participa al rànquing.</p>
          </div>
        </div>
      </section>

      <section className={styles.splitSection}>
        <div className={styles.splitText}>
          <span className={styles.tag}>MÒDUL COMPARATIVA</span>
          <h2>Compara els teus vehicles i descobreix quin surt més car</h2>
          <p>Visualitza gràfics comparatius de consum, costos de manteniment i eficiència entre tots els vehicles del teu garatge. Pren decisions informades sobre quin vehicle val més la pena.</p>
        </div>
        <div className={styles.splitImage}>
          <img src="./img/comparativaVehicles.png" alt="" />
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <span className={styles.tag}>COMUNITAT</span>
          <h2>Rànquing i Fòrum per a entusiastes</h2>
          <p>Competeix per ser el vehicle més eficient i comparteix consells amb la comunitat</p>
        </header>
        <div className={styles.grid2}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}><img src="./img/trofeuRanking.svg" alt="" /></div>
            <h3>Rànquing Global</h3>
            <p>Mira quins vehicles són els més eficients de la plataforma. Competeix amb altres usuaris i fomenta la conducció sostenible.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}><img src="./img/forumComunitat.svg" alt="" /></div>
            <h3>Fòrum de la Comunitat</h3>
            <p>Comparteix experiències, demana consells sobre manteniment i descobreix trucs per estalviar en el dia a dia del teu vehicle.</p>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statBox}>
          <span className={styles.statNumberText}>500+</span>
          <span className={styles.statLabel}>Vehicles registrats</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumberText}>200+</span>
          <span className={styles.statLabel}>Usuaris actius</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumberText}>15k+</span>
          <span className={styles.statLabel}>Manteniments registrats</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumberText}>4.8</span>
          <span className={styles.statLabel}>Valoració mitjana</span>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>Preparat per controlar el teu vehicle?</h2>
        <p>Uneix-te a BoxSphere i comença a estalviar temps i diners avui mateix.</p>
        <Button className={styles.btnPrimary} onClick={() => navigate("/registrat")}>Crea el teu compte gratuït</Button>
      </section>
    </div>
  )
}