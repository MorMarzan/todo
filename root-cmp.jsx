const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux


import { AppHeader } from './cmps/AppHeader.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'
import { store } from './store/store.js'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { UserProfile } from './pages/UserProfile.jsx'


export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="main-layout app">
                        <AppHeader />
                        <main>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/todo" element={<TodoIndex />} />
                                <Route path="/todo/:todoId" element={<TodoDetails />} />
                                <Route path="/todo/edit" element={<TodoEdit />} />
                                <Route path="/todo/edit/:todoId" element={<TodoEdit />} />
                                <Route path="/profile" element={<UserProfile />} />
                            </Routes>
                        </main>
                        {/* <AppFooter /> */}
                        <UserMsg />
                    </section>
                </Router>
            </Provider>
        )
    }
}


