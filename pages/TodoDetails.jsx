import { loadTodo } from '../store/actions/todo.actions.js'

const { useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()

    useEffect(() => {
        loadTodo(todoId)
            .then(setTodo)
            .catch(err => console.log('err:', err))
    }, [todoId])

    if (!todo) return <div>Loading...</div>
    return (
        <section className="todo-details">
            <h2>Todo Details</h2>
            <h3>Task: {todo.txt}</h3>
            <h3>Todo done? {todo.isDone ? 'yes' : 'no'}</h3>
            <button><Link className="btn" to={'/todo'}>← Go back</Link></button>
        </section>
    )
}