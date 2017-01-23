var mongoose = require( 'mongoose' );
var Story = mongoose.model( 'Story' );

exports.index = function(req, res){
    console.log("Route index.handlebars");
    var loggedin;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedin = true;
    }else{
        loggedin = false;
    }
    res.render('index.handlebars', {loggedin:loggedin});
}


exports.techStack = function(req, res){
    var loggedin;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedin = true;
    }else{
        loggedin = false;
    }
    res.render('techStack.handlebars', {loggedin:loggedin});
  }

exports.home = function(req, res){
    Story.find({}, function(err, stories){
        res.render('home.handlebars', {stories:stories});
    });
}

exports.register = function(req, res){
  res.render('register.handlebars');
}

exports.login = function(req, res){
  res.render('login.handlebars');
}

exports.newStory = function(req, res){
    var loggedin;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedin = true;
    }else{
        loggedin = false;
    }
    
    if(req.session.loggedIn !== true){
        console.log("Logged In :" + req.session.loggedIn);
        res.redirect('/login');
    }else{
        res.render('new-story.handlebars', {loggedin:loggedin});
    }

}
