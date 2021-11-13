import React, { useState } from 'react'

export function CreateNewPost ({ onSubmit }) {
    return <PostForm onSubmit={onSubmit} required="required" />
}

export function UpdatePost ({ onSubmit, post }) {
    return <PostForm onSubmit={onSubmit} post={post} required="" />
}

function PostForm ({ onSubmit, post = {}, required }) {

    const [selectedImage, setSelectedImage] = useState(null)

    const handleSubmit = async function (e) {
        e.preventDefault()
        const form = e.target
        const data = Object.fromEntries(new FormData(form))
        console.log(data)
        const post = {
            title: data.title,
            description: data.description
        }
        let p = new FormData;
        p.append("post", JSON.stringify(post))
        p.append("image", data.image)
        console.log(p);
        try {
            await onSubmit(p)
            form.reset()
        } catch (e) {
            throw e
        }
    }

    return <form className="row" onSubmit={handleSubmit}>
        <div className="from-group">
            <label htmlFor="title">Titre</label>
            <input type="text" name="title" id="title" className="form-control" defaultValue={post.title} required />
        </div>
        <div className="from-group mt-3">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" className="form-control" defaultValue={post.description} required />
        </div>
        <div className="from-group mt-3">
            <label htmlFor="image">Choississez une image</label>
            <input type="file" accept='.jpg, .jpeg, .png, .gif' name="image" id="image" className="form-control" onChange={(e) => setSelectedImage(e.target.files[0])} required={required} />
            {selectedImage && (<div>
                <img src={URL.createObjectURL(selectedImage)} alt="not found" />
            </div>)}
        </div>
        <button className="btn btn-primary mt-4">Valider</button>
    </form>
}