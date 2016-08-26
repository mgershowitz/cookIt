const express   = require('express');
const spoon     = express.Router()
const db        = require('../models/spoon')

const sendJSONresp = (req,res)=>res.json(res.rows)

spoon.route('/cuisine')
  .get(db.getByCuisine, sendJSONresp)

spoon.route('/ingredients')
  .get(db.getByIngredient, sendJSONresp)

spoon.route('/recipe')
  .get(db.getRecipeInfo, sendJSONresp)


module.exports = spoon;

