import React, { useState } from 'react'

export function Site() {

    const [page, setPage] = useState('myPost')

    return <>
        <NavBar currentPage={page} onClick={setPage}/>
        <p>{page}</p>
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
    <a href='#' className="navbar-brand ms-4">Groupomania</a>
    <ul className="navbar-nav mr-auto">
        <li className="nav-item">
            <a href="#allPost" className={navClass('allPost')} onClick={() => onClick('allPost')}>Tous les Post</a>
        </li>
        <li className="nav-item">
            <a href="#myPost" className={navClass('myPost')} onClick={() => onClick('myPost')}>Mes post</a>
        </li>
    </ul>
</nav>
}