import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo }) {

    const ulProps = {
        className: "todo-list",
        title:'todo'
    }

    return (
        <ul {...ulProps} >
            {todos.map(todo =>
                <li key={todo._id}>
                    <TodoPreview todo={todo} />
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>X</button>
                        {/* <button><Link to={`/todo/${todo._id}`}>Details</Link></button> */}
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}