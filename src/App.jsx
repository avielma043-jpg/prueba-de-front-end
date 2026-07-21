import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import GameForm from "./components/GameForm";
import GameTable from "./components/GameTable";
import ApiGames from "./components/ApiGames";

// Datos base que se muestran al iniciar la app
const juegosIniciales = [
    { id: 1, nombre: "Space Engineer 1", genero: "Sandbox", plataforma: "PC", puntuacion: 8, anio: 2019 },
    { id: 2, nombre: "Deep Rock Galactic", genero: "Co-op", plataforma: "PC", puntuacion: 9, anio: 2020 },
    { id: 3, nombre: "ARK 1", genero: "Survival", plataforma: "PC", puntuacion: 8, anio: 2017 },
    { id: 4, nombre: "Satisfactory", genero: "Builder", plataforma: "PC", puntuacion: 9, anio: 2024 },
    { id: 5, nombre: "The Crew Motorfest", genero: "Carreras", plataforma: "PC", puntuacion: 8, anio: 2023 },
    { id: 6, nombre: "Valheim", genero: "Survival", plataforma: "PC", puntuacion: 9, anio: 2021 },
    { id: 7, nombre: "Lego Batman The Videogame", genero: "Acción", plataforma: "PC", puntuacion: 8, anio: 2008 },
    { id: 8, nombre: "Lego Batman 2", genero: "Acción", plataforma: "PC", puntuacion: 8, anio: 2012 },
    { id: 9, nombre: "Monster Hunter World", genero: "Aventura", plataforma: "PC", puntuacion: 9, anio: 2018 },
    { id: 10, nombre: "Thronefall", genero: "Estratégia", plataforma: "PC", puntuacion: 8, anio: 2024 },
    { id: 11, nombre: "Sea of Thieves", genero: "Aventura", plataforma: "PC", puntuacion: 8, anio: 2018 },
];
// esto hace que los juegos se guarden en el localStorage y se mantengan aunque se recargue la página
function App() {
    // Estado principal con todos los juegos
    const [juegos, setJuegos] = useState(() => {
        const juegosGuardados = localStorage.getItem("games");

        if (juegosGuardados) {
            try {
                const juegosParseados = JSON.parse(juegosGuardados);

                if (Array.isArray(juegosParseados) && juegosParseados.length > 0) {
                    return juegosParseados.map((juego) => ({
                        id: juego.id,
                        nombre: juego.nombre ?? juego.name,
                        genero: juego.genero ?? juego.genre,
                        plataforma: juego.plataforma ?? juego.platform,
                        puntuacion: juego.puntuacion ?? juego.score,
                        anio: juego.anio ?? juego.year,
                    }));
                }
            } catch (error) {
                console.error("No se pudieron cargar los juegos guardados.", error);
            }
        }

        return juegosIniciales;
    });
    // Guarda el juego que se está editando
    const [juegoEnEdicion, setJuegoEnEdicion] = useState(null);

    // Guarda los juegos en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("games", JSON.stringify(juegos));
    }, [juegos]);

    // Añade un juego nuevo o actualiza uno que se está editando
    function agregarJuego(juego) {
        if (juegoEnEdicion) {
            const juegosActualizados = juegos.map((j) => (j.id === juegoEnEdicion.id ? juego : j));
            setJuegos(juegosActualizados);
            setJuegoEnEdicion(null);
        } else {
            setJuegos((juegosAnteriores) => [...juegosAnteriores, juego]);
        }
    }

    // Elimina un juego tras confirmar
    function eliminarJuego(id) {
        if (window.confirm("¿Eliminar este videojuego?")) {
            setJuegos(juegos.filter((juego) => juego.id !== id));
        }
    }

    // Carga un juego en el formulario para editarlo
    function editarJuego(juego) {
        setJuegoEnEdicion(juego);
    }

    return (
        <>
            <Navbar />

            <div className="container mt-4">
                <div className="mb-4">
                    <h2 className="fw-bold">CRUD pero de videojuegos</h2>
                    <p className="text-muted mb-0">
                        Registra, edita y administra tus videojuegos favoritos
                    </p>
                </div>

                <GameForm agregarJuego={agregarJuego} juegoEnEdicion={juegoEnEdicion} />
                <GameTable juegos={juegos} eliminarJuego={eliminarJuego} editarJuego={editarJuego} />
                <ApiGames />
            </div>
        </>
    );
}

export default App;
