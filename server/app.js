const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("./models/user")
const User = mongoose.model("User");

app.use(bodyParser.json());


const DATABASEURL = "mongodb+srv://ntugroup:sharepw1234@cluster0.achsvjv.mongodb.net/dbcarbon?retryWrites=true&w=majority";
mongoose.connect(DATABASEURL, {
    //useNewUrlPaser: true,
    //useUnifieldTopology:true
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongoDB");
});

mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err);
});

// Endpoint to handle login and redirection
app.post('/login', async (req, res) => {
    const { account } = req.body;
    
    try {
        console.log('Login request for account:', account);
        const user = await User.findOne({ a15account:account});
        console.log('Login result:', user);
        if (!user) {
            res.json({ success: false });
            return;
        }

        let personID = user.a10personID;

        res.json({ success: true, personID: personID });
    } catch (error) {
        console.error('Error during login:', error);
        res.json({ success: false });
    }
});

app.get('/', (req, res) => {
    User.find({}).then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        console.log(err);
    })
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});