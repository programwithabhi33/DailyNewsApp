// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div abhiName="App">
//       <header abhiName="App-header">
//         <img src={logo} abhiName="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           abhiName="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >s
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {
  state={
    progress:0
  }
  setAbhi(){
    console.log("im the setAbhi function ")
    console.log(this.setState)
  }
   setProgress=(progress)=>{
    console.log("im the setProgress function ")
    console.log(this.setState)
    this.setState({
      progress:progress
    })
    this.setAbhi()
  }

 
  render() {
    let api_key=process.env.REACT_APP_API_KEY;
    let pageSize=6;
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#ff0303'
        progress={this.state.progress}
        />
        <Navbar/>
          <Routes>
            {/* exact means the url path match to the exact path */}
            {/* /user --> when the endpoint is not defined on your path and exact is not set then react will match the /user/id or elsewhere start with /user/something */}

            {/* When you render a same element in diffierent Route react is not updating the component because react by default knows that this component is already in the dom so why i readd the component,to bypass the behaviour you must pass the unique key to component that means react load the corresponding component because react sees that key is diffierent than previous component  */}
            <Route exact path='/' element={<News setProgress={this.setProgress}  key="general" pageSize={pageSize} api_key={api_key} country='in' category="General" />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress}  key="business" pageSize={pageSize} api_key={api_key} country='in' category="Business"/>} />
            <Route exact path='/science' element={<News setProgress={this.setProgress}  key="science" pageSize={pageSize} api_key={api_key} country='in' category="Science"/>} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress}  key="sports" pageSize={pageSize} api_key={api_key} country='in' category="Sports"/>} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress}  key="entertainment" pageSize={pageSize} api_key={api_key} country='in' category="Entertainment"/>} />
             <Route exact path='/technology' element={<News setProgress={this.setProgress}  key="technology" pageSize={pageSize} api_key={api_key} country='in' category="Technology"/>} />
            <Route exact path='/health' element={<News setProgress={this.setProgress}  key="health" pageSize={pageSize} api_key={api_key} country='in' category="Health"/>} />
          </Routes> 
        </Router>
        
      </div>
    )
  }
}

export default App
