const _db     = require('./connection');

module.exports = {
  getPantryItems(req,res,next) {
    let uID = parseInt(req.params.id)
    _db.any(`SELECT ingredient_name
            FROM users
            JOIN pantry_items
            ON pantry_items.user_reference=users.user_id
            WHERE users.user_id=$1;`, [uID])
       .then( pantry_item => {
        res.rows = pantry_item;
        console.log(pantry_item)
        next()
       })
       .catch( error => {
        console.error('Error', error)
       })
  },

  addPantryItem(req,res,next) {
    console.log('=====', req.body)
    let uID = parseInt(req.params.id)
    console.log(uID)
    _db.one(
      `INSERT INTO
      pantry_items (user_reference, ingredient_name)
      VALUES ($1, $2)
      returning *;`, [uID, req.body.item]
    )
    .then(pantry_items => {
      console.log('Added pantry_items successfully');
      res.rows = pantry_items;
      next()
    })
    .catch(error =>{
      console.error('Error in ADDING pantry_items', req.body)
    })
  },

  updatePantryItem(req,res,next) {
    req.body.iID = Number.parseInt(req.params.item_id)
    _db.one(
      `UPDATE pantry_items
      SET ingredient_name = $/ingredient_name/
      WHERE items_id = $/iID/
      returning * ;`, req.body
    )
    .then(pantry_items => {
      console.log('Update pantry_items successfully');
      res.rows = pantry_items;
      next()
    })
    .catch(error =>{
      console.error('Error in Updating pantry_items', error)
    })
  },

  deletePantryItem(req,res,next) {
    let uID = parseInt(req.params.id)
    _db.none(
      `DELETE FROM pantry_items
      WHERE ingredient_name = $1
      AND user_reference = $2;`, [req.body.item, uID]
    )
    .then(() => {
      console.log('Deleted pantry_items successfully');
      next()
    })
    .catch(error =>{
      console.error('Error in DELETE pantry_items', error)
    })
  }
}


