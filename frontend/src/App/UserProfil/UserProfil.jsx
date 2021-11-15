import React, { useState } from 'react'
import PropTypes from 'prop-types'

export function UserProfil ({ profil, onDelete, onUpdate }) {

    const [editMode, setEditMode] = useState(false)

    if (profil === null) {
        return <div>
            LOADING !
        </div>
    }

    console.log(profil);

    const handleSubmit = async function (e) {
        e.preventDefault()
        const form = e.target
        const newProfilData = Object.fromEntries(new FormData(form))
        console.log(newProfilData)
        const newProfil = {
            username: newProfilData.username,
            email: newProfilData.email,
            firstname: newProfilData.firstname,
            lastname: newProfilData.lastname
        }
        let data = new FormData()
        data.append("profil", JSON.stringify(newProfil))
        data.append("image", newProfilData.image)
        console.log(data);
        try {
            await onUpdate(profil[0], data)
            setEditMode(false)
        } catch (e) {
            throw e
        }
    }
    
    return editMode ? <>
        <div className="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 m-auto">
            <h1 className="text-center">Profil</h1>
            <div className="border shadow p-3 mb-3 bg-body rounded text-center">
                { profil[0].imageUrl === 'defaultpp.png' ? <img src={`http://localhost:3000/images/defaultpp.png`} alt="" className="img-fluid border border-dark"/> : 
                <img src={`http://localhost:3030/images/${profil[0].imageUrl}`} alt="" className="img-fluid border border-dark"/> }
            </div>
            <h2 className="text-center">Vos nouvelles informations</h2>
            <form className="container row" onSubmit={handleSubmit}>
                <div className="">
                    <div className="form-group">
                        <label htmlFor="username" className="fw-bold">Nom d'utilisateur :</label>
                        <input type="text" name="username" id="username" className="form-control" defaultValue={profil[0].username} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="fw-bold">Adresse mail :</label>
                        <input type="email" name="email" id="email" className="form-control" defaultValue={profil[0].email} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname" className="fw-bold">Prénom :</label>
                        <input type="text" name="firstname" id="firstname" className="form-control" defaultValue={profil[0].firstname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname" className="fw-bold">Nom :</label>
                        <input type="text" name="lastname" id="lastname" className="form-control" defaultValue={profil[0].lastname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image" className="fw-bold">Photo de profil :</label>
                        <input type="file" accept='.jpg, .jpeg, .png' name="image" id="image" className="form-control" />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary my-4">Valider</button><br />
                        <button className="btn btn-danger mb-4" onClick={() => onDelete(profil)}>Supprimer mon compte</button>
                    </div>
                </div>
            </form>
        </div>
    </> : <>
        <div className="col-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 m-auto">
            <h1 className="text-center">Profil</h1>
            <div className="border shadow p-3 mb-3 bg-body rounded text-center">
                { profil[0].imageUrl === 'defaultpp.png' ? <img src={`http://localhost:3000/images/defaultpp.png`} alt="" className="img-fluid border border-dark"/> : 
                <img src={`http://localhost:3030/images/${profil[0].imageUrl}`} alt="" className="img-fluid border border-dark"/> }
            </div>
            <h2 className="text-center">Vos informations</h2>
            <p className="fs-5"><strong>Nom d'utilisateur</strong> : {profil[0].username}</p>
            <p className="fs-5"><strong>Adresse mail</strong> : {profil[0].email}</p>
            <p className="fs-5"><strong>Nom</strong> : {profil[0].firstname}</p>
            <p className="fs-5"><strong>Prénom</strong> : {profil[0].lastname}</p>
            <div className="text-center">
                <button className="btn btn-primary my-3" onClick={() => setEditMode(true)}>Modifier</button><br />
            </div>
        </div>
    </>

}

UserProfil.propTypes = {
    posts: PropTypes.array,
}