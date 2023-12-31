import { todoService } from "../services/todo.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveTodo, loadTodo } from '../store/actions/todo.actions.js'


const { useNavigate, useParams, Link } = ReactRouterDOM
const { useState, useEffect } = React


export function TodoEdit() {

    const navigate = useNavigate()
    const { todoId } = useParams()
    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())

    useEffect(() => {
        if (todoId) {
            loadTodo(todoId)
                .then(setTodoToEdit)
                .catch(err => console.log('err:', err))
        }
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setTodoToEdit(prevTodo => ({ ...prevTodo, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then((savedTodo) => {
                showSuccessMsg(`Todo updated successfully ${savedTodo._id}`)
                navigate('/todo')
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    const { txt, isDone } = todoToEdit

    return (
        <section className="todo-edit">
            <h1>{todoId ? 'Edit' : 'Add'} Todo</h1>
            <form onSubmit={onSaveTodo}>
                <label htmlFor="txt">Text</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="isDone">is done?</label>
                <input onChange={handleChange} checked={isDone} type="checkbox" name="isDone" id="isDone" />

                <button disabled={!txt}>Save</button>
            </form>
            <button><Link className="btn" to={'/todo'}>← Go back</Link></button>

        </section>
    )
}