import React from 'react'
import PropTypes from 'prop-types'

export function UserProfil ({ profil }) {

    if (profil === null) {
        return <div>
            LOADING !
        </div>
    }
    
    return <form className="container row">
        <div className="col-6">
            <img src="http://localhost:3000/images/goeland.jpg" alt="" className="img-fluid"/>
        </div>
        <div className="col-6">
            <h1>Profil</h1>
            <div className="form-group col-md-4">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" className="form-control" defaultValue={profil[0].username} />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="email">Adresse mail</label>
                <input type="email" name="email" id="email" className="form-control" defaultValue={profil[0].email} />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="firstname">Prénom</label>
                <input type="text" name="firstname" id="firstname" className="form-control" defaultValue={profil[0].firstname} />
            </div>
            <div className="form-group col-md-4">
                <label htmlFor="lastname">Nom</label>
                <input type="text" name="lastname" id="lastname" className="form-control" defaultValue={profil[0].lastname} />
            </div>
            <button className="btn btn-primary my-3">Modifier</button><br />
            <button className="btn btn-danger">Supprimer mon compte</button>
        </div>
    </form>
}

UserProfil.propTypes = {
    posts: PropTypes.array,
}