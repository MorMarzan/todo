const { useState, useRef, useEffect } = React

import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { UserEdit } from './UserEdit.jsx'
const { NavLink, useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function UserProfile() {
    const user = useSelector(storeState => storeState.loggedinUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }
    }, [])

    if (!user) return null
    return (
        <section className="user-profile">
            <h1>Hello {user.fullname}</h1>
            <UserEdit />

            
        </section>
    )
}
