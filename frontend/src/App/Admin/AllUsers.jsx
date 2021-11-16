import React, { useState, useEffect } from 'react'
import { useProfil } from '../hooks/profil'

export function AllUser () {

    const [allUsers, setAllUsers] = useState(null)

    useEffect(function () {
        (async function () {
            const response = await fetch('http://localhost:3030/api/auth/', {
                credentials: 'include'
            })
            const responseData = await response.json()
            if (response.ok) {
                setAllUsers(responseData)
            } else {
                alert(JSON.stringify(responseData))
            }
        })()
    }, [])



    if (allUsers === null) {
        return <div>
            LOADING !
        </div>
    }

    return <div>
        <div className="border shadow p-3 mb-3 bg-body rounded d-flex justify-content-between">
            <h1 className="fs-4">Tableau des utilisateurs</h1>
            <h2 className="fs-4">Action</h2>
        </div>
        {allUsers.map(u => u.username === 'admin' ? null : <OneUser key={u.id} user={u} />)}
    </div>
}


function OneUser ({ user }) {

    const [deleteMode, setDeleteMode] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const {
        deleteProfil,
    } = useProfil()

    const onDelete = async function (user) {
        await deleteProfil(JSON.stringify(user))
        setDeleteMode(false)
        setDeleted(true)
    }


    return deleteMode ? <div className="border shadow p-3 mb-3 bg-body rounded d-flex justify-content-between">
        <div>
            {user.username}
        </div>
        <div>
            <p className="text-center">Confirmer ?</p>
            <button className="btn btn-danger me-3" onClick={() => onDelete(user)} >Oui</button>
            <button className="btn btn-primary" onClick={() => setDeleteMode(false)} >Non</button>
        </div>
    </div> :
    <div className="border shadow p-3 mb-3 bg-body rounded d-flex justify-content-between">
        <div>
            {user.username}
        </div>
        { deleted ? <p>Utilisateur Supprimé</p> : 
        <button className="btn btn-danger" onClick={() => setDeleteMode(true)} >Supprimer l'utilisateur</button> }
    </div>
}