import { useEffect, useState } from "react";

function ApiGames() {
    // Guarda los datos que llegan desde la API
    const [users, setUsers] = useState([]);

    // Hace la petición a la API una sola vez cuando se carga el componente
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="card shadow">
            <div className="card-body">
                <h3>
                    <i className="bi bi-cloud-download me-2"></i>
                    Usuarios desde API
                </h3>
                <hr />

                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Ciudad</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ApiGames;
