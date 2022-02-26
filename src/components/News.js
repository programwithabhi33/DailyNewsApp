import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  // Creating class constructor
  constructor(){
    // Calling the parent class constructor
    super()
    console.log("Im the news.js constructor")
}
  render() {
    return (
      <div className="container my-4 bg-danger px-4 py-4">
        <h2>Welcome To The MyNewsApp - Grab the latest news here :</h2>
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <NewsItem url="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/976a59b09e0e681e692bd7517498e3f2.jpg" />
          </div>
          <div className="col-md-6 col-lg-4">
            <NewsItem url="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/976a59b09e0e681e692bd7517498e3f2.jpg" />
          </div>
          <div className="col-md-6 col-lg-4">
            <NewsItem url="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/976a59b09e0e681e692bd7517498e3f2.jpg" />
          </div>
        </div>
      </div>
    )
  }
}

export default News
