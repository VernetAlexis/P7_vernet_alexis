import React, { useState, useEffect } from 'react'
import { PostedBy } from '../ui/PostedBy'

export function CommentsSection ({ comments, onSubmit, post, onUpdate, onDelete, currentUser }) {

    if (comments === null) {
        return <div>
            LOADING !
        </div>
    }

    const handleSubmit = async function (e) {
        e.preventDefault()
        const form = e.target
        const data = Object.fromEntries(new FormData(form))
        console.log(post)
        try {
            await onSubmit(JSON.stringify(data), post)
            form.reset()
        } catch (e) {
            throw e
        }
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="content">Votre commentaire :</label>
            <textarea name="content" id="content" className="form-control" required/>
            <div className="text-center my-3">
                <button className="btn btn-primary">Ajouter mon commentaire</button>
            </div>
        </form>
        {comments.map(c => <OneComment comment={c} key={c.id} onUpdate={onUpdate} onDelete={onDelete} currentUser={currentUser} />)}
    </div>
}

function OneComment ({ comment, onUpdate, onDelete, currentUser }) {

    const [editMode, setEditMode] = useState(false)
    const [editable, setEditable] = useState(false)

    useEffect(function () {
        if ((currentUser.userId === comment.user_id) || (currentUser.username === 'admin')) {
            setEditable(true)
        }
    }, [])

    const handleUpdate = async function (e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        try {
            await onUpdate(JSON.stringify(data), comment)
            setEditMode(false)
        } catch (e) {
            throw e
        }
    }

    const handleDelete = async function (e) {
        e.preventDefault()
        await onDelete(comment)
    }

    return editMode ? <div>
            <form onSubmit={handleUpdate}>
                <textarea className="form-control" name="content" id="content" defaultValue={comment.content}></textarea>
                <div className="text-center my-3">
                    <button className="btn btn-primary me-3">Valider</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
                </div>
        </form>
    </div> : <div className="border shadow p-3 mb-3 bg-body rounded d-flex justify-content-between">
        <div>
            {comment.content}
            <PostedBy userId={comment.user_id} />
        </div>
        {editable ? <button className="btn btn-primary" onClick={() => setEditMode(true)}>Modifier</button> : null}        
    </div>
}