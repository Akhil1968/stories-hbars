var chalk = require('chalk');
var express = require('express');
var mongoose = require('mongoose');
var db = require('./models/db.js');
var exphbs  = require('express-handlebars');
var routes = require('./routes/route.js');
var user = require('./routes/user.js');
var story = require('./routes/story.js');
var bodyParser = require('body-parser');
var session = require('express-session');

var app=express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({secret:"Akhil",resave: false, saveUninitialized: false}));

var hbs = exphbs.create({
    defaultLayout:'layout1',
    helpers: { }
});
//define helper END
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', routes.index);
app.get('/stories', story.stories);
app.get('/register', routes.register);
app.post('/newUser', user.doCreate);
app.get('/registrationSuccessful', user.registrationSuccessful);
app.get('/login', routes.login);
app.post('/authenticate', user.login);
app.get('/new-story', routes.newStory);
app.post('/add-story', story.addStory);
app.get('/stories/:story', story.getStory);
app.post('/stories/:slug/saveComment', story.saveComment);
app.get('/techStack', routes.techStack);
app.get('/logout', user.logout);

app.use(function(req, res) {
     console.log(chalk.red("Error: 404"));
     res.status(404).render('404');
});

app.use(function(error, req, res, next) {
     console.log(chalk.red('Error : 500'+error))
     res.status(500).render('500');
});

var port = process.env.PORT || 3000;

app.listen(port, function(req, res){
    console.log(chalk.green("Catch the action at http://localhost:" + port));
});
