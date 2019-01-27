const mongoose = require('mongoose');
let db = null

let UserSchema = new mongoose.Schema({
  email: String,
  user_id: String,
  words: Array,
  lang: String,
});

var UserModel = mongoose.model('UserModel', UserSchema);


/**
* update's a user's "home language"
*/
module.exports = async (id="", lang="", context) => {
  if(id && lang){
    db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));
    var doc = await UserModel.findOne({user_id: id});

    doc.lang = lang;
    await doc.save()
    return true
  }
  return false
};
