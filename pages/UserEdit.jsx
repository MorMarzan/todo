import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UPDATE_USER_PREFERENCE } from '../store/reducers/user.reducer.js'

const { useDispatch } = ReactRedux
const { useState } = React

export function UserEdit({ user }) {

    const dispatch = useDispatch()
    const [userToEdit, setUserToEdit] = useState(user)

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

    function handleColorChange({ target }) {
        const field = target.name
        let value = target.value

        setUserToEdit(prevUser =>
        ({
            ...prevUser,
            prefs: {
                ...prevUser.prefs,
                [field]: value
            }
        }))
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        userService.updateUserPreference(userToEdit)
            .then((savedPreference) => {
                console.log('savedPreference',savedPreference)
                dispatch({ type: UPDATE_USER_PREFERENCE, preference: savedPreference })
                showSuccessMsg(`Profile updated successfully`)
            })
            .catch(err => {
                console.log('Cannot update profile', err)
                showErrorMsg('Cannot update profile')
            })
    }

    const { fullname, prefs } = userToEdit

    return (
        <section className="user-edit">
            <h1>Edit your profile</h1>
            <form onSubmit={onSaveUser}>
                <label htmlFor="fullname">Fullname</label>
                <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />

                <label htmlFor="color">Color</label>
                <input onChange={handleColorChange} value={prefs.color} type="color" name="color" id="color" />

                <label htmlFor="bg">BG Color</label>
                <input onChange={handleColorChange} value={prefs.bg} type="color" name="bg" id="bg" />

                <button>Save</button>
            </form>
            {/* <button><Link className="btn" to={'/profile'}>← Go back</Link></button> */}

        </section>
    )
}