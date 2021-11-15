import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ApiErrors, apiFetch } from '../utils/api'

export function LoginForm ({ onConnect }) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async function (e) {
        setError(null)
        setLoading(true)
        e.preventDefault()
        const data = {}
        new FormData(e.target).forEach((value, key) => data[key] = value)
        try {
            const user = await apiFetch('/api/auth/login', {
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
        <h2 className="text-center">Se connecter</h2>
        
        <div className="from-group">
            <label htmlFor="email">Adresse mail</label>
            <input type="email" name="email" id="email" className="form-control" required/>
        </div>
        <div className="from-group mt-3">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" className="form-control" required/>
        </div>
        <div className="text-center">
            <button disabled={loading} type="submit" className="btn btn-primary mt-3 mb-3">Se connecter</button>   
        </div>
        { error && <Alert>{error}</Alert> } 
    </form>
}

LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function Alert ({ children }) {
    return <div className="alert alert-danger">
        {children}
    </div>
}