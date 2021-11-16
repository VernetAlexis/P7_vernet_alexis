import React from 'react'
import PropTypes from 'prop-types'

export function UserPosts ({ posts, onClick }) {

    if (posts === null) {
        return <div>
            LOADING !
        </div>
    }
    
    return <div className="row align-items-center">
        <h1 className="border shadow p-3 mb-3 bg-body rounded text-center">Mes posts</h1>
        {posts.map(post => <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <a href="#" className="text-decoration-none" onClick={() => onClick(post)} >
                <div className="card text-center text-dark bg-light border shadow-lg p-1 rounded">
                    <img className="card-img" src={`http://localhost:3030/images/${post.imageUrl}`} alt="" />
                    <div className="card-body">
                        <div className="card-title">{post.title}</div>
                    </div>
                </div>
            </a>
        </div> )}
    </div>
}

UserPosts.propTypes = {
    posts: PropTypes.array,
}