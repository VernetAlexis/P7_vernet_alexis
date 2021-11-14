import React, { useState } from 'react'

export function CommentsSection ({ comments, onSubmit, post, onUpdate, onDelete }) {

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
            <label htmlFor="content">Votre commentaire</label>
            <textarea name="content" id="content" className="form-control"/>
            <button className="btn btn-primary">Commenter</button>
        </form>
        {comments.map(c => <OneComment comment={c} key={c.id} onUpdate={onUpdate} onDelete={onDelete} />)}
    </div>
}

function OneComment ({ comment, onUpdate, onDelete }) {

    const [editMode, setEditMode] = useState(false)

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
            <button className="btn btn-primary">Valider</button>
            <button className="btn btn-danger" onClick={handleDelete}>Supprimer</button>
        </form>
    </div> : <div>
        {comment.content}
        <button className="btn btn-primary" onClick={() => setEditMode(true)}>Modifier</button>
    </div>
}