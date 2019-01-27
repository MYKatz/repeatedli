const mongoose = require('mongoose');
const lib = require('lib');
var axios = require('axios');
let db = null;
const uuidv4 = require('uuid/v4');

let UserSchema = new mongoose.Schema({
    email: String,
    user_id: String,
    words: Array,
});

var UserModel = mongoose.model('UserModel', UserSchema);

module.exports = async (id="", lang="fr", list="", context) => {
    db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));

    var doc = await UserModel.findOne({user_id: id});
    var toSend = {};
    // toSend is a 'word object' = {word: "word in english", lang: "2-letter lang code", lastseen: date, count: int}
    var amountFound = 0;
    if(doc.words.length > 0){
        for(var i=0; i< doc.words.length; i++){
        //iterates through list, checking amount of words with count >= 3
            if (doc.words[i].count >= 3 && doc.words[i].lang == lang){
                amountFound += 1;
            }
        } 
    }

    if (amountFound >= 5){
        for (var i=0; i<doc.words.length; i++){
            if (doc.words[i].count >= 3 && doc.words[i].lang == lang){
                toSend["Q" + (i + 1)] = {
                    word: doc.words[i].word,
                    correct: doc.words[i].translated
                };
            }
        }
    }

    return toSend;
};  