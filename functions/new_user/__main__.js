const mongoose = require('mongoose');
let db = null

let UserSchema = new mongoose.Schema({
  email: String,
  user_id: String,
  words: Array,
  lang: String,
  params: Array
});

var UserModel = mongoose.model('UserModel', UserSchema);

/**
* registers a new user
*/
module.exports = async (id="", lang="", context) => {
  //connect to Azure Cosmos DB
  db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));

  var doc = await UserModel.findOne({user_id: id});
  if(doc){
    return true
  }
  //else
  var user = new UserModel({
    user_id: id,
    words: [],
    lang: lang || "fr",
    params: []
  });

  await user.save()

  return false

};
