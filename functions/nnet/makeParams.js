const lib = require('lib');

/**
* @returns {any}
*/
module.exports = async (context) => {
  var p = await lib[`${context.service.identifier}.nnet`]();
  //return p;
  params = [p['0'], p['1'], p['2']];
  return params;
};
