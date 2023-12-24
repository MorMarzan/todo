const { useState, useEffect, Fragment } = React
const { useSelector } = ReactRedux
const { Link } = ReactRouterDOM

import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'

import { loadTodos, removeTodo } from '../store/actions/todo.actions.js'

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())


    useEffect(() => {
        loadTodos(filterBy)
            .catch(() => {showErrorMsg('Cannot show todos')})
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
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