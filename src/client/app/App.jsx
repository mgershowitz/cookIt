import React              from 'react'
import ReactDOM           from 'react-dom'
import SearchContainer    from './SearchContainer.jsx'
import Footer             from './Footer.jsx'


export default class App extends React.Component{


    render(){
        return(
          <container>
              <div>
              <SearchContainer />
              <Footer />
              </div>
          </container>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#container'))
