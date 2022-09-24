const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
const { User } = require("./modules/User");
const mongoose = require('mongoose')
const config = require("./config/key")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongoDb Connect Success!'))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send("Hello World!"))

app.post('/register', (req, res) => {
    const user = new User(req.body)
    console.log(user.name)
    user.save((err, userInfo) => {
        if(err)
            return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))
