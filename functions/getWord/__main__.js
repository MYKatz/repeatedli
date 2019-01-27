var axios = require('axios');
const uuidv4 = require('uuid/v4');
var mongoose = require('mongoose');
const lib = require('lib');
let db = null

function daysbetween(date1, date2){
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  var difference_ms = date2_ms - date1_ms;
  return difference_ms /(1000*60); //convert to minutes
  // returns difference in seconds
}

function mutate(p){
  return p + (Math.floor(Math.random() * 30) - 15)/100
}

function shouldSendPrevious(diff, step, params){
  //relates the time difference and the current repetition to determine if should be spaced ... diff is in ms
  if(diff > (params[0]*10 * (params[1]*10)**step + (params[2])*10)){
    // naive implementation - initial spacing is 30 secs, then additional 30 secs for each subsequent step
    return true
  }
  else{
    return false
  }
}

let UserSchema = new mongoose.Schema({
  email: String,
  user_id: String,
  words: Array,
  lang: String,
  params: Array
});

var UserModel = mongoose.model('UserModel', UserSchema);

/**
* 
*/

module.exports = async (id="", lang="fr", list="", context) => {
  db = db || await(mongoose.connect('mongodb://repeatedli:9FFKUmBGMCEqfF7msfbRnOpyJRuwk3FiVVtusC2KosERMtS5YBuhdQtSd2TN5oBeI6vRYk9TLz3RmC3wBGBDRA%3D%3D@repeatedli.documents.azure.com:10255/?ssl=true'));

  var doc = await UserModel.findOne({user_id: id});
  var toSend = null
  
  // toSend is a 'word object' = {word: "word in english", lang: "2-letter lang code", lastseen: date, count: int}
  if(doc && doc.words.length > 0){
    var now = new Date();
    for(var i=0; i< doc.words.length; i++){
      //iterates through list, finding first doc that should be displayed (if any)... should be O(n) in worst case
      if(shouldSendPrevious(daysbetween(doc.words[i].lastseen, now), doc.words[i].count, doc.words[i].params)){
        var toSend = doc.words[i];
        toSend.count += 1;
        toSend.lastseen = new Date();
        var newArray = doc.words.slice();
        newArray.splice(i, 1);
        newArray.push(toSend);
        doc.words = newArray.slice();
        doc.markModified("words");
        await doc.save();
        break;
      }
    }
    
  }
  const key = "22e18d4f78fb44148a965d19245cf1e8";

  if(!key){
    return "No key, update environment variables"
  }

  if(!id){
    return "no id"
  }

  var nouns = ["word","but","what","some","we","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy","old","too","same","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother","world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north","open","seem","together","next","white","children","begin","got","walk","example","ease","paper","group","always","music","those","both","mark","often","letter","until","mile","river","car","feet","care","second","book","carry","took","science","eat","room","friend","began","idea","fish","mountain","stop","once","base","hear","horse","cut","sure","watch","color","face","wood","main","enough","plain","girl","usual","young","ready","above","ever","red","list","though","feel","talk","bird","soon","body","dog","family","direct","pose","leave","song","measure","door","product","black","short","numeral","class","wind","question","happen","complete","ship","area","half","rock","order","fire","south","problem","piece","told","knew","pass","since","top","whole","king","space","heard","best","hour","better","true","during","hundred","five","remember","step","early","hold","west","ground","interest","reach","fast","verb","sing","listen","six","table","travel","less","morning","ten","simple","several","vowel","toward","war","lay","against","pattern","slow","center","love","person","money","serve","appear","road","map","rain","rule","govern","pull","cold","notice","voice","unit","power","town","fine","certain","fly","fall","lead","cry","dark","machine","note","wait","plan","figure","star","box","noun","field","rest","correct","able","pound","done","beauty","drive","stood","contain","front","teach","week","final","gave","green","oh","quick","develop","ocean","warm","free","minute","strong","special","mind","behind","clear","tail","produce","fact","street","inch","multiply","nothing","course","stay","wheel","full","force","blue","object","decide","surface","deep","moon","island","foot","system","busy","test","record","boat","common","gold","possible","plane","stead","dry","wonder","laugh","thousand","ago","ran","check","game","shape","equate","hot","miss","brought","heat","snow","tire","bring","yes","distant","fill","east","paint","language","among","grand","ball","yet","wave","drop","heart","am","present","heavy","dance","engine","position","arm","wide","sail","material","size","vary","settle","speak","weight","general","ice","matter","circle","pair","include","divide","syllable","felt","perhaps","pick","sudden","count","square","reason","length","represent","art","subject","region","energy","hunt","probable","bed","brother","egg","ride","cell","believe","fraction","forest","sit","race","window","store","summer","train","sleep","prove","lone","leg","exercise","wall","catch","mount","wish","sky","board","joy","winter","sat","written","wild","instrument","kept","glass","grass","cow","job","edge","sign","visit","past","soft","fun","bright","gas","weather","month","million","bear","finish","happy","hope","flower","clothe","strange","gone","jump","baby","eight","village","meet","root","buy","raise","solve","metal","whether","push","seven","paragraph","third","shall","held","hair","describe","cook","floor","either","result","burn","hill","safe","cat","century","consider","type","law","bit","coast","copy","phrase","silent","tall","sand","soil","roll","temperature","finger","industry","value","fight","lie","beat","excite","natural","view","sense","ear","else","quite","broke","case","middle","kill","son","lake","moment","scale","loud","spring","observe","child","straight","consonant","nation","dictionary","milk","speed","method","organ","pay","age","section","dress","cloud","surprise","quiet","stone","tiny","climb","cool","design","poor","lot","experiment","bottom","key","iron","single","stick","flat","twenty","skin","smile","crease","hole","trade","melody","trip","office","receive","row","mouth","exact","symbol","die","least","trouble","shout","except","wrote","seed","tone","join","suggest","clean","break","lady","yard","rise","bad","blow","oil","blood","touch","grew","cent","mix","team","wire","cost","lost","brown","wear","garden","equal","sent","choose","fell","fit","flow","fair","bank","collect","save","control","decimal","gentle","woman","captain","practice","separate","difficult","doctor","please","protect","noon","whose","locate","ring","character","insect","caught","period","indicate","radio","spoke","atom","human","history","effect","electric","expect","crop","modern","element","hit","student","corner","party","supply","bone","rail","imagine","provide","agree","thus","capital","won't","chair","danger","fruit","rich","thick","soldier","process","operate","guess","necessary","sharp","wing","create","neighbor","wash","bat","rather","crowd","corn","compare","poem","string","bell","depend","meat","rub","tube","famous","dollar","stream","fear","sight","thin","triangle","planet","hurry","chief","colony","clock","mine","tie","enter","major","fresh","search","send","yellow","gun","allow","print","dead","spot","desert","suit","current","lift","rose","continue","block","chart","hat","sell","success","company","subtract","event","particular","deal","swim","term","opposite","wife","shoe","shoulder","spread","arrange","camp","invent","cotton","born","determine","quart","nine","truck","noise","level","chance","gather","shop","stretch","throw","shine","property","column","molecule","select","wrong","gray","repeat","require","broad","prepare","salt","nose","plural","anger","claim","continent","oxygen","sugar","death","pretty","skill","women","season","solution","magnet","silver","thank","branch","match","suffix","especially","fig","afraid","huge","sister","steel","discuss","forward","similar","guide","experience","score","apple","bought","led","pitch","coat","mass","card","band","rope","slip","win","dream","evening","condition","feed","tool","total","basic","smell","valley","nor","double","seat","arrive","master","track","parent","shore","division","sheet","substance","favor","connect","post","spend","chord","fat","glad","original","share","station","dad","bread","charge","proper","bar","offer","segment","slave","duck","instant","market","degree","populate","chick","dear","enemy","reply","drink","occur","support","speech","nature","range","steam","motion","path","liquid","log","meant","quotient","teeth","shell","neck"];

  var word = ""
  if(!list){
    word = nouns[Math.floor(Math.random() * nouns.length)];
  }
  else{
    //handle custom list!
  }

  if(!toSend){
    var p = await lib[`${context.service.identifier}.nnet`](id,doc.params);
    toSend = {
      word: word,
      lang: doc.lang,
      lastseen: new Date(),
      count: 1,
      translated: "",
      params: [mutate(p['0']), mutate(p['1']), mutate(p['2'])],
    }
  }


  let reqOpts = {
    method: 'POST',
    url: 'https://api.cognitive.microsofttranslator.com/translate',
    headers: {
      'Ocp-Apim-Subscription-Key': key, //put key here
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    responseType: 'json',
    data: [{
      'text': toSend.word //put text to translate
    }],
    params: {
      'api-version': '3.0',
      'to': toSend.lang,
      'from': 'en',
    },
  }

  const response = await axios(reqOpts);

  toSend.translated = await response.data[0].translations[0].text;

  doc.words.push(toSend);
  await doc.save();
  
  return {
    word: toSend.word,
    translated: response.data[0].translations[0].text,
    count: toSend.count
  }
};
