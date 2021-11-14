import React, { useEffect, useState } from 'react'
import { useComments } from './hooks/comments'
import { usePosts } from './hooks/posts'
import { useProfil } from './hooks/profil'
import { AllPosts } from './Post/AllPost'
import { OnePost } from './Post/OnePost'
import { CreateNewPost } from './Post/PostForm'
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
        fetchOnePost,
        createPost,
        deletePost,
        updatePost
    } = usePosts()
    const {
        profil,
        fetchProfil,
        deleteProfil,
        updateProfil
    } = useProfil()
    const {
        comments,
        fetchPostComments,
        createComment,
        updateComment,
        deleteComment
    } = useComments()

    const logout = async function () {
        await apiFetch('/api/auth/logout', {
            method: 'GET'
        })
        window.location.reload()
    }

    function postRedirect (post) {
        fetchOnePost(post)
        fetchPostComments(post)
        setPage(`post/${post.id}`)
    }

    function onDeletePost (post) {
        deletePost(post)
        window.location.reload()
    }

    function onDeleteProfil (profil) {
        deleteProfil(profil)
        logout()
    }

    let content = null

    if (page === 'allPost') {
        content = <AllPosts posts={posts} onClick={postRedirect} />
    } else if (page === 'userPost') {
        content = <UserPosts posts={posts} onClick={postRedirect} />
    } else if (page === 'myProfil') {
        content = <UserProfil profil={profil} onDelete={onDeleteProfil} onUpdate={updateProfil}/>
    } else if (page === 'createPost') {
        content = <CreateNewPost onSubmit={createPost} />
    } else if (page === `post/${post.id}`) {
        content = <OnePost post={post} onDelete={onDeletePost} onUpdate={updatePost} comments={comments} onSubmit={createComment} onUpdateComment={updateComment} onDeleteComment={deleteComment}/>
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
        <NavBar currentPage={page} onClick={setPage} onDisconnect={logout}/>
        <div className="container">
            {content}
        </div>
    </>
}

function NavBar ({ currentPage, onClick, onDisconnect }) {

    const navClass = function (page) {
        let className = 'nav-link'
        if (page === currentPage) {
            className = className + ' active'
        }
        return className
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
    <button  className="btn btn-outline-light me-3" onClick={() => onClick('createPost')}>
        Créer un nouveau post
    </button>
    <button  className="btn btn-danger btn-outline-light me-3 danger" onClick={onDisconnect}>
        Déconnexion
    </button>
</nav>
}