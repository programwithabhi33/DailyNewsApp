import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    // Creating class constructor
    constructor() {
        // Calling the parent class constructor
        super()
        // console.log("Im the news.js constructor")

        // Defining the states and you can update state using this.setState 
        this.state={
            articles: [],
            loading: false,
            page:1,
        }
    }

    handlePrevClick = async()=>{
        console.log("Clicked on prev button")
        this.setState({
            page:this.state.page - 1,
        },()=>{
            console.log("The setState of previousbutton has been fired")
        })
        // console.log(this.state.page)
        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0999a3231b141b1b329829440e0fe68&page=${this.state.page-1}`
        console.log(url)

        let data = await fetch(url)
        
        let parsedData = await data.json()
        
        this.setState({articles:parsedData.articles})

    }

    handleNextClick = async()=>{
        if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){
         console.log("If condition fired")
        }
        else{
         console.log("Else condition fired")   
        console.log("Clicked on Next button")
        this.setState({
            page:this.state.page + 1,
        },()=>{
            console.log("The setState of next function is fired")
        })
        // console.log(this.state.page)

        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0999a3231b141b1b329829440e0fe68&page=${this.state.page+1}`
        console.log(url)
        
        let data = await fetch(url)
        
        let parsedData = await data.json()

        this.setState({articles:parsedData.articles})
    }

    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0999a3231b141b1b329829440e0fe68&page=${this.state.page}`
        // console.log(url)
        
        // Fetching the url using fetch api
        let data = await fetch(url)

        // Parsing the incoming data using .json() function,fetch api return raw data so you can parse the data using .json function
        let parsedData = await data.json()
        // console.log(parsedData)

        // Updating the this.articles class variable using setState function 
        this.setState({articles: parsedData.articles,totalResults:parsedData.totalResults})
        // console.log(this.articles)
        // console.log(this.articles)
        
    }
    


    render() {
        return (
            <div className="container my-4  px-4 py-4">
                <h2>Welcome To The MyNewsApp - Grab the latest news here :</h2>
                <div className="row">
                    {/* map is a higher order array method to iterate each element of an array and return the corresponding div tag of each element */}
                    {/* You should pass the unique key to the each element of the array  */}
                    {this.state.articles.map((element)=> {
                        return <div className="col-md-6 col-lg-4" key={element.url}>
                            <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} url={element.url}/>
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Prev</button>
                    <button disabled={this.state.page>1} className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
