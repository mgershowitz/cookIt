'use strict'
const request = require('request')
const apikey= process.env.key;

module.exports = {

  getByCuisine(req,res,next) {
    request({
      url:'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
      method:'get',
      headers: {
        "X-Mashape-Key": apikey
      },
      qs: {cuisine: req.query.c},
      json:true
    }
    ,(err,result,body)=>{
      if (err) throw err;
      res.rows = result.body.results
      console.log("the cuisine results: ", res.rows)
      next()
    })
  },

  getByIngredient(req,res,next) {
    request({
      url:'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients',
      method:'get',
      headers: {
        "X-Mashape-Key": apikey
      },
      qs: {
        ingredients: req.query.i,
        number: 12
      },
      json:true
    }
    ,(err,result,body)=>{
      if (err) throw err;
      res.rows = result.body
      console.log("the cuisine results: ", res.rows)
      next()
    })
  },

  getRecipeInfo(req,res,next) {
    request({
      url:`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${req.query.recipe}/information`,
      method:'get',
      headers: {
        "X-Mashape-Key": apikey
      },
      json:true
    }
    ,(err,result,body)=>{
      if (err) throw err;
      res.rows = result.body
      console.log("the cuisine results: ", res.rows)
      next()
    })
  }
}





