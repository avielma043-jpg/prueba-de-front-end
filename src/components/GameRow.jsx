function GameRow({ game, deleteGame, editGame }) {
    return (
        <tr>
            <td>{game.nombre}</td>
            <td>{game.genero}</td>
            <td>{game.plataforma}</td>
            <td>{game.puntuacion}</td>
            <td>{game.anio}</td>
            <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editGame(game)}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteGame(game.id)}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </td>
        </tr>
    );
}

export default GameRow;
