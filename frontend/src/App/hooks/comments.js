import { useReducer } from "react";
import { apiFetch } from "../utils/api";



function reducer (state, action) {
    console.log('COMMENTS REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_COMMENTS':
            return { ...state }
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload }
        case 'ADD_COMMENT':
            return { ...state, comments: [action.payload, ...state.comments] }
        case 'SET_COMMENT':
            return { ...state, comments: state.comments.map(c => c.id === action.payload.id ? action.payload : c) }
        case 'DELETE_COMMENT':
            return { ...state, comments: state.comments.filter(c => c !== action.paylaod) }
        default:
            throw new Error('Action inconnue' + action.type)
    }
}

export function useComments () {
    const [state, dispatch] = useReducer(reducer, {
        comments: null
    })

    return {
        comments: state.comments,
        fetchPostComments: async function (post) {
            dispatch({ type: 'FETCHING_COMMENTS' })
            const comments = await apiFetch('/api/comments/' + post.id)
            dispatch({ type: 'SET_COMMENTS', payload: comments })
        },
        createComment: async function (data, post) {
            console.log(data);
            console.log(post);
            const comment = await apiFetch('/api/comments/' + post.id, {
                method: 'post',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            dispatch({ type: 'ADD_COMMENT', payload: comment })
        },
        updateComment: async function (data, comment) {
            console.log(data);
            console.log(comment);
            comment = await apiFetch('/api/comments/' + comment.id, {
                method: 'put',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            dispatch({ type: 'SET_COMMENT', payload: comment })
        },
        deleteComment: async function (comment) {
            await apiFetch('/api/comments/' + comment.id, {
                method: 'delete'
            })
            dispatch({ type: 'DELETE_COMMENT', paylaod: comment })
        }
    }
}