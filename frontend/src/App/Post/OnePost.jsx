import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { UpdatePost } from './PostForm'
import { CommentsSection } from '../Comments/Comments'
import { PostedBy } from '../ui/PostedBy'

export function OnePost ({ post, onDelete, onUpdate, comments, onSubmit, onUpdateComment, onDeleteComment, currentUser }) {

    const [editMode, setEditMode] = useState(false)

    const handleUpdate = async function (data) {
        await onUpdate(post, data)
        setEditMode(false)
    }

    return editMode ? <UpdatePost onSubmit={handleUpdate} post={post} /> : <>
    <PostDetail post={post} onDelete={onDelete} onClick={setEditMode} currentUser={currentUser}/>
    <div className="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 m-auto">
        <h2 className="text-center">Commentaires</h2>
        <CommentsSection comments={comments} onSubmit={onSubmit} post={post} onUpdate={onUpdateComment} onDelete={onDeleteComment} currentUser={currentUser}/>
    </div>
    </>
}


function PostDetail ({ post, onDelete, onClick, currentUser }) {

    const [editable, setEditable] = useState(false)

    useEffect(function () {
        if (currentUser.userId === post.user_id) {
            setEditable(true)
        }
    }, [])

    if (post === null) {
        return <div>
            LOADING !
        </div>
    }
    
    return <>
        <div className="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 m-auto">
            <div className="row">
                <div className="col-6 mb-2 ps-4">
                    <h1>{post.title}</h1>
                    <PostedBy userId={post.user_id} />
                </div>
                <div className="col-6 mb-2 ps-4">
                    { editable ? <div className="position-relative w-100 h-100">
                    <button className="btn btn-primary position-absolute top-0 end-0" onClick={() => onClick(true)}>Modifier</button><br />
                    <button className="btn btn-danger position-absolute bottom-0 end-0" onClick={() => onDelete(post)}>Supprimer</button>
                    </div> : null }
                </div>
            </div>
            <div className="border shadow p-3 mb-3 bg-body rounded">
                <div className="text-center">
                    <img className="img-fluid border border-dark" src={`http://localhost:3030/images/${post.imageUrl}`} alt="" />
                </div>
                <h2 className="text-center">Description</h2>
                <p>{post.description}</p>
            </div>
        </div>
    </>
}

OnePost.propTypes = {
    posts: PropTypes.array,
}