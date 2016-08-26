import React       from 'react';
import ajax        from '../helpers/ajaxAdapter.js'
const jwtDecode    = require('jwt-decode');
const cookItLogo   = require('../images/cookit.png')
const cookItLogoSm = require('../images/cookit-small.png')


export default class Header extends React.Component {

  handleSubmit(event){
  event.preventDefault()
  let signInForm = event.target
  let user = {
    username: event.target.username.value,
    password: event.target.password.value
  }
  ajax.loginUser(user).then( user => {
      localStorage.setItem('token', user.token)
      localStorage.setItem('user_id', jwtDecode(user.token).user_id)
      if(user.success){
        this.props.userLoggedIn()
      } else {
        signInForm.reset()
      }
    })
  }

  clearLocalStorage(event){
    localStorage.setItem('token','')
    localStorage.setItem('user','')
    console.log('did you clean the kitchen!?!?')
    this.props.userLoggedOut()
  }

  myRecipes(event){
    event.preventDefault()
    this.props.showUserRecipes()
    event.target.reset()
  }

  myPantry(event){
    event.preventDefault()
    console.log('my pantry')
  }

  render(){
    if(!this.props.user){
    return (
      <div className="header">
        <div className='login'>
          <form action="post" className="signIn" onSubmit={this.handleSubmit.bind(this)}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="username">username</label>
                  </td>
                  <td>
                    <label htmlFor="password">password</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="username" placeholder="enter username"/>
                  </td>
                  <td>
                    <input type="password" name="password" placeholder="enter password"/>
                  </td>
                  <td>
                    <button>Sign In</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <img className="logo" src={cookItLogo}/>
      </div>
    )
  } else {
    return (
      <div className="header">
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
        <img className="logo" src={cookItLogo}/>
      </div>
    )
  }
  }
}

