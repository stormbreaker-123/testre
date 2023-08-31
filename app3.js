var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const { Timestamp } = require("mongodb")


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({

    extended: true
}))

mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopoLogy: true,
    
});
var db = mongoose.connection;

db.on('error', () => console.log("ERROR DB"));
db.once('open', () => console.log("connected to db"))

app.post("/signup", (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var message = req.body.message;


    var data = {
        "name": name,
        "email": email,
        "number": number,
        "message": message,
        "timestamp": new Date()
    }

    db.collection('contact').insertOne(data, (err, collection) => {

        if (err) {

            throw err;
        } 
        console.log("record inserted");
        res.redirect('POPUP.html');
    });
    
   

})

app.get("/", (req, res) => {

    res.set({
        "Access-Control-Allow-Origin":
            '*' 
    })
    return res.redirect('index.html');
}).listen(200);

console.log("Listening")