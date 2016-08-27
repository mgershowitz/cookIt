import React      from 'react'
require('../images/cookit-small.png')

export default class SmallLogo extends React.Component {
  render(){

    return (
      <div className="smallHeader">
        <a href="/"><img className="smallLogo" src="../images/cookit-small.png"/></a>
        <div className='login'>
          <table className='signedIn'>
            <tbody>
              <tr>
                <td>
                  <button onClick={this.myRecipes.bind(this)}>My Recipes</button>
                </td>
                <td>
                  <button onClick={this.myPantry.bind(this)}>My Pantry</button>
                </td>
                <td>
                  <button onClick={this.clearLocalStorage.bind(this)}>Log Out</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
