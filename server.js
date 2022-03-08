require('dotenv').config()
const express = require('express');
const Fruit = require('./models/fruits');//NOTE: it must start with ./ if it's just a file, not an NPM package
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//middleware must be first
app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})

app.use(express.urlencoded({extended:false}))

app.get('/fruits/seed', (req, res)=>{
    Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ], (err, data)=>{
        res.redirect('/fruits');
    })
});

app.get('/fruits', (req, res) => {
    Fruit.find({}, (error, allFruits)=>{
        res.render('Index', {
            fruits: allFruits
        });
    })
}); 

//put this above your Show route
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     res.render('Show', { //second param must be an object
//         fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the ejs file called fruit, its value is fruit[req.params.indexOfFruitsArray]
//     })
// })

app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('Show', {
            fruit:foundFruit
        });
    });
});

app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
    }
    Fruit.create(req.body, (error, createdFruit)=>{
    res.redirect('/fruits')  //send user back to /fruits
    })
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

app.listen(PORT, () => {
    console.log('Out here grindin on', PORT);
});