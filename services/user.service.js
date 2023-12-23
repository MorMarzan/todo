import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const gDemoUsers = [
    {
        _id: utilService.makeId(),
        username: 'muki',
        password: 'pass',
        fullname: 'Muki Ja',
        score: 10000,
        color: '#FFFFFF',
        bg: '#000000'
    },
    {
        _id: utilService.makeId(),
        username: 'mor',
        password: 'pass',
        fullname: 'Mor Mar',
        score: 10000,
        color: '#FFFFFF',
        bg: '#000000'
    },
    {
        _id: utilService.makeId(),
        username: 'hadar',
        password: 'pass',
        fullname: 'Hadar Mar',
        score: 10000,
        color: '#FFFFFF',
        bg: '#000000'
    }
]

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    updateUserPreference
}

_createUsers()


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function updateScore(diff) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}

function updateUserPreference(preference) {
    const { fullname, color, bg } = preference
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            user.fullname = fullname
            user.color = color
            user.bg = bg
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return ({ fullname: user.fullname, color: user.color, bg: user.bg })
        })
        .catch(console.log)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

// window.getLoggedinUser = getLoggedinUser

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score, color: user.color, bg: user.bg }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        utilService.saveToStorage(STORAGE_KEY, gDemoUsers)
    }
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



