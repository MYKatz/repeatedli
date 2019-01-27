const mongoose = require('mongoose');
let db = null

/**
* registers a new user
*/
module.exports = async (name="", email="", id="", context) => {
  //connect to Azure Cosmos DB
  db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));

  let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    user_id: String,
    words: Object,
  });

  var UserModel = mongoose.model('UserModel', UserSchema);

  var user = new UserModel({
    name: name,
    email: email,
    user_id: id
  });

  await user.save()

  return "success"

};
