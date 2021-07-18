//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "A blog (a truncation of weblog)[1] is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page. Until 2009, blogs were usually the work of a single individual,[citation needed] occasionally of a small group, and often covered a single subject or topic. In the 2010s, multi-author blogs (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited.";
const aboutContent = "Hello everyone, Iam Jeevananthan studing 2nd year of CSE,and idk wht say 'ellarum kum vanakam' aprm onum ila..unakgaluku edachum enapathi sollanum nu thonichina put a blog post here and it will be stored for ever.I have used mongodb a cloud base database to store all your blog post.And to contact me go to contact in the navbar and that's all..Nandri makkale.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://admin-jeeva:jeeva1712@cluster1.ldaxy.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
 title: String,
 content: String
};

const Post = mongoose.model("Post", postSchema);




app.get("/", function(req, res){


    Post.find({}, function(err, posts){

       res.render("home", {

         startingContent: homeStartingContent,

         posts: posts

         });

     })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
      title: req.body.postTitle,
      content: req.body.postBody
    });
    post.save(function(err){

  if (!err){

    res.redirect("/");

  }

});
});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title: post.title,

     content: post.content

   });

 });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
