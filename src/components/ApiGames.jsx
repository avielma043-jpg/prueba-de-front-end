import { useEffect, useState } from "react";

const usuariosFallback = [
    { id: 1001, name: "Ana Gómez", username: "ana", email: "ana@example.com", address: { city: "Bogotá" } },
    { id: 1002, name: "Luis Pérez", username: "luis", email: "luis@example.com", address: { city: "Medellín" } },
    { id: 1003, name: "Camila Ruiz", username: "camila", email: "camila@example.com", address: { city: "Cali" } },
];

function ApiGames() {
    const [users, setUsers] = useState(usuariosFallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar la API");
                }
                return response.json();
            })
            .then((data) => {
                if (isMounted) {
                    setUsers(Array.isArray(data) ? data : []);
                    setError("");
                }
            })
            .catch((error) => {
                console.log(error);
                if (isMounted) {
                    setUsers(usuariosFallback);
                    setError("No se pudo cargar la API, mostrando datos de respaldo.");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="card shadow">
            <div className="card-body">
                <h3>
                    <i className="bi bi-cloud-download me-2"></i>
                    Usuarios desde API
                </h3>
                <hr />

                {loading && <p className="text-muted">Cargando usuarios...</p>}
                {error && <div className="alert alert-warning py-2">{error}</div>}

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
                                    <td>{user.address?.city || "Sin ciudad"}</td>
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
