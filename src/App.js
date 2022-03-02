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

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export class App extends Component {
  render() {
    let api_key="a66d2f246de343bdaa7fc198e799cb2c";
    let pageSize=12;
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
            {/* exact means the url path match to the exact path */}
            {/* /user --> when the endpoint is not defined on your path and exact is not set then react will match the /user/id or elsewhere start with /user/something */}
            <Route exact path='/' element={<News key="general" pageSize={pageSize} api_key={api_key} country='in' category="general" />} />
            <Route exact path='/business' element={<News key="business" pageSize={pageSize} api_key={api_key} country='in' category="business"/>} />
            <Route exact path='/science' element={<News key="science" pageSize={pageSize} api_key={api_key} country='in' category="science"/>} />
            <Route exact path='/sports' element={<News key="sports" pageSize={pageSize} api_key={api_key} country='in' category="sports"/>} />
            <Route exact path='/entertainment' element={<News key="entertainment" pageSize={pageSize} api_key={api_key} country='in' category="entertainment"/>} />
             <Route exact path='/technology' element={<News key="technology" pageSize={pageSize} api_key={api_key} country='in' category="technology"/>} />
            <Route exact path='/health' element={<News key="health" pageSize={pageSize} api_key={api_key} country='in' category="health"/>} />
          </Routes> 
        </Router>
        
      </div>
    )
  }
}

export default App
