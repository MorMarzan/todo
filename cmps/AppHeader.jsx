import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/store.js'
import { ProgressBar } from './ProgressBar.jsx'

const { useSelector, useDispatch } = ReactRedux
const { NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.loggedinUser)
    const userPrefrence = useSelector(storeState => storeState.loggedinUser.prefs)
    const todosTotalCount = useSelector(storeState => storeState.todos.length)
    const todosDoneCount = useSelector(storeState =>
        storeState.todos.filter(todo =>
            todo.isDone).length)

    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
                // setUserColors()
            })
            .catch((err) => {
                showErrorMsg('OOPS try again')
            })
    }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
        // setUserColors(user)
        navigate('/')
    }

    // function setUserColors(user) {
    //     const root = document.documentElement
    //     // Set or update the CSS variables based on the user's color and bg props
    //     if (user && user.color && user.bg) {
    //         root.style.setProperty('--clr1bg', user.color)
    //         root.style.setProperty('--clr1', user.bg)
    //     } else {
    //         // If user is not logged in or doesn't have color/bg, reset the variables to default
    //         root.style.setProperty('--clr1bg', '')
    //         root.style.setProperty('--clr1', '')
    //     }
    // }


    return (
        <header className="app-header">
            <section className="header-container">
                <h1>Todo App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    {user && <NavLink to="/profile" >Profile</NavLink>}
                </nav>
            </section>
            {user ? (
                <section>
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
            {todosTotalCount > 0 &&
                <ProgressBar doneCount={todosDoneCount} totalCount={todosTotalCount} />}
        </header>
    )
}
