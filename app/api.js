var https = require('https');
var bl = require('bl');


var methods = {};

methods.pixabay = function(search, response, offset){
  
  var path = '/api/?key=6024198-b891a26ae50627de5f5a0e197&q='+search+'&image_type=photo&per_page=200'
  var optionsget = {
    host : 'pixabay.com', // here only the domain name
    // (no http/https !)
    port : 443,
    path : path, // the rest of the url with parameters if needed
    method : 'GET' // do GET
};
  
  https.request(optionsget, function(res){
    
    res.pipe(bl(function (err, data){
      
        if(err){console.log(err);}
       data = data.toString();
      data = JSON.parse(data);
      console.log(data.hits);
      var images=[];
      for (var i = offset; i < data.hits.length; i++){
        images.push({
          "URL": data.hits[i].webformatURL,
          "Tags": data.hits[i].tags,
          "Thumbnail": data.hits[i].previewURL,
          "Context": data.hits[i].pageURL
        });
        if (images.length == 10){
          break;
        }
      }
      
      console.log(images);
       response.send(images);
      
     }));
    
      
     }).end();
  
};
  

module.exports = methods;