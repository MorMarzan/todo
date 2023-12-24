import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

/// user
export const SET_USER = 'SET_USER'
export const UPDATE_USER_PREFERENCE = 'UPDATE_USER_PREFERENCE'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    todos: [],
    isLoading: false,
    loggedinUser: userService.getLoggedinUser(),
    
}


function appReducer(state = initialState, action = {}) {

    let todos
    let user
    switch (action.type) {
        // todo
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case UPDATE_USER_PREFERENCE:
            user = { ...state.loggedinUser, ...action.preference }
            return { ...state, loggedinUser: user }

        default:
            return state
    }
}

export const store = createStore(appReducer)

window.gStore = store
// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })