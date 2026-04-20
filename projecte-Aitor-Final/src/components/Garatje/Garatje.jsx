import { useEffect, useState } from "react";
import styles from "./Garatge.module.css";
import AfegirVehicle from "./AfegirVehicle";

export default function Garatge() {
  const [cotxes, setCotxes] = useState([]);
  const [manteniments, setManteniments] = useState([]);
  const [reparacions, setReparacions] = useState([]);
  const [itvs, setItvs] = useState([]);
  const [controls, setControls] = useState();


  const [showAfegirVehicle, setShowAfegirVehicle] = useState(false);
  const [showRepostar, setShowRepostar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const cargarCoches = () => {
    fetch("http://localhost/Projecte_Backend/garatge/mostrarCoches.php", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setCotxes(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarCoches();
  }, []);


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
          <button className={styles.botonPrincipal} onClick={() => setShowAfegirVehicle(true)}>+ Afegir vehicle</button>
        </div>
      </section>

      <section className={styles.cuadriculaCoches}>
        {cotxes.map(cotxe => (
          <div key={cotxe.id_vehicle} className={styles.tarjetaCoche}>
            <div className={styles.contenedorImagen}>
              <img
                src={cotxe.imatge}
                alt={`${cotxe.marca} ${cotxe.model}`}
                className={styles.imagenCoche}
                crossOrigin="anonymous"
                onError={(e) => {
                  console.log("Error cargando imagen autenticada");
                  e.target.src = "https://via.placeholder.com/400x250?text=Error+Autenticacion";
                }}
              />
            </div>
            <div className={styles.infoCoche}>
              <h3 className={styles.tituloCoche}>{cotxe.marca} {cotxe.model}</h3>
              <p className={styles.especificacionesCoche}>
                {cotxe.any_fabricacio} · {cotxe.tipus_combustible} · {cotxe.quilometres_actuals ? cotxe.quilometres_actuals.toLocaleString('es-ES') : '0'} km
              </p>
              <div className={styles.contenedorEtiquetas}>
                <span className={styles.etiquetaInfo}>
                  {cotxe.tipus_combustible == "Elèctric" ? (
                    <>
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="25px" height="25px" viewBox="0 0 612.000000 612.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,612.000000) scale(0.100000,-0.100000)"
                          fill="#037ffe" stroke="none">
                          <path d="M1558 4724 c-42 -22 -48 -43 -48 -158 l0 -106 -323 0 c-369 0 -374
-1 -415 -81 l-22 -44 2 -1425 3 -1425 24 -34 c13 -18 42 -42 65 -52 40 -18
117 -19 2216 -19 l2176 0 44 23 c24 12 53 35 64 50 21 28 21 33 24 1455 l2
1427 -22 44 c-41 80 -46 81 -410 81 l-318 0 0 111 c0 109 0 111 -30 140 l-29
30 -350 -3 -351 -3 -25 -26 c-25 -24 -26 -32 -28 -135 l-2 -109 -739 0 -739 0
2 82 c3 107 -11 158 -49 178 -43 22 -681 22 -722 -1z m3499 -1801 l3 -1223
-1995 0 -1995 0 -2 1221 c-2 671 -1 1223 1 1225 2 2 900 3 1995 2 l1991 -3 2
-1222z"/>
                          <path d="M4142 3970 c-52 -32 -62 -69 -62 -235 l0 -145 -152 0 c-132 0 -157
-3 -184 -19 -61 -37 -79 -126 -39 -188 29 -43 71 -53 230 -53 l145 0 0 -148
c0 -124 3 -153 18 -182 40 -76 145 -91 206 -31 l31 31 5 163 5 162 163 5 164
5 34 37 c28 32 34 45 34 84 0 50 -20 92 -54 115 -15 10 -67 15 -181 19 l-160
5 -5 162 -5 163 -32 31 c-41 42 -112 50 -161 19z"/>
                          <path d="M1464 3580 c-11 -4 -33 -22 -47 -40 -35 -41 -38 -114 -6 -154 44 -56
41 -56 511 -56 406 0 435 1 464 19 32 20 64 74 64 110 0 40 -28 90 -62 111
-32 19 -49 20 -468 19 -239 0 -444 -4 -456 -9z"/>
                        </g>
                      </svg>

                      {cotxe.consum_mitja_obc} kWh
                    </>
                  ) : (
                    <>
                      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="20px" height="20px" viewBox="0 0 50.000000 50.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                          fill="#037ffe" stroke="none">
                          <path d="M57 482 c-15 -16 -17 -47 -17 -220 0 -128 -4 -202 -10 -202 -5 0 -10
-13 -10 -30 l0 -30 175 0 175 0 0 30 c0 17 -4 30 -10 30 -6 0 -10 35 -10 86 0
76 2 85 15 74 9 -8 15 -30 15 -56 0 -73 56 -108 100 -64 17 17 20 33 20 123
l0 103 -60 59 c-33 32 -63 56 -67 52 -3 -4 6 -20 20 -35 22 -23 27 -37 27 -78
0 -43 4 -55 30 -79 27 -26 31 -35 28 -79 -2 -33 -9 -52 -21 -60 -30 -19 -51 5
-57 64 -5 40 -11 57 -28 68 -20 13 -22 22 -22 122 0 142 2 140 -157 140 -103
0 -122 -3 -136 -18z m261 -14 c9 -9 12 -69 12 -210 l0 -198 -135 0 -135 0 0
198 c0 141 3 201 12 210 17 17 229 17 246 0z m162 -186 c0 -34 0 -35 -20 -17
-13 12 -20 31 -20 53 0 34 0 35 20 17 13 -12 20 -31 20 -53z m-130 -252 c0 -6
-58 -10 -155 -10 -97 0 -155 4 -155 10 0 6 58 10 155 10 97 0 155 -4 155 -10z"/>
                          <path d="M84 447 c-3 -8 -4 -43 -2 -78 l3 -64 110 0 110 0 0 75 0 75 -108 3
c-84 2 -109 0 -113 -11z m206 -67 l0 -60 -95 0 -95 0 0 60 0 60 95 0 95 0 0
-60z"/>
                        </g>
                      </svg>
                      {cotxe.consum_mitja_obc} L/100km
                    </>
                  )}
                </span>
                <div className={styles.contenedorBotones}>
                  <button className={styles.botonRepostar} onClick={() => setShowRepostar(true)}>Repostar</button>
                  <button className={styles.botonEliminar} onClick={() => setShowEliminar(true)}>Eliminar vehicle</button>
                </div>
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


      {showAfegirVehicle && (
        <div className={styles.overlayModal} onClick={() => setShowAfegirVehicle(false)}>
          <div className={styles.contenidoModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.botonCerrar}
              onClick={() => setShowAfegirVehicle(false)}
            >
              ✖
            </button>
            <AfegirVehicle
              alTerminar={() => {
                setShowAfegirVehicle(false);
                cargarCoches();
              }}
            />

          </div>
        </div>
      )}

      {showRepostar && (
        <div className={styles.overlayModal} onClick={() => setShowRepostar(false)}>
          <div className={styles.contenidoModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.botonCerrar}
              onClick={() => setShowRepostar(false)}
            >
              ✖
            </button>
            <Repostar
              alTerminar={() => {
                setShowRepostar(false);
                cargarCoches();
              }}
            />

          </div>
        </div>
      )}
      {showEliminar && (
        <div className={styles.overlayModal} onClick={() => setShowEliminar(false)}>
          <div className={styles.contenidoModal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.botonCerrar}
              onClick={() => setShowEliminar(false)}
            >
              ✖
            </button>
            <EliminarVehicle
              alTerminar={() => {
                setShowEliminar(false);
                cargarCoches();
              }}
            />

          </div>
        </div>
      )}
    </main>
  );
}