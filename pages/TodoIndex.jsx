const { useState, useEffect, Fragment } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'

export function TodoIndex() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todos)
    const user = useSelector(storeState => storeState.loggedinUser)
    const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())


    useEffect(() => {
        loadTodos()
    }, [filterBy])

    function loadTodos() {
        todoService.query(filterBy)
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
            .catch(err => console.log('err:', err))
    }

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
                dispatch({ type: REMOVE_TODO, todoId })
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({
            ...prevFilter,
            ...filterBy,
            // pageIdx: isUndefined(prevFilter.pageIdx) ? undefined : 0
        }))
    }

    function promptSignup() {
        showErrorMsg('Signup to enjoy our todos app')
    }

    // function onToggleIsDone(todoId) {
    //     todoService.getById(todoId)
    //         .then(todo => {
    //             todo.isDone = !todo.isDone
    //         })

    //     todoService.save(todoToSave)
    //         .then((savedTodo) => {
    //             dispatch({ type: UPDATE_TODO, todo: savedTodo })
    //             showSuccessMsg(`Todo updated to price: $${savedTodo.price}`)
    //         })
    //         .catch(err => {
    //             console.log('Cannot update todo', err)
    //             showErrorMsg('Cannot update todo')
    //         })

    // }

    const { txt, isDone } = filterBy

    return (
        <main>
            {user ?
                <section className="todo-index">
                    <button className='edit btn'><Link to={`/todo/edit/`}>Add todo</Link></button>
                    <TodoFilter filterBy={{ txt, isDone }} onSetFilter={onSetFilter} />
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
                </section>
                :
                <Fragment>
                    <button onClick={promptSignup}>Add todo</button>
                    <h1>Start creating you're todos now!</h1>
                </Fragment>
            }
        </main>
    )

}