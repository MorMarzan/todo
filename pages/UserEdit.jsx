import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { updateUserPref } from '../store/actions/user.actions.js'

const { useState } = React

export function UserEdit({ user }) {

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
            pref: {
                ...prevUser.pref,
                [field]: value
            }
        }))
    }

    function onSaveUser(ev) {
        ev.preventDefault()
        updateUserPref(userToEdit)
            .then((savedUserPref) => {
                setUserColors(savedUserPref)
                showSuccessMsg(`Profile updated successfully`)
            })
            .catch(err => {
                console.log('Cannot update profile', err)
                showErrorMsg('Cannot update profile')
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

    const { fullname, pref } = userToEdit

    return (
        <section className="user-edit">
            <h1>Edit your profile</h1>
            <form onSubmit={onSaveUser}>
                <label htmlFor="fullname">Fullname</label>
                <input onChange={handleChange} value={fullname} type="text" name="fullname" id="fullname" />

                <label htmlFor="color">Color</label>
                <input onChange={handleColorChange} value={pref.color} type="color" name="color" id="color" />

                <label htmlFor="bg">BG Color</label>
                <input onChange={handleColorChange} value={pref.bg} type="color" name="bg" id="bg" />

                <button>Save</button>
            </form>

        </section>
    )
}