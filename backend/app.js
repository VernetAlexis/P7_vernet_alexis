const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const mysql = require('./configs/database')

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user')

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/post', postRoutes)
app.use('/api/auth', userRoutes)

module.exports = app;