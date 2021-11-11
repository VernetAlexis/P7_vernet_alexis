import React from 'react'
import PropTypes from 'prop-types'


export function OnePost ({ post }) {

    if (post === null) {
        return <div>
            LOADING !
        </div>
    }
    
    return <div className="col-md-4 mb-4" key={post.id}>
                <div className="card text-center bg-dark text-white">
                    <img className="card-img" src={`http://localhost:3000/images/${post.imageUrl}`} alt="" />
                    <div className="card-body">
                        <div className="card-title">{post.title}</div>
                    </div>
                </div>
    </div>
}

OnePost.propTypes = {
    posts: PropTypes.array,
}