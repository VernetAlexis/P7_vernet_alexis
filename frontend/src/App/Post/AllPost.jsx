import React from 'react'
import PropTypes from 'prop-types'


export function AllPosts ({ posts, onClick }) {

    if (posts === null) {
        return <div>
            LOADING !
        </div>
    }
    
    return <div className="row align-items-center">
        {posts.map(post => <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
            <a href={`#post/${post.id}`} className="text-decoration-none" onClick={() => onClick(post)} >
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


AllPosts.propTypes = {
    posts: PropTypes.array,
}