var Create = function(){
    this.createLiveCard = function(){
        
    }
    this.updateLiveCard = function(){
        //create new card based off information
    }
    this.display = function(req, res, next){
        
        res.send(JSON.parse(req));
        
    }
}

var gCreate;
if(!gCreate){
    gCreate = new Create();
}

module.exports = gCreate;