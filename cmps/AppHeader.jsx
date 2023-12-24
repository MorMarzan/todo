import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ProgressBar } from './ProgressBar.jsx'

import { logout } from '../store/actions/user.actions.js'



const { useSelector } = ReactRedux
const { NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { Fragment } = React


export function AppHeader() {

    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    // const userPrefrence = useSelector(storeState => storeState.userModule.loggedinUser.pref)
    const todosTotalCount = useSelector(storeState => storeState.todoModule.todos.length)
    const todosDoneCount = useSelector(storeState =>
        storeState.todoModule.todos.filter(todo =>
            todo.isDone).length)

    function onLogout() {
        logout()
            .then(() => {
                setUserColors(null)
                navigate('/')
                // setUserColors()
            })
            .catch((err) => {
                console.log('err', err)
                showErrorMsg('OOPS try again')
            })
    }

    function setUserColors(user) {
        const root = document.documentElement
        // Set or update the CSS variables based on the user's color and bg props
        if (user && user.pref.color && user.pref.bg) {
            root.style.setProperty('--clr1bg', user.pref.color)
            root.style.setProperty('--clr1', user.pref.bg)
        } else {
            // If user is not logged in or doesn't have color/bg, reset the variables to default
            root.style.setProperty('--clr1bg', '')
            root.style.setProperty('--clr1', '')
        }
    }

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
            <section className='login'>
                {user ? (
                    <Fragment>
                        <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                        <button onClick={onLogout}>Logout</button>
                    </Fragment>
                ) : (
                    <LoginSignup setUserColors={setUserColors}/>
                )}
            </section>
            {todosTotalCount > 0 &&
                <ProgressBar doneCount={todosDoneCount} totalCount={todosTotalCount} />}
        </header>
    )
}
