
import React            from 'react'
import Search           from './Search.jsx'
import Results          from './Results.jsx'
import ResultsSelected  from './ResultsSelected.jsx'
import ajax             from '../helpers/ajaxAdapter.js'
import util             from '../helpers/util.js'
import Ingredients      from './Ingredients.jsx'
import Pantry           from './Pantry.jsx'
import Login            from './Login.jsx'
import CreateUser       from './CreateUser.jsx'
import SmallLogo        from './SmallLogo.jsx'
import Header           from './Header.jsx'

export default class SearchContainer extends React.Component {

  constructor(){
    super();
    this.state = {
      dropdown:"cuisine",
      query: "",
      searched: false,
      results: [],
      ingredients: [],
      pantry: {},
      selected: false,
      user: true
    }
  }

   componentDidMount(){
    if(this.state.user){
      ajax.getUserPantry().then(pantry=>{
        this.setState({ pantry: pantry })
      })
    }
  }

  handleUpdateDrop(event){
    this.setState({
      dropdown: event.target.value,
    })
  }

  handleUpdateSearch(event){
    this.setState({
      query: event.target.value
    })
  }

  handleSubmitSearch(event){
  event.preventDefault();
  if(this.state.dropdown ==="cuisine"){
    ajax.cuisineCall(this.state.query).then( cuisine =>{
      this.setState({
        results: cuisine,
        dropdown:this.state.dropdown,
        selected: false,
        query:"",
        searched: true
      })
    })
  }
  if(this.state.dropdown === "ingredient"){
    ajax.ingredientsCall(this.state.query).then( ingredient =>{
    this.setState({
      results: ingredient,
      dropdown: this.state.dropdown,
      query: "",
      searched: true
      })
    })
  }
}

  addToPantry(event){
    event.preventDefault();
    let item = {item:event.target.value}
    console.log()
    ajax.addPantry(item).then(pantry=>{
    ajax.pantryCall().then(pantry=>{
        this.setState({ pantry: pantry,
       })
    })})
  }

  deleteFromPantry(event){
    event.preventDefault();
    let item = {item: event.target.value}
    ajax.deletePantry(item).then(pantry=>{
      ajax.pantryCall().then(pantry=>{
        this.setState({pantry: pantry})
      })
    })
  }

 selectRecipe(event){
    event.preventDefault();
    console.log(event.target.alt)
    //ajax.secondCall(event.target.alt)
    ajax.recipeCall(event.target.alt)
    .then( cuisine =>{
      this.setState({
        results: cuisine,
        query: "",
        selected: true
      })
    })
  }

  userLogIn(){
    ajax.getMyPantry(localStorage.user_id).then( myPantry => {
      this.setState({
        pantry: myPantry,
        user:true,
      })
    })
  }

  userLogOut(){
    this.setState({
      dropdown:"cuisine",
      query: "",
      searched: false,
      results: [],
      ingredients: [],
      pantry: {},
      selected: false,
      user: false
    })
  }


  render(){
      if(this.state.searched&&this.state.selected){
      return (

          <div className="row">
            <SmallLogo />
            <div className="col-sm-4">
              <Ingredients
                addToPantry={this.addToPantry.bind(this)}
                recipes={this.state.results}
               />
            </div>

            <div className="col-sm-4">
              <ResultsSelected
              recipes={this.state.results}
              onSelectRecipe={this.selectRecipe.bind(this)}
              dropdown={this.state.dropdown}
              />
            </div>

            <div className="col-sm-4">
              <Pantry
                deletePantry={this.deleteFromPantry.bind(this)}
                pantry={this.state.pantry}
              />

            </div>
        </div>
        )

     } else if(this.state.searched){
      return (
          <div>
          <SmallLogo />
            <div>
            </div>
            <div>
              <Results
              recipes={this.state.results}
              onSelectRecipe={this.selectRecipe.bind(this)}
              dropdown={this.state.dropdown}
              />
            </div>
          </div>
        )
      } else {
      return(
        <div>
          <Header
          user={this.state.user}
          userLoggedIn={this.userLogIn.bind(this)}
          userLoggedOut={this.userLogOut.bind(this)} />
          <Search
          onUpdateSearch={this.handleUpdateSearch.bind(this)}
          onUpdateDrop={this.handleUpdateDrop.bind(this)}
          onSubmitSearch={this.handleSubmitSearch.bind(this)}
          query={this.state.query}
          />
          </div>
      )
    }
  }
}




