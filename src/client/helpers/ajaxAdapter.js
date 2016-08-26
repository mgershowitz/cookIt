const ajaxAdapter = {

 constructor(fetch){
    if(!fetch) throw "how can we fetch without fetch!?!?";
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

  loginUser(user){
    return fetch('/api/authenticate',{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8",
        "authorization": ["Bearer",localStorage.token]
      },
      body: JSON.stringify(user)
    })
    .then( r => r.json())
  },

  getUserPantry(id) {
    return fetch(`/pantry/${id}`)
    .then(res=>res.json())
  },

  addPantry(item){
    console.log(item)
    return fetch(`/pantry/${localStorage.user_id}`,{
      method:'POST',
      headers:{
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(item)
    })
    .then( r=> r.json() )
  },

  deletePantry(item){
    return fetch(`/pantry/${localStorage.user_id}`,{
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
  }


}


export default ajaxAdapter;


