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
        <div className="container">
            <div className="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 m-auto border shadow-lg p-3 mb-5 bg-body rounded">
                {content}
            </div>
        </div>

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

    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
            <a href='#login' className="navbar-brand ms-4" onClick={() => onClick('login')}>
                <img src="http://localhost:3000/logo.png" alt="" height="30" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="#signup" className={navClass('signup')} onClick={() => onClick('signup')}>S'inscrire</a>
                    </li>
                    <li className="nav-item">
                        <a href="#login" className={navClass('login')} onClick={() => onClick('login')}>Se connecter</a>
                    </li>
                </ul>
            </div>
        </div>
</nav>
}
