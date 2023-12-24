const { useEffect, useRef, Fragment } = React
const { useSelector } = ReactRedux
const { Link } = ReactRouterDOM

import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo, setFilterBy } from '../store/actions/todo.actions.js'
import { utilService } from '../services/util.service.js'
import { Loader } from '../cmps/Loader.jsx'

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const debounceOnSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    useEffect(() => {
        loadTodos()
            .catch(() => { showErrorMsg('Cannot show todos') })
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
        setFilterBy(filterBy)
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
    console.log('isLoading', isLoading)

    return (
        <main>
            <section className="todo-index">

                {user && 
                // !isLoading &&
                    <Fragment>
                        <button className='edit btn'><Link to={`/todo/edit/`}>Add todo</Link></button>
                        <TodoFilter filterBy={{ txt, isDone }} onSetFilter={debounceOnSetFilter.current} />
                        <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
                    </Fragment>
                }

                {/* {user && isLoading && <Loader />} */}

                {!user &&
                    <Fragment>
                        <button onClick={promptSignup}>Add todo</button>
                        <h1>Start creating you're todos now!</h1>
                    </Fragment>
                }

            </section>
        </main>
    )

}