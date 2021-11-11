import React, { useState } from 'react'
import { SignupForm } from './SignupForm'
import { LoginForm } from './LoginForm'

export function LoginSignup ({ onConnect }) {

    const [page, setPage] = useState('login')

    let content = null
    if (page === 'signup') {
        content = <SignupForm onConnect={onConnect}/>
    } else if (page === 'login') {
        content = <LoginForm onConnect={onConnect}/>
    }

    return <>
        <NavBar currentPage={page} onClick={setPage}/>
        {content}
    </>
}


function NavBar ({ currentPage, onClick }) {

    const navClass = function (page) {
        let className = 'nav-link'
        if (page === currentPage) {
            className = className + ' active'
        }
        return className
    }

    return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    <a href='#login' className="navbar-brand ms-4" onClick={() => onClick('login')}>Groupomania</a>
    <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <a href="#signup" className={navClass('signup')} onClick={() => onClick('signup')}>S'inscrire</a>
        </li>
        <li className="nav-item">
            <a href="#login" className={navClass('login')} onClick={() => onClick('login')}>Se connecter</a>
        </li>
    </ul>
</nav>
}