import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// shopping cart
export const SET_CART_IS_SHOWN = 'SET_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

/// user
export const SET_USER = 'SET_USER'
export const UPDATE_USER_PREFERENCE = 'UPDATE_USER_PREFERENCE'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
    todos: [],
    isLoading: false,
    loggedinUser: userService.getLoggedinUser(),
    // isCartShown: false,
    // shoppingCart: []
}

function appReducer(state = initialState, action = {}) {

    let todos
    let user
    // let shoppingCart
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


        // shopping cart
        // case SET_CART_IS_SHOWN:
        //     return { ...state, isCartShown: action.isCartShown }

        // case ADD_TODO_TO_CART:
        //     shoppingCart = [...state.shoppingCart, action.todo]
        //     return { ...state, shoppingCart }

        // case ADD_TODO_TO_CART:
        //     shoppingCart = [...state.shoppingCart, action.todo]
        //     return { ...state, shoppingCart }

        // case REMOVE_TODO_FROM_CART:
        //     shoppingCart = state.shoppingCart.filter(todo => todo._id !== action.todoId)
        //     return { ...state, shoppingCart }
        // case CLEAR_CART:
        //     return { ...state, shoppingCart: [] }

        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        // case SET_USER_SCORE:
        //     user = {...state.loggedinUser, score: action.score}
        //     return { ...state, loggedinUser: user }
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