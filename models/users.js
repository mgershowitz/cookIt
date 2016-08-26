const _db     = require('./connection');
const bcrypt  = require('bcrypt');
const salt    = bcrypt.genSaltSync(10);

const createSecure = (password)=>
  new Promise( (resolve,reject)=>
    bcrypt.genSalt( (err, salt)=>
      bcrypt.hash(password, salt, (err, hash)=>
        err? reject(err) : resolve(hash)
      )
    )
  )

module.exports = {
  listUsers(req,res,next) {
    _db.any(`SELECT * FROM users;`)
       .then( users => {
        res.users = users;
        next()
       })
       .catch( error => {
        console.error('Error', error)
       })
  },

  getUserByUsername( req, res, next ) {
    _db.one( `
      SELECT *
      FROM users
      WHERE username = $/username/;
      `, req.body )
      .then( user=>{

        if( bcrypt.compareSync( req.body.password, user.password_digest ) ){
          res.user = user;
        }else{
          res.error = true
        }
        next()

      })
      .catch( error=>{
        console.error( 'Error ', error );
        res.error = error
        next()
      })
  },

  createUser(req,res,next) {
    console.log('=====', req.body)
    createSecure(req.body.password)
     .then( hash=>{
        _db.one(`
          INSERT INTO users (username, email, password_digest)
          VALUES ($1, $2, $3)
          returning *;`,[req.body.username, req.body.email, hash]
        )
        .then( newUser=> {
          console.log(newUser)
          res.user = newUser;
          next()
        })
        .catch( err=> {
          console.log(err)
          next()
        })
      })
    },

  getFavoriteRecipes( req,res,next ) {
      let uID = parseInt(req.params.id)
      _db.any( `SELECT recipe_name, img_link
        FROM users
        JOIN favorite_recipes
        ON favorite_recipes.user_reference = users.user_id
        WHERE users.user_id = $1;`, [uID])
         .then( userEvents => {
          res.events = userEvents;
          next()
         } )
         .catch( error => {
          console.error( 'Error', error )
          res.error = error
          next()
         })
    },

  addFavoriteRecipes(req,res,next) {
      let uID = parseInt(req.params.id)
      _db.one(
        `INSERT INTO
        favorite_recipes (user_reference, recipe_id, recipe_name, recipe_url, img_link)
        VALUES ($1, $2, $3, $4, $5)
        returning *;`, [uID, req.body.recipe_id, req.body.recipe_name, req.body.recipe_url, req.body.img_link]
      )
      .then(saved_recipe => {
        res.rows = saved_events;
        next()
      })
      .catch(error =>{
        console.error('Error in ADDING recipe', req.body)
      })
    },


  deleteFavoriteRecipe(req,res,next) {
    let uID = parseInt(req.params.id)
    _db.none(
      `DELETE FROM favorite_recipes
      WHERE event_id = $1
      AND user_reference= $2;`, [req.body.recipe_id, uID]
    )
    .then(() => {
      next()
    })
    .catch(error =>{
      console.error('Error in DELETE', error)
    })
  }
}













