var mongoose = require('mongoose');
var Story = mongoose.model('Story');


exports.stories = function(req,res){
    var loggedout;
    if (typeof(req.session.loggedIn) == 'undefined'){
        loggedout = true;
    }else{
        loggedout = false;
    }

    Story.find({}, function(err, stories){
      var hasStories;
      if (typeof(stories) == 'undefined'){
        hasStories = false;
      }else{
        hasStories = true;
      }
      res.render('home.handlebars',{hasStories: hasStories, stories: stories, loggedout: loggedout});
    });
}

exports.addStory = function(req,res){
   var title=req.body.title;
   var content=req.body.content;
   var summary=req.body.summary;
   var imageLink=req.body.imageLink;
   var author =req.session.username;
   console.log("Author is :" + author);

   var newStory = new Story();
   newStory.author = author;
   newStory.title = title;
   newStory.content = content;
   newStory.summary = summary;
   newStory.imageLink = imageLink;

   var lowercaseTitle = newStory.title.toLowerCase();
   var slug = lowercaseTitle.replace(/[^a-zA-Z0-9 ]/g, "");
   var addingHyphen = slug.replace(/\s+/g, '-');

   newStory.slug = addingHyphen;

   newStory.save(function(err, savedStory){
       if(err){
         console.log("Error : While saving the story" + JSON.stringify(err));
         return res.status(500).send();
       }else{
         console.log("Story saved successfully. " + JSON.stringify(savedStory));
         res.redirect("/stories");
       }
   });
}


exports.getStory = function(req,res){
   var url = req.params.story;
   var loggedout;
   if (typeof(req.session.loggedIn) == 'undefined'){
        loggedout = true;
   }else{
        loggedout = false;
   }

   Story.findOne({slug:url}, function(err, story){
           res.render('story.handlebars', {story:story, loggedout:loggedout});
   });
}


exports.saveComment = function(req,res){
   var story_slug=req.params.slug;
   var comment=req.body.comment;
   var posted_date=new Date();

   Story.findOne({slug:story_slug}, function(err,story){

               story.comments.push({body:comment,commented_by:req.session.username,date:posted_date});

               story.save(function(err,savedStory){
                   if(err){
                     console.log("Error : While saving comments");
                     return res.status(500).send();
                   }else{
                     res.render('story.handlebars',{story:story,session:req.session});
                   }
               });

        });
 }
