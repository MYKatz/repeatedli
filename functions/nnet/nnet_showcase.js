const mongoose = require('mongoose');
let db = null;
var brain = require('brain.js');

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
module.exports = async (id="", context) => {
  db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));

  var doc = await UserModel.findOne({user_id: id});

  const config = {
    binaryThresh: 0.5,
    hiddenLayers: [5],     // array of ints for the sizes of the hidden layers in the network
    activation: 'tanh',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01   // supported for activation type 'leaky-relu'
  };


  const net = new brain.NeuralNetwork(config);

  net.train([{input: [1], output: [.2,.3,.1]},
    {input: [1], output: [.1,.3,-.1]},
    {input: [1], output: [.2,.4,.5]},
    {input: [0], output: [.1,.1,.1]},
    {input: [0], output: [.1,.2,.1]},
    {input: [0], output: [.9,.9,.9]},
    {input: [0], output: [.9,.8,.7]},
    {input: [1], output: [.3,.3,.2]},
    ].concat(doc.params));


  return net.run([1]);
};
