import { useReducer } from "react";
import { apiFetch } from "../utils/api";

function reducer (state, action) {
    console.log('POSTS REDUCE', action.type, action)
    switch (action.type) {
        case 'FETCHING_POSTS':
            return { ...state }
        case 'FETCHING_POST':
            return { ...state, postId: action.payload.id }
        case 'ADD_POST':
            return { ...state, posts: [action.payload, ...state.posts] }
        case 'SET_POSTS':
            return { ...state, posts: action.payload }
        case 'SET_POST':
            return { ...state, posts: state.posts.map(p => p.id === action.payload.id ? action.payload : p) }
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter(p => p !== action.paylod) }
        default:
            throw new Error('Action inconnue' + action.type)
    }
}

export function usePosts() {
    
    const [state, dispatch] = useReducer(reducer, {
        posts: null
    })

    const post = state.posts ? state.posts.find(p => p.id === state.postId) : null

    return {
        posts: state.posts,
        post: post,
        fetchAllPosts: async function () {
            dispatch({ type: 'FETCHING_POSTS' })
            const posts = await apiFetch('/api/post/')
            console.log(posts);
            dispatch({ type: 'SET_POSTS', payload: posts })
        },
        fetchUserPosts: async function () {
            dispatch({ type: 'FETCHING_POSTS' })
            const posts = await apiFetch('/api/post/user/post')
            dispatch({ type: 'SET_POSTS', payload: posts })
        },
        fetchOnePost: async function (post) {
            dispatch ({ type: 'FETCHING_POST', payload: post })
            post = await apiFetch('/api/post/' + post.id)
            dispatch ({ type: 'SET_POST', payload: post })
        },
        createPost: async function (data) {
            const post = await apiFetch('/api/post/', {
                method: 'post',
                body: data,
            })
            console.log(post);
            dispatch({ type: 'ADD_POST', payload: post[0] })
        },
        deletePost: async function (post) {
            await apiFetch('/api/post/' + post.id, {
                method: 'delete'
            })
            dispatch ({ type: 'DELETE_POST', payload: post })
        },
        updatePost: async function (post, data) {
            post = await apiFetch('/api/post/' + post.id, {
                method: 'put',
                body: data
            })
            dispatch({ type: 'SET_POST', payload: post[0] })
        }
    }
}