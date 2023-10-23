import React from "react";
import { useState, useEffect } from "react";

function Tiktak() {
  const [contador, setcontador] = useState(0);
  const [cubos, setcubos] = useState(["", "", "", "", "", "", "", "", ""]);
  const [ganador, setganador] = useState("");

  const aumentarJuagda = () => {
    setcontador((contador) => contador + 1);
  };

  const jugar = (index) => {
    let nuevosCubos = [...cubos];
    setcubos(nuevosCubos);
    return contador % 2 === 0
      ? (nuevosCubos[index] = "X")
      : (nuevosCubos[index] = "0");
  };

  const restart = () => {
    setcubos(["", "", "", "", "", "", "", "", ""]);
    setcontador(0);
  };

  useEffect(() => {
    const lineasGanadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (var lineas of lineasGanadoras) {
      const [a, b, c] = lineas;
      if (cubos[a] === "X" && cubos[b] === "X" && cubos[c] === "X") {
        setganador("Gana el Jugador 1!");
      } else if (cubos[a] === "0" && cubos[b] === "0" && cubos[c] === "0") {
        setganador("Gana el Jugador 2!");
      }
    }
  }, [cubos]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        paddingTop: "20px",
        textAlign: "center",
        paddingBottom: "20px",
      }}
    >
      <h2 style={{ margin: "0", color: "blue" }}>Ta-te-ti</h2>
      <h4 style={{ margin: "0" }}>
        Es el turno del jugador {contador % 2 === 0 ? "N° 1" : "N° 2"}
      </h4>
      <h4
        style={{
          height: "30px",
          margin: "0",
          color: ganador === "Gana el Jugador 1!" ? "red" : "yellow",
        }}
      >
        {ganador}
      </h4>
      <button
        onClick={() => {
          restart(), setganador("");
        }}
      >
        {" "}
        Restart
      </button>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {cubos.map((cubo, index) => (
          <button
            disabled={contador === 9 || ganador !== "" || cubos[index] !== ""}
            onClick={() => {
              jugar(index), aumentarJuagda();
            }}
            key={index}
            style={{
              width: "80px",
              height: "80px",
              fontWeight: "bold",
              fontSize: "22px",
              color: cubos[index] === "X" ? "red" : "yellow",
            }}
          >
            {cubo}
          </button>
        ))}
      </section>
    </div>
  );
}

export default Tiktak;
