import React       from 'react';
import ajax        from '../helpers/ajaxAdapter.js'
const jwtDecode    = require('jwt-decode');
const cookItLogo   = require('../images/cookit.png')
const cookItLogoSm = require('../images/cookit-small.png')

export default class Header extends React.Component {
  render(){

    return (
      <div className="header">
        <a href="/"><img className="logo" src="../images/cookit.png"/></a>
      </div>
    )
  }
}
//////////////////Small Logo////////////////////////
    // return (
    //   <div className="smallHeader">
    //     <a href="/"><img className="smallLogo" src="../images/cookit-small.png"/></a>
    //   </div>
    // )



/////////////////Header From FlakeBot///////////////

export default class Header extends React.Component {
  handleSubmit(event){
  event.preventDefault()
  let thing = event.target
  let user = {
    username: event.target.username.value,
    password: event.target.password.value
  }
  ajax.loginUser(user).then( user => {
      console.log(user)
      localStorage.setItem('token', user.token)
      localStorage.setItem('user_id', jwtDecode(user.token).user_id)
      console.log(jwtDecode(user.token).user_id)
      if(user.success){
        this.props.userLoggedIn()
      } else {
        thing.reset()
      }
    }
    )
  }

  bro(event){
    event.preventDefault()
    ajax.flakeBot(localStorage.user_id);
    this.props.onAddAlert()
  }

  clearLocalStorage(event){
    localStorage.setItem('token','')
    localStorage.setItem('user','')
    console.log('brah!? you leavin?')
    this.props.userLoggedOut()
  }

  myEvents(event){
    event.preventDefault()
    this.props.showUserEvents()
    event.target.reset()
  }

  render(){
    if(!this.props.user){
    return (
      <div className="header">
        <h1>FlakeBot</h1>
        <img className="fBNoUser" src="http://www.videogamesprites.net/Earthbound/Party/Ness/Ness%20(Robot)%20-%20Walk%20(SW).gif" alt=""/>
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
      </div>
    )
  } else {
    return (
      <div className="headerUser">
        <h1>FlakeBot</h1>
        <img className="fBUser" src="http://www.videogamesprites.net/Earthbound/Party/Ness/Ness%20(Robot)%20(Front).gif" alt=""/>

          <table className='signedIn'>
            <tbody>
              <tr>
                <td>
                  <button onClick={this.bro.bind(this)}>Talk to FlakeBot</button>
                </td>
                <td>
                  <button onClick={this.myEvents.bind(this)}>My Events</button>
                </td>
                <td>
                  <button onClick={this.clearLocalStorage.bind(this)}>Log Out</button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    )
  }
  }
}

