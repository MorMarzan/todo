const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link } = ReactRouterDOM

import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_TODO, ADD_TODO_TO_CART, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'

export function TodoIndex() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todos)
    // const cart = useSelector(storeState => storeState.shoppingCart)


    useEffect(() => {
        todoService.query()
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
    }, [])

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

    function onAddTodo() {
        const txt = prompt("Todo text:")
        const todoToSave = todoService.getEmptyTodo(txt)

        todoService.save(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
                dispatch({ type: ADD_TODO, todo: savedTodo })
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
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

    // function onEditTodo(todo) {
    //     const price = +prompt('New price?')
    //     const todoToSave = { ...todo, price }

    //     todoService.save(todoToSave)
    //         .then((savedTodo) => {
    //             // DONE: use dispatch
    //             // setTodos(todos.map(c => (c._id === todo._id) ? todoToSave : c))
    //             dispatch({ type: UPDATE_TODO, todo: savedTodo })
    //             showSuccessMsg(`Todo updated to price: $${savedTodo.price}`)
    //         })
    //         .catch(err => {
    //             console.log('Cannot update todo', err)
    //             showErrorMsg('Cannot update todo')
    //         })
    // }

    // function addToCart(todo) {
    //     console.log(`Adding ${todo.vendor} to Cart`)
    //     // TODO: use dispatch
    //     // setCart([...cart, todo])
    //     dispatch({ type: ADD_TODO_TO_CART, todo })
    //     showSuccessMsg('Added to Cart')
    // }

    return (
        <main>
            <h1>Todos App</h1>
            {/* <button onClick={onAddTodo}>Add Todo</button> */}
            <button><Link to={`/todo/edit/`}>Add todo</Link></button>
            <section className="todo-index">
                {/* <TodoFilter filterBy={{ txt, minSpeed }} onSetFilter={onSetFilter} /> */}
                <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />
            </section>
            {/* <button onClick={onAddTodo}>Add Todo ⛐</button> */}
            {/* <ul className="todo-list">
                    {todos.map(todo =>
                        <li className="todo-preview" key={todo._id}>
                            <h4>{todo.vendor}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${todo.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{todo.owner && todo.owner.fullname}</span></p>
                            <div>
                                <button onClick={() => {
                                    onRemoveTodo(todo._id)
                                }}>x</button>
                                <button onClick={() => {
                                    onEditTodo(todo)
                                }}>Edit</button>
                            </div>
                            <button className="buy" onClick={() => {
                                addToCart(todo)
                            }}>Add to Cart</button>

                        </li>)}
                </ul> */}
            {/* <hr />
                <pre>{JSON.stringify(cart, null, 2)}</pre> */}
        </main>
    )

}