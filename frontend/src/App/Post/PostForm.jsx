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
        const updatePost = {
            title: data.title,
            description: data.description
        }
        let p = new FormData()
        p.append("post", JSON.stringify(updatePost))
        p.append("image", data.image)
        console.log(p);
        try {
            await onSubmit(p)
            form.reset()
        } catch (e) {
            throw e
        }
    }

    return <div className="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 m-auto border shadow-lg p-3 mb-5 bg-body rounded">
        <form className="row" onSubmit={handleSubmit}>
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
                {selectedImage && (<div className="border shadow p-3 my-3 bg-body rounded text-center">
                    <img src={URL.createObjectURL(selectedImage)} alt="not found" className="img-fluid border border-dark" />
                </div>)}
            </div>
            <div className="text-center">
                <button className="btn btn-primary mt-3 w-75">Valider</button>
            </div>
        </form>
    </div>
}