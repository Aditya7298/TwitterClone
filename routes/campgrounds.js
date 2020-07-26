const app = require("express")();

app.get("/campgrounds", function(req,res){
	Campground.find({}, function(error,campgrounds){
		if(error){
			console.log("Get request error");
			console.log(error);
		} else {
			res.render("campgrounds/index", {campgrounds:campgrounds});
		}
	});
});

app.post("/campgrounds", function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name:name, image:image, description:description};
	Campground.create(newCampground,function(error,campground){
		if(error){
			console.log("Error detected!!");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

app.get( "/campgrounds/new", function(req,res){
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec( function(error,campground){
		if(error){
			console.log("Error detected");
		} else {
			res.render("campgrounds/show", {campground:campground});
		}
	});
});