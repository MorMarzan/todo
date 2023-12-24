import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo }) {

    const ulProps = {
        className: "todo-list",
        title:'todo'
    }

    
    if (!todos) return <div>Loading...</div>
    if (!todos.length) return <h1>Start creating you're todos now!</h1>

    return (
        <ul {...ulProps} >
            {todos.map(todo =>
                <li key={todo._id}>
                    <TodoPreview todo={todo} />
                    <section className="tools">
                        <button onClick={() => onRemoveTodo(todo._id)}>X</button>
                        <Link className="btn" to={`/todo/${todo._id}`}>Details</Link>
                        <Link className="btn" to={`/todo/edit/${todo._id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )
}