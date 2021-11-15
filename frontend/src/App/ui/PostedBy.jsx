import React, { useEffect } from 'react'
import { useProfil } from '../hooks/profil'


export function PostedBy (userId) {

    const {
        profil,
        fetchPostProfil,
    } = useProfil()

    useEffect(function () {
        fetchPostProfil(userId)
    }, [])

    if (profil === null) {
        return <p>
            <strong>Posté par</strong> username
        </p>
    }

    return <p>
        <strong>Posté par</strong> {profil[0].username}
    </p>
}