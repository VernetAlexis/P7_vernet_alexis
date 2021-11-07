const posts = [
  {
    "_id": "5be1ed3f1c9d44000030b061",
    "title": "Goéland",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "goeland.jpg"
  },
  {
    "_id": "5be1ef211c9d44000030b062",
    "name": "Nyan Cat",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "nyan_cat.gif"
  },
  {
    "_id": "5be9bc241c9d440000a730e7",
    "name": "Tetard",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "tetard.jpg"
  },
  {
    "_id": "5be9c4471c9d440000a730e8",
    "name": "Piment rouge",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "piment.jpg"
  },
  {
    "_id": "5be9c4c71c9d440000a730e9",
    "name": "Pikachu et Evoli",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "pokemon.gif"
  }
];

exports.find = () => {
  return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(posts))));
}

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(posts)).find(post =>
      post._id == id)
    )
  );
}