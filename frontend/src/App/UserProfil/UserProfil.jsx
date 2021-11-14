import React from 'react'
import PropTypes from 'prop-types'

export function UserProfil ({ profil, onDelete, onUpdate }) {

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
        let data = new FormData;
        data.append("profil", JSON.stringify(newProfil))
        data.append("image", newProfilData.image)
        console.log(data);
        try {
            await onUpdate(profil[0], data)
            form.reset()
        } catch (e) {
            throw e
        }
    }
    
    return <>
        <div className="col-6">
            <img src={`http://localhost:3030/images/${profil[0].imageUrl}`} alt="" className="img-fluid"/>
        </div>
        <form className="container row" onSubmit={handleSubmit}>
            <div className="col-6">
                <h1>Profil</h1>
                <div className="form-group col-md-4">
                    <label htmlFor="username">Nom d'utilisateur :</label>
                    <input type="text" name="username" id="username" className="form-control" defaultValue={profil[0].username} required/>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="email">Adresse mail :</label>
                    <input type="email" name="email" id="email" className="form-control" defaultValue={profil[0].email} required/>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="firstname">Prénom :</label>
                    <input type="text" name="firstname" id="firstname" className="form-control" defaultValue={profil[0].firstname} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="lastname">Nom :</label>
                    <input type="text" name="lastname" id="lastname" className="form-control" defaultValue={profil[0].lastname} />
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="image">Photo de profil :</label>
                    <input type="file" accept='.jpg, .jpeg, .png' name="image" id="image" className="form-control" />
                </div>
                <button className="btn btn-primary my-3">Modifier</button><br />
            </div>
        </form>
        <button className="btn btn-danger" onClick={() => onDelete(profil)}>Supprimer mon compte</button>
    </>
}

UserProfil.propTypes = {
    posts: PropTypes.array,
}