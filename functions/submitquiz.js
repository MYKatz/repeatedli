var mongoose = require('mongoose');
let db = null;

let UserSchema = new mongoose.Schema({
  email: String,
  user_id: String,
  words: Array,
  lang: String,
  params: Array
});

var UserModel = mongoose.model('UserModel', UserSchema);

/**
* @returns {any}
*/
module.exports = async (obj="", id="", context) => {
  db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));

  var doc = await UserModel.findOne({user_id: id});
  var prm = [];

  var words = doc.words.slice();
  var lim = JSON.parse(obj);
  for(var i=0; i < lim["words"].length; i++){
    
    if(lim["corrects"][i]){
      for(var k=0; k < words.lenth; k++){
        if(words[k].word == lim.words[i]){
          return JSON.stringify({input: [1], output: words[k].params.slice()});
          words.splice(k,1)
          break;
        }
      }
    }
    else{
      for(var j=0; j < words.length; j++){
        if(words[j].word == lim.words[i]){
          prm.push({input: [0], output: words[j].params.slice()});
          words.splice(j,1)
          break;
        }
      }
    }
  }
  return JSON.stringify(prm);
  doc.params = prm;
  doc.words = words;
  doc.markModified("params");
  doc.markModified("words");
  var toR = await doc.save(); 
};
