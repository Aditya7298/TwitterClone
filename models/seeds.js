var mongoose = require("mongoose"),
	Campground = require("./campground"),
	Comment = require("./comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){


	// User.find({}, (err,users) => {
	// 	if(err){
	// 		console.log(err);
	// 	} else {
	// 		users.forEach( (user) => {
	// 			var id = user._id;
	// 			User.findByIdAndDelete(id, (err) => {
	// 				if(err){
	// 					console.log(err);
	// 				} else {
	// 					console.log("User Deleted!!");
	// 				}
	// 			})
	// 		})
	// 	}
	// });
	

	Campground.remove({}, function(error){
		if(error){
			console.log("Error detected!!");
			console.log(error);
		} else {
			
			Comment.remove({}, (err) => {
				if(err){
					console.log(err);
				} else {
					// console.log("Comments removed");
				}
			});

			// console.log("Campgrounds removed!!");
			data.forEach(function(seed){
				Campground.create(seed, function(error,campground){
					if(error){
						console.log(error);
					} else {
						// console.log("Campground created");
						Comment.create({
							text : "This place is great but there is no internet",
							author : "Lincoln"
						}, function(error, comment){
							if(error){
								console.log(error);
							} else {
								// console.log("Comment created");
								campground.comments.push(comment);
								campground.save();
								// console.log(campground);
							}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;