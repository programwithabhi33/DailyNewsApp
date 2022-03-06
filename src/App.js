import {useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const  App =()=> {
  const [progress,setProgress] =useState(0)


    const api_key=process.env.REACT_APP_API_KEY;
    const pageSize=6;
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#ff0303'
        progress={progress}
        />
        <Navbar/>
          <Routes>
            {/* exact means the url path match to the exact path */}
            {/* /user --> when the endpoint is not defined on your path and exact is not set then react will match the /user/id or elsewhere start with /user/something */}

            {/* When you render a same element in diffierent Route react is not updating the component because react by default knows that this component is already in the dom so why i readd the component,to bypass the behaviour you must pass the unique key to component that means react load the corresponding component because react sees that key is diffierent than previous component  */}
            <Route exact path='/' element={<News setProgress={setProgress}  key="general" pageSize={pageSize} api_key={api_key} country='in' category="General" />} />
            <Route exact path='/business' element={<News setProgress={setProgress}  key="business" pageSize={pageSize} api_key={api_key} country='in' category="Business"/>} />
            <Route exact path='/science' element={<News setProgress={setProgress}  key="science" pageSize={pageSize} api_key={api_key} country='in' category="Science"/>} />
            <Route exact path='/sports' element={<News setProgress={setProgress}  key="sports" pageSize={pageSize} api_key={api_key} country='in' category="Sports"/>} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress}  key="entertainment" pageSize={pageSize} api_key={api_key} country='in' category="Entertainment"/>} />
             <Route exact path='/technology' element={<News setProgress={setProgress}  key="technology" pageSize={pageSize} api_key={api_key} country='in' category="Technology"/>} />
            <Route exact path='/health' element={<News setProgress={setProgress}  key="health" pageSize={pageSize} api_key={api_key} country='in' category="Health"/>} />
          </Routes> 
        </Router>
        
      </div>
    )
  }

export default App
