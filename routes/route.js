var mongoose = require( 'mongoose' );
var Story = mongoose.model( 'Story' );

exports.index = function(req, res){
    console.log("Route index.handlebars");
    var loggedout;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedout = true;
    }else{
        loggedout = false;
    }
    res.render('index.handlebars', {loggedout:loggedout});
}


exports.techStack = function(req, res){
    var loggedout;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedout = true;
    }else{
        loggedout = false;
    }
    res.render('techStack.handlebars', {loggedout:loggedout});
  }

exports.home = function(req, res){
    Story.find({}, function(err, stories){
        res.render('home.handlebars', {stories:stories});
    });
}

exports.register = function(req, res){
  res.render('register.handlebars', {layout:'layout2'});
}

exports.login = function(req, res){
  res.render('login.handlebars', {layout:'layout2'});
}

exports.newStory = function(req, res){
    var loggedout;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedout = true;
    }else{
        loggedout = false;
    }
    
    if(req.session.loggedIn !== true){
        console.log("Logged In :" + req.session.loggedIn);
        res.redirect('/login');
    }else{
        res.render('new-story.handlebars', {loggedout:loggedout});
    }

}
