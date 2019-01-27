const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
let db = null


/**
* An open API to create your own list. Returns the id of newly-created list
* @param {string} words Comma separated list of English vocab words
* @returns {string} the ID 
*/


module.exports = async (words = "", context) => {

  db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));
  
  let ListSchema = new mongoose.Schema({
    words: Array,
    id: String
  });

  if(!words){
    return null
  }

  words = words.split(',')

  if(!Array.isArray(words)){
    return "improper formatting"
  }

  words = JSON.parse(JSON.stringify(words).replace(/\\"/g, '"'));

  var ListModel = mongoose.model('ListModel', ListSchema);
  var id = uuidv4().toString()

  var List = new ListModel({
    words: words,
    id: id
  });

  await List.save();

  return id

};
