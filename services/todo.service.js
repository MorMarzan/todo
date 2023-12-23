
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter
}

_createTodos()

function query(filterBy) {
    // return axios.get(BASE_URL).then(res => res.data)
    // return storageService.query(STORAGE_KEY)
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }
            if (filterBy.isDone !== undefined) {
                todos = todos.filter(todo => todo.isDone === filterBy.isDone)
            }
            return todos
        })
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo(txt = '') {
    return {
        txt,
        isDone: false,
    }
}

function getDefaultFilter() {
    return { txt: '', isDone: undefined }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        _createDemoTodos()
    }
}

function _createDemoTodos() {
    const todoTexts = [
        'Finish homework',
        'Buy groceries',
        'Exercise for 30 minutes',
        'Read a book',
        'Call a friend',
        'Learn a new programming language',
        'Take a walk in the park'
    ]
    const todos = todoTexts.map(todoTxt => {
        const todo = _createTodo(todoTxt)
        todo.isDone = Math.random() < 0.5 ? false : true
        return todo
    })
    utilService.saveToStorage(STORAGE_KEY, todos)

}

function _createTodo(txt) {
    const todo = getEmptyTodo(txt)
    todo._id = utilService.makeId()
    return todo
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


