const app = require("express")(),
      mongoose = require("mongoose");

mongoose.connect("mongodb+srv://aditya:aditya@cluster0.xqmoe.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log(err.message);
})

app.get("/", (req,res)=>{
    res.send("Home Page");
})

app.listen(8080, () => {
    console.log("Server started on port 8080.")
});