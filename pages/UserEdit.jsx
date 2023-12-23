import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_TODO, UPDATE_TODO } from '../store/store.js'


const { useNavigate, useParams, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React


export function UserEdit() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userToEdit, setUserToEdit] = useState(userService.getEmptyUser())


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setUserToEdit(prevUser => ({ ...prevUser, [field]: value }))
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        userService.save(userToEdit)
            .then((savedUser) => {
                dispatch({ type: UPDATE_USER, user: savedUser })
                showSuccessMsg(`Profile updated successfully`)
                // navigate('/todo')
            })
            .catch(err => {
                console.log('Cannot update profile', err)
                showErrorMsg('Cannot update profile')
            })
    }

    const { fullname, color, bg } = userToEdit

    return (
        <section className="user-edit">
            <h1>Edit your profile</h1>
            <form onSubmit={onSaveUser}>
                <label htmlFor="fullname">Fullname</label>
                <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />

                <label htmlFor="color">Color</label>
                <input onChange={handleChange} value={color} type="color" name="color" id="color" />

                <label htmlFor="bg">BG Color</label>
                <input onChange={handleChange} value={bg} type="bg" name="bg" id="bg" />

                <button>Save</button>
            </form>
            <button><Link className="btn" to={'/profile'}>← Go back</Link></button>

        </section>
    )
}