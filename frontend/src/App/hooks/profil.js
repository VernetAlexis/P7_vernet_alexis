import { useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer (state, action) {
    console.log('POSTS REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_PROFIL':
            return { ...state }
        case 'SET_PROFIL':
            return { ...state, profil: action.payload }
        case 'DELETE_PROFIL':
            return { ...state }
        default:
            throw new Error('Action inconnue' + action.type)
    }
}

export function useProfil() {
    
    const [state, dispatch] = useReducer(reducer, {
        profil: null
    })

    return {
        profil: state.profil,
        fetchProfil: async function () {
            dispatch({ type: 'FETCHING_PROFIL' })
            const profil = await apiFetch('/api/profil')
            dispatch({ type: 'SET_PROFIL', payload: profil })
        },
        deleteProfil: async function (profil) {
            await apiFetch('/api/profil', {
                method: 'delete'
            })
            dispatch ({ type: 'DELETE_PROFIL', payload: profil })
        },
        updateProfil: async function (profil, data) {
            console.log(data);
            console.log(profil);
            profil = await apiFetch('/api/profil/' + profil.id ,{
                method: 'put',
                body: data
            })
            if (!profil) {
                return console.log('error');
            }
            dispatch ({ type: 'SET_PROFIL', payload: profil })
        },
        fetchPostProfil : async function (userId) {
            dispatch({ type: 'FETCHING_PROFIL' })
            const profil = await apiFetch('/api/profil/' + userId.userId)
            dispatch ({ type: 'SET_PROFIL', payload: profil })
        }
    }
}