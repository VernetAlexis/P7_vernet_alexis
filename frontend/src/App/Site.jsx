import React, { useEffect, useState } from 'react'
import { usePosts } from './hooks/posts'
import { useProfil } from './hooks/profil'
import { AllPosts } from './Post/AllPost'
import { OnePost } from './Post/OnePost'
import { UserPosts } from './Post/UserPost'
import { UserProfil } from './UserProfil/UserProfil'
import { apiFetch } from './utils/api'

export function Site () {

    const [page, setPage] = useState('allPost')

    const {
        posts,
        post,
        fetchAllPosts,
        fetchUserPosts,
        fetchOnePost
    } = usePosts()
    const {
        profil,
        fetchProfil
    } = useProfil()

    function postRedirect (post) {
        fetchOnePost(post)
        setPage(`post/${post.id}`)
    }

    let content = null

    if (page === 'allPost') {
        content = <AllPosts posts={posts} onClick={postRedirect} />
    } else if (page === 'userPost') {
        content = <UserPosts posts={posts} onClick={postRedirect} />
    } else if (page === 'myProfil') {
        content = <UserProfil profil={profil} />
    } else if (page === `post/${post.id}`) {
        content = <OnePost post={post} />
    } else {
        content = page
    }

    useEffect(function () {
        if (page === 'allPost') {
            fetchAllPosts()
        } else if (page === 'userPost') {
            fetchUserPosts()
        } else if (page === 'myProfil') {
            fetchProfil()
        }
    }, [page])

    return <>
        <NavBar currentPage={page} onClick={setPage}/>
        <div className="container">
            {content}
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

    const handleDisconnect = async function () {
        await apiFetch('/api/auth/logout', {
            method: 'GET'
        })
        window.location.reload()
    }

    return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    <a href='#allPost' className="navbar-brand ms-4" onClick={() => onClick('allPost')}>Groupomania</a>
    <ul className="navbar-nav me-auto">
        <li className="nav-item">
            <a href="#allPost" className={navClass('allPost')} onClick={() => onClick('allPost')}>Tous les Post</a>
        </li>
        <li className="nav-item">
            <a href="#userPost" className={navClass('userPost')} onClick={() => onClick('userPost')}>Mes post</a>
        </li>
        <li className="nav-item">
            <a href="#myProfil" className={navClass('myProfil')} onClick={() => onClick('myProfil')}>Mon Profil</a>
        </li>
    </ul>
    <button  className="btn btn-outline-light me-3">
        Créer un nouveau post
    </button>
    <button  className="btn btn-danger btn-outline-light me-3 danger" onClick={handleDisconnect}>
        Déconnexion
    </button>
</nav>
}