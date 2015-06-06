var Promise = require('promise');
var request = require('request');

var Live = function Live(){
    
    //returns promise
    this.getPosts = function(live_card_id){
        
        var reqBody = {
            url:"http://api.globalhack4.test.lockerdome.com/app_fetch_content?",
            qs:{
            "app_id":global.APP_ID,
            "app_secret":global.APP_SECRET,
            "content_id": live_card_id
            },
            method:'GET'
        };
        
        return new Promise(function(success, fail){
            request(reqBody, function(error, response, body){
                if(error){
                    fail(error);
                }else{
                    success({response:response, body:body});
                }
            });    
        });
        
    }
    this.display = function(req, res, next){
        
        this.getPosts(42).then(function(data){
            res.send(JSON.parse(data));
        });
        
    }
}

var gLive; 

if(!gLive){
    gLive = new Live();
}

exports = gLive;