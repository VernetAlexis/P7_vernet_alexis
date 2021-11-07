const users = [
    {
      "_id": "5be1ed3f1c9d44123430b061",
      "email": "test@mail.com",
      "password": "password01",
    }
  ];
  
  exports.find = () => {
    return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(users))));
  }
  
  exports.findOne = (email) => {
    return new Promise((resolve, reject) =>
      resolve(JSON.parse(JSON.stringify(users)).find(user =>
        user.email == email)
      )
    );
  }