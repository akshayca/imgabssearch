var db = require('./database.js');
var api = require('./api.js');



module.exports = function(app){
  
  app.route('/').get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    });
  
  app.route('/api/:search').get(function(req,res){
    var search = req.params.search;
    db.insert(search);
    search = search.replace(" ", "+");
    var offset = 0;
    if(req.query.offset) {offset = req.query.offset}
    api.pixabay(search, res, offset);
  });
  
  app.route('/latest').get(function(req,res){
    db.showHistory(res);
  })
  
  
}

