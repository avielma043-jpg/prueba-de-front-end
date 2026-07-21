import { useState, useEffect } from "react";

function GameForm({ agregarJuego, juegoEnEdicion }) {
    // Estados del formulario para cada campo
    const [nombre, setNombre] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [puntuacion, setPuntuacion] = useState("");
    const [anio, setAnio] = useState("");

    // Si se está editando, llena los campos con los datos del juego
    useEffect(() => {
        if (juegoEnEdicion) {
            setNombre(juegoEnEdicion.nombre);
            setGenero(juegoEnEdicion.genero);
            setPlataforma(juegoEnEdicion.plataforma);
            setPuntuacion(juegoEnEdicion.puntuacion);
            setAnio(juegoEnEdicion.anio);
        }
    }, [juegoEnEdicion]);

    // Se ejecuta al enviar el formulario
    function handleSubmit(e) {
        e.preventDefault();

        if (nombre === "" || genero === "" || plataforma === "" || puntuacion === "" || anio === "") {
            alert("Complete todos los campos.");
            return;
        }

        // Crea un objeto con los datos del nuevo juego
        const nuevoJuego = {
            id: juegoEnEdicion ? juegoEnEdicion.id : Date.now(),
            nombre,
            genero,
            plataforma,
            puntuacion: Number(puntuacion),
            anio: Number(anio),
        };

        agregarJuego(nuevoJuego);

        setNombre("");
        setGenero("");
        setPlataforma("");
        setPuntuacion("");
        setAnio("");
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <h3>
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Agregar videojuego
                </h3>
                <hr />

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Género</label>
                            <input
                                className="form-control"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Plataforma</label>
                            <input
                                className="form-control"
                                value={plataforma}
                                onChange={(e) => setPlataforma(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Puntuación</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                className="form-control"
                                value={puntuacion}
                                onChange={(e) => setPuntuacion(e.target.value)}
                            />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Año</label>
                            <input
                                type="number"
                                className="form-control"
                                value={anio}
                                onChange={(e) => setAnio(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="btn btn-success">
                        <i className="bi bi-plus-lg me-2"></i>
                        {juegoEnEdicion ? "Actualizar videojuego" : "Agregar videojuego"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GameForm;
