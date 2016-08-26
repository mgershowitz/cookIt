const ajaxAdapter = {

 constructor(fetch){
    if(!fetch) throw "We need the Fetch library to make this work, bru.";
  },

  createUser(newUser){
    return fetch('/api/users',{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newUser)
    })
    .then( r=> r.json() )
  },

  getUserPantry() {
    return fetch('/pantry')
    .then(res=>res.json())
  }

  addPantry(item){
    console.log(item)
    return fetch('/pantry',{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(item)
    })
    .then( r=> r.json() )
  },

  deletePantry(item){
    return fetch('/pantry',{
      method:'DELETE',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(item)
    })
    .then( r=> console.log(r) )
  },

  cuisineCall(cuisine) {
    return fetch(`/spoon/cuisine?c=${cuisine}`)
    .then(res => res.json() )
  },

  ingredientsCall(ingredients) {
    return fetch(`/spoon/ingredients?i=${ingredients.replace(/\s/,'%2C')}`)
    .then(res => res.json() )
  },

  recipeCall(query) {
    return fetch(`spoon/recipe?recipe=${query}`)
    .then(res => res.json() )
  },


}


export default ajaxAdapter;


