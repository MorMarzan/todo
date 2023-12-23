// import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_CART_IS_SHOWN, SET_USER } from '../store/store.js'
import { ProgressBar } from './ProgressBar.jsx'

const { useState } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.loggedinUser)
    const todosTotalCount = useSelector(storeState => storeState.todos.length)
    const todosDoneCount = useSelector(storeState =>
        storeState.todos.filter(todo =>
            todo.isDone).length)


    console.log('todos done', todosDoneCount / todosTotalCount * 100)
    // const isCartShown = useSelector(storeState => storeState.isCartShown)

    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPS try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        navigate('/')
    }

    // function onToggleCart(ev) {
    //     ev.preventDefault()
    //     dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
    // }

    return (
        <header className="app-header">
            <section className="header-container">
                <h1>Header</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}
                </nav>
            </section>
            {user ? (
                <section>
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    {/* <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span> */}
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
            {/* <UserMsg /> */}
            {todosTotalCount > 0 &&
                <ProgressBar doneCount={todosDoneCount} totalCount={todosTotalCount} />}
        </header>
    )
}
