import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { UpdatePost } from './PostForm'

export function OnePost ({ post, onDelete, onUpdate }) {

    const [editMode, setEditMode] = useState(false)

    const handleUpdate = async function (data) {
        await onUpdate(post, data)
        setEditMode(false)
    }

    return editMode ? <UpdatePost onSubmit={handleUpdate} post={post} /> : 
    <PostDetail post={post} onDelete={onDelete} onClick={setEditMode} />
}


function PostDetail ({ post, onDelete, onClick }) {

    if (post === null) {
        return <div>
            LOADING !
        </div>
    }

    
    return <>
        <div className="row">
            <div className="col-md-6 mb-4">
                <h1>{post.title}</h1><p>Posté par {post.user_id}</p>
                <img className="card-img" src={`http://localhost:3030/images/${post.imageUrl}`} alt="" />
                <h2>Description</h2>
                <p>{post.description}</p>
            </div>
            <div className="col-md-6">
                <button className="btn btn-primary" onClick={() => onClick(true)}>Modifier</button><br />
                <button className="btn btn-danger mt-4" onClick={() => onDelete(post)}>Supprimer</button>
            </div>
        </div>
        <div className="row">
            <div>COMMENTS</div>
        </div>
    </>
}

OnePost.propTypes = {
    posts: PropTypes.array,
}