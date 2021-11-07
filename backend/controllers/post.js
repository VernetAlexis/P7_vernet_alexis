// const uuid = require('uuid/v4');
const uuid = require("uuid").v1;
const Post = require('../models/Post');

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then(post => {
      const mappedPosts = post.map((post) => {
      post.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + post.imageUrl;
      return post;
    });
      res.status(200).json(mappedPosts);
    })
    .catch(() => { res.status(500).send(new Error('Database error!'))}
  )
}

exports.getOnePost = (req, res, next) => {
  Camera.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).send(new Error('Post not found!'));
      }
      post.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + post.imageUrl;
      res.status(200).json(post);
    })
    .catch(() => { res.status(500).send(new Error('Database error!'))}
  )
}