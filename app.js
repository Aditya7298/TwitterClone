const user = require("./models/user");

const express = require("express")
	 ,app = express()
	 ,bodyParser = require("body-parser")
	 ,mongoose = require("mongoose")
	 ,Campground = require("./models/campground")
	 ,Comment = require("./models/comment") 
	 ,seedDB = require("./models/seeds")
	 ,passport = require("passport")
	 ,LocalStrategy = require("passport-local")
	 ,passportLocalMongoose = require("passport-local-mongoose")
	 ,User = require("./models/user");

//DB Setup

mongoose.connect("mongodb+srv://aditya:aditya@cluster0.xqmoe.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log(err.message);
});

seedDB();

//Passport Setup
app.use(require("express-session")({
	secret : "This is my first project",
	resave : false,
	saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currUser = req.user;
	next();
});
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//Routes

app.get("/", function(req,res){
	res.render("landing");
});


function isLoggedIn(req, res, next){

	// console.log("Checking Auth");

	if(req.isAuthenticated()){
		return next();
	}

	res.redirect("/login");
}

app.get("/logout", (req,res) => {
	req.logout();
	res.redirect("/");
})

app.listen(8080,function(req,res){
	console.log("YelpCamp Server Started!");
});