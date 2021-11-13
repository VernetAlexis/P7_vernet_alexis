import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ApiErrors, apiFetch } from '../utils/api'

export function SignupForm ({ onConnect }) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async function (e) {
        setError(null)
        setLoading(true)
        e.preventDefault()
        const data = {}
        new FormData(e.target).forEach((value, key) => data[key] = value)
        try {
            const user = await apiFetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            onConnect(user)
        } catch (e) {
            if (e instanceof ApiErrors) {
                setError(e.errors)
            } else {
                console.error(e)
            }
            setLoading(false)
        }
    }

    return <form className="container mt-4" onSubmit={handleSubmit}>
        <h2>S'inscrire</h2>
        
        <div className="from-group">
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" id="email" className="form-control" required/>
        </div>
        <div className="from-group mt-3">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" id="username" className="form-control" required/>
        </div>
        <div className="from-group mt-3">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" className="form-control" required/>
        </div>
        <button disabled={loading} type="submit" className="btn btn-primary mt-3 mb-3">Se connecter</button>
        { error && <Alert>{error}</Alert> } 
    </form>
}

SignupForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function Alert ({ children }) {
    return <div className="alert alert-danger">
        {children}
    </div>
}