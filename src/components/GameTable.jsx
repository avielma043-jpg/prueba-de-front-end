import GameRow from "./GameRow";

function GameTable({ juegos, eliminarJuego, editarJuego }) {
    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <h3>
                    <i className="bi bi-controller me-2"></i>
                    Mi catálogo
                </h3>
                <hr />

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Género</th>
                                <th>Plataforma</th>
                                <th>Nota</th>
                                <th>Año</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {juegos.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center text-muted py-4">
                                        No hay videojuegos agregados todavía.
                                    </td>
                                </tr>
                            ) : (
                                juegos.map((juego) => (
                                    <GameRow key={juego.id} game={juego} deleteGame={eliminarJuego} editGame={editarJuego} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GameTable;
