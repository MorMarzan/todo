const { useState, useRef, useEffect } = React

import { UserEdit } from './UserEdit.jsx'
const { useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux

export function UserProfile() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
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
            <UserEdit user={user}/>

            
        </section>
    )
}
