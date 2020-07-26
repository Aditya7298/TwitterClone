app.get("/register", (req,res) => {
	res.render("register");
});

app.post("/register", (req,res) => {
	var password = req.body.password;
	var newUser = new User({username : req.body.username});
	User.register(newUser, password, (err,user) => {

		if(err){
			console.log(err);
			return res.render("register");
		} 

		passport.authenticate("local")(req,res,() => {
			res.redirect("/campgrounds");
		})
	})
});

app.get("/login", (req,res) => {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
		successRedirect : "/campgrounds",
		failureRedirect : "/register"
	}) ,(req,res) => {
});