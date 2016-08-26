import React      from 'react'


export default class Ingredients extends React.Component {
  storeInPantry(event){
    event.preventDefault();

  }

  render(){
    return (
      <div className="ingredients">
        <h3>Ingredients</h3>
          <div>
            <ul className="ingredients-list">
              {this.props.recipes.extendedIngredients
              .map((item,i)=>{
                return (

                  // <div key={i}>
                      <li key={i}><button className="list-group-item"

                      value={item.name}
                      onClick={this.props.addToPantry}>
                      {item.name}</button></li>
                  // </div>
                )
              })}
            </ul>
          </div>
      </div>
    )
  }
}
