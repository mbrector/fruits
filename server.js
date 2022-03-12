// Import Modules and set up vars
require('dotenv').config()
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
const db = require('./models/db')
db.once('open', () => {
  console.log('connected to mongo')
})

//Initialize View Engine
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())

// Mount Express Middleware
app.use((req, res, next) => {
  res.locals.data = {}
  next()
}) // Creates res.locals.data
app.use(express.urlencoded({ extended: true })) // Creates req.body
app.use(methodOverride('_method')); // Allows us to override methods
app.use(express.static('public')); // Allows us to have Static Files
app.use('/fruits', require('./controllers/routeController.js')); // Mounts our RESTFUL/INDUCES ROUTES at /fruits


// Listen on PORT
app.listen(PORT, () => {
  console.log('We in the building', PORT)
})

// require('dotenv').config()
// const express = require('express');
// const Fruit = require('./models/fruits');//NOTE: it must start with ./ if it's just a file, not an NPM package
// const app = express();
// const mongoose = require('mongoose')
// const methodOverride = require('method-override')
// const PORT = process.env.PORT || 3000

// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// //middleware must be first
// app.use((req, res, next) => {
//     res.locals.data = {}
//     next()
// })
// app.use(methodOverride('_method'))
// app.use(express.urlencoded({extended:true}))
// app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
// app.use('/fruits', require('./controllers/routeController.js'))

// app.get('/fruits', (req, res) => {
//     Fruit.find({}, (error, allFruits)=>{
//         res.render('Index', {
//             fruits: allFruits
//         });
//     })
// }); 

// app.get('/fruits/seed', (req, res)=>{
//     Fruit.create([
//         {
//             name:'grapefruit',
//             color:'pink',
//             readyToEat:true
//         },
//         {
//             name:'grape',
//             color:'purple',
//             readyToEat:false
//         },
//         {
//             name:'avocado',
//             color:'green',
//             readyToEat:true
//         }
//     ], (err, data)=>{
//         res.redirect('/fruits');
//     })
// });

// //put this above your Show route
// app.get('/fruits/new', (req, res) => {
//     res.render('New');
// });

// // app.get('/fruits/:indexOfFruitsArray', (req, res) => {
// //     res.render('Show', { //second param must be an object
// //         fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the ejs file called fruit, its value is fruit[req.params.indexOfFruitsArray]
// //     })
// // })

// app.post('/fruits', (req, res) => {
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true //do some data correction
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false //do some data correction
//     }
//     Fruit.create(req.body, (error, createdFruit)=>{
//     res.redirect('/fruits')  //send user back to /fruits
//     })
// })

// app.get('/fruits/:id', (req, res)=>{
//     Fruit.findById(req.params.id, (err, foundFruit)=>{
//         res.render('Show', {
//             fruit:foundFruit
//         });
//     });
// });

// //delete: delete one
// app.delete('/fruits/:id', (req, res)=>{
//     Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
//         res.redirect('/fruits');//redirect back to fruits index
//     });
// });

// app.put('/fruits/:id', (req, res)=>{
//     if(req.body.readyToEat === 'on'){
//         req.body.readyToEat = true;
//     } else {
//         req.body.readyToEat = false;
//     }
//     Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
//         res.redirect('/fruits');
//     });
// });

// app.get('/fruits/:id/edit', (req, res)=>{
//     Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
//       if(!err){
//         res.render(
//     		  'Edit',
//     		{
//     			fruit: foundFruit //pass in found fruit
//     		}
//     	);
//     } else {
//       res.send({ msg: err.message })
//     }
//     });
// });

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', ()=> {
//     console.log('connected to mongo');
// });

// app.listen(PORT, () => {
//     console.log('Out here grindin on', PORT);
// });