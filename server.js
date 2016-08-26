'use strict'

const env         = process.env.NODE_ENV || 'development';
const DEV         = env==='development';
const dotenv      = require('dotenv').config()

const express     = require('express')
const morgan      = require('morgan')
const path        = require('path')
const bodyParser  = require('body-parser')
const app         = express()
const userRoute   = require('./routes/users')
const apiRoute    = require('./routes/api')
const pantryRoute = require('./routes/pantry_route')
// const recipeRoute = require('./routes/recipe_route')
const spoonRoute  = require('./routes/spoonacular')
const port        = process.argv[2] || process.env.PORT || 3000

app.set('superSecret', 'my super secret word')
app.use(morgan( DEV ? 'dev' : 'common'))
app.use(express.static(path.join(__dirname,'dist')))
app.use(bodyParser.json());

app.use( '/api', apiRoute);
app.use( '/api/users',  userRoute);
// app.use('/recipes', recipeRoute);
app.use('/pantry', pantryRoute);
app.use('/spoon', spoonRoute);

app.listen(port, ()=>{
  console.log('Server maxin\' and relaxin\' at ', port)
})
