import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, SET_FILTER_BY, SET_IS_LOADING } from "../reducers/todo.reducer.js"
import { store } from "../store.js"


export function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const filterBy = store.getState().todoModule.filterBy
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function loadTodo(todoId) {
    return todoService.getById(todoId)
        .then(todo => todo)
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

// export function removeTodoOptimistic(todoId) {
//     store.dispatch({ type: REMOVE_TODO, todoId })
//     store.dispatch({ type: SET_IS_LOADING, isLoading: true })

//     return todoService.remove(todoId)
//         .catch(err => {
//             store.dispatch({ type: TODO_UNDO })
//             console.log('todo action -> Cannot remove todo', err)
//             throw err
//         })
//         .finally(() => {
//             store.dispatch({ type: SET_IS_LOADING, isLoading: false })
//         })
// }

export function removeTodo(todoId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(todoToSave => {
            store.dispatch({ type, todo: todoToSave })
            return todoToSave
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}