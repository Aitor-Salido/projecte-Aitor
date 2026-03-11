import { useEffect, useState } from "react";
import styles from "./Garatge.module.css";

export default function Garatge() {
  const [cotxes, setCotxes] = useState([]);
  const [manteniments, setManteniments] = useState([]);
  const [reparacions, setReparacions] = useState([]);
  const [itvs, setItvs] = useState([]);
  const [controls, setControls] = useState();

  useEffect(() => {
    fetch("http://localhost/Projecte_Backend/garatge/mostrarCoches.php", { method: "GET", credentials: "include" })
      .then(res => res.json()).then(data => setCotxes(data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost/Projecte_Backend/garatge/manteniments.php", { method: "GET", credentials: "include" })
      .then(res => res.json()).then(data => setManteniments(data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost/Projecte_Backend/garatge/reparacions.php", { method: "GET", credentials: "include" })
      .then(res => res.json()).then(data => setReparacions(data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost/Projecte_Backend/garatge/itvs.php", { method: "GET", credentials: "include" })
      .then(res => res.json()).then(data => setItvs(data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost/Projecte_Backend/garatge/controls.php", { method: "GET", credentials: "include" })
      .then(res => res.json()).then(data => setControls(data)).catch(err => console.error(err));
  }, []);

  return (
    <main className={styles.contenedorPrincipal}>

      <section className={styles.cabecera}>
        <div>
          <h1 className={styles.tituloPagina}>El meu Garatge</h1>
          <p className={styles.subtituloPagina}>Gestiona els teus vehicles i el seu manteniment</p>
        </div>
        <div>
          <button className={styles.botonPrincipal}>+ Afegir vehicle</button>
        </div>
      </section>

      <section className={styles.cuadriculaCoches}>
        {cotxes.map(cotxe => (
          <div key={cotxe.id_vehicle} className={styles.tarjetaCoche}>
            <div className={styles.contenedorImagen}>
              <img src={cotxe.imatge} alt={cotxe.marca + " " + cotxe.model} className={styles.imagenCoche} />
            </div>
            <div className={styles.infoCoche}>
              <h3 className={styles.tituloCoche}>{cotxe.marca} {cotxe.model}</h3>
              <p className={styles.especificacionesCoche}>
                {cotxe.any_fabricacio} · {cotxe.tipus_combustible} · {cotxe.quilometres_actuals} km
              </p>
              <div className={styles.contenedorEtiquetas}>
                <span className={styles.etiquetaInfo}>
                  {cotxe.litres == null ? `${cotxe.consum_mitja_obc} kWh` : `${cotxe.consum_mitja_obc} L/100km`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.seccion}>
        <div className={styles.cabeceraSeccion}>
          <h2 className={styles.tituloSeccion}>Historial de Manteniment</h2>
          <button className={styles.botonSecundario}>+ Nou registre</button>
        </div>
        <div className={styles.contenedorTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Tipus</th>
                <th>Vehicle</th>
                <th>Descripció</th>
                <th>Data</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {manteniments.map(manteniment => (
                <tr key={manteniment.id_manteniment}>
                  <td>{manteniment.tipus_manteniment}</td>
                  <td>{manteniment.marca} {manteniment.model}</td>
                  <td>{manteniment.descripcio_manteniment}</td>
                  <td>{manteniment.data_manteniment}</td>
                  <td className={styles.textoAzul}>{manteniment.cost}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.seccion}>
        <div className={styles.cabeceraSeccion}>
          <h2 className={styles.tituloSeccion}>Historial de Reparacions</h2>
          <button className={styles.botonSecundario}>+ Nova Reparació</button>
        </div>
        <div className={styles.contenedorTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Descripció</th>
                <th>Taller</th>
                <th>Quilometres</th>
                <th>Data</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {reparacions.map(reparacio => (
                <tr key={reparacio.id_reparacio}>
                  <td>{reparacio.marca} {reparacio.model}</td>
                  <td>{reparacio.descripcio}</td>
                  <td>{reparacio.taller}</td>
                  <td>{reparacio.quilometres} km</td>
                  <td>{reparacio.data_reparacio}</td>
                  <td className={styles.textoAzul}>{reparacio.cost}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.seccion}>
        <div className={styles.cabeceraSeccion}>
          <h2 className={styles.tituloSeccion}>Historial ITVs</h2>
          <button className={styles.botonSecundario}>+ Nou ITV</button>
        </div>
        <div className={styles.contenedorTabla}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Data Visita</th>
                <th>Resultat</th>
                <th>Observacions</th>
                <th>Quilometres</th>
                <th>Propera ITV</th>
              </tr>
            </thead>
            <tbody>
              {itvs.map(itv => (
                <tr key={itv.id_itv}>
                  <td>{itv.marca} {itv.model}</td>
                  <td>{itv.data_visita}</td>
                  <td>
                    <span className={
                      itv.resultat === 'Favorable' ?
                        styles.estadoExito
                        : itv.resultat === 'Desfavorable' ?
                          styles.estadoDesfavorable
                          : styles.estadoPendiente}>
                      {itv.resultat}
                    </span>
                  </td>
                  <td>{itv.observacions}</td>
                  <td>{itv.quilometres}</td>
                  <td>{itv.data_propera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.seccion}>
        <h2 className={styles.tituloSeccion}>Control de Repostatge i Consum</h2>
        <div className={styles.cuadriculaEstadisticas}>

          <div className={styles.tarjetaEstadistica}>
            <p className={styles.etiquetaEstadistica}>Consum mitjà</p>
            <h1 className={styles.valorAzul}>
              {(Number(controls?.consum_mes) || 0).toFixed(2)} L/100km
            </h1>
            <p
              className={
                Number(controls?.consum_mes) > Number(controls?.consum_mes_passat)
                  ? styles.tendenciaNegativa
                  : Number(controls?.consum_mes) < Number(controls?.consum_mes_passat)
                    ? styles.tendenciaPositiva
                    : styles.tendenciaIgual
              }
            >
              {controls
                ? Number(controls.consum_mes) > Number(controls.consum_mes_passat)
                  ? `↑ ${(Number(controls.consum_mes) - Number(controls.consum_mes_passat)).toFixed(2)} respecte al mes passat`
                  : Number(controls.consum_mes) < Number(controls.consum_mes_passat)
                    ? `↓ ${(Number(controls.consum_mes_passat) - Number(controls.consum_mes)).toFixed(2)} respecte al mes passat`
                    : `→ 0.00 respecte al mes passat`
                : "N/A"}
            </p>
          </div>

          <div className={styles.tarjetaEstadistica}>
            <p className={styles.etiquetaEstadistica}>Total gastat (combustible)</p>
            <h1 className={styles.valorMorado}>
              {(Number(controls?.gasto_mes) || 0).toFixed(2)}€
            </h1>
            <p
              className={
                Number(controls?.gasto_mes) > Number(controls?.gasto_mes_passat)
                  ? styles.tendenciaNegativa
                  : Number(controls?.gasto_mes) < Number(controls?.gasto_mes_passat)
                    ? styles.tendenciaPositiva
                    : styles.tendenciaIgual
              }
            >
              {controls?.gasto_mes != null && controls?.gasto_mes_passat != null
                ? Number(controls.gasto_mes) > Number(controls.gasto_mes_passat)
                  ? `↑ ${(Number(controls.gasto_mes) - Number(controls.gasto_mes_passat)).toFixed(2)}€ respecte al mes passat`
                  : Number(controls.gasto_mes) < Number(controls.gasto_mes_passat)
                    ? `↓ ${(Number(controls.gasto_mes_passat) - Number(controls.gasto_mes)).toFixed(2)}€ respecte al mes passat`
                    : `→ 0.00€ respecte al mes passat`
                : "N/A"}
            </p>
            <p className={styles.detalleEstadistica}>
              Últim repostatge: {controls?.ultim_repostatge || "N/A"}
            </p>
          </div>

          <div className={styles.tarjetaEstadistica}>
            <p className={styles.etiquetaEstadistica}>Km totals recorreguts</p>
            <h1 className={styles.valorCian}>{controls?.km_mes || "0"} km</h1>
            <p
              className={
                Number(controls?.km_mes) > Number(controls?.km_mes_passat)
                  ? styles.tendenciaNegativa
                  : Number(controls?.km_mes) < Number(controls?.km_mes_passat)
                    ? styles.tendenciaPositiva
                    : styles.tendenciaIgual
              }
            >
              {controls?.km_mes != null && controls?.km_mes_passat != null
                ? Number(controls.km_mes) > Number(controls.km_mes_passat)
                  ? `↑ ${Number(controls.km_mes) - Number(controls.km_mes_passat)} km respecte al mes passat`
                  : Number(controls.km_mes) < Number(controls.km_mes_passat)
                    ? `↓ ${Number(controls.km_mes_passat) - Number(controls.km_mes)} km respecte al mes passat`
                    : `→ 0 km respecte al mes passat`
                : "N/A"}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}