var mongo = require('mongodb').MongoClient;
var url = "mongodb://jordan:mack@ds149551.mlab.com:49551/fcc-backend";

var methods = {};

methods.insert = function(search){
  mongo.connect(url, function(err, db){
    if (err) throw err
    db.collection('search-history').insert( {"term": search, "when": new Date().toString() }  );
    db.close();
  });
  
  };
  
methods.showHistory = function(response){
  mongo.connect(url, function(err, db){
    if (err) throw err
    db.collection('search-history').find({},{'_id':0}).sort( { 'when': -1  } ).limit(10).toArray(function(err,history){
      response.send(history);
    });
  });
}
  
module.exports = methods;
