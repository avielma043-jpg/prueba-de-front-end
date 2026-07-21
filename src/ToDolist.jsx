import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const KEY = "todolist-todos";

function ToDoList() {
    const [todos, setTodos] = useState(() => {
        try {
            const storedTodos = localStorage.getItem(KEY);
            return storedTodos ? JSON.parse(storedTodos) : [];
        } catch (error) {
            console.error("No se pudieron cargar las tareas:", error);
            return [];
        }
    });
    const [task, setTask] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const agregarTarea = (event) => {
        event.preventDefault();
        const taskText = task.trim();

        if (!taskText) return;

        setTodos((prevTodos) => [
            ...prevTodos,
            {
                id: uuid(),
                task: taskText,
                complete: false,
            },
        ]);
        setTask("");
        inputRef.current?.focus();
    };

    const toggleTarea = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, complete: !todo.complete } : todo
            )
        );
    };

    const eliminarTarea = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const eliminarTareasCompletadas = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.complete));
    };

    const hayTareasCompletadas = todos.some((todo) => todo.complete);

    return (
        <section className="todo-app">
            <h1>Listado de Tareas</h1>
            <p className="subtitle">Agrega, marca y elimina tareas fácilmente.</p>

            <form className="todo-form" onSubmit={agregarTarea}>
                <input
                    ref={inputRef}
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    placeholder="Ingrese una tarea"
                    type="text"
                />
                <button type="submit" className="primary">
                    Agregar
                </button>
                <button
                    type="button"
                    className="secondary"
                    onClick={eliminarTareasCompletadas}
                    disabled={!hayTareasCompletadas}
                >
                    Eliminar completadas
                </button>
            </form>

            <ul className="todo-list">
                {todos.length === 0 ? (
                    <li className="empty-state">No hay tareas aún. ¡Agrega la primera!</li>
                ) : (
                    todos.map((todo) => (
                        <li key={todo.id} className={`todo-item ${todo.complete ? "completed" : ""}`}>
                            <label className="todo-text">
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={todo.complete}
                                    onChange={() => toggleTarea(todo.id)}
                                />
                                <span>{todo.task}</span>
                            </label>
                            <div className="todo-actions">
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() => eliminarTarea(todo.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}

export default ToDoList;