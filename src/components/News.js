import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
     
    // Setting up the default propstypes if the props doesn't pass
    static defaultProps={
        country:'in',
        page:1,
        category:'general',
    }
    // Setting up the proptypes datatypes of their corresponding variable
    static propTypes={
        country:PropTypes.string.isRequired,
        page:PropTypes.number.isRequired,
        category:PropTypes.string.isRequired,
    }

    // Creating class constructor
    constructor() {
        // Calling the parent class constructor
        super()
        // console.log("Im the news.js constructor")

        // Defining the states and you can update state using this.setState 
        this.state = {
            articles: [],
            loading: false,
            page: 0,
        }
        console.log(this.state.articles)
    }


    async componentDidMount() {
        this.updateNews()

    }
    
    async updateNews(){
         // This is condition for the pagination,it can handle the last page and do not fecth the non-existing pages when user clicking the next button by default we aslo  handled the next button disabled when the last page occur
         if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            console.log("If condition fired")
            // console.log(this.state.page)
            // Defining the page variable
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            // console.log(url)

            this.setState({ loading: true })
            // Fetching the newest news from corresponding page
            let data = await fetch(url)

            // Convert the raw data to json using .json function
            let parsedData = await data.json()

            // Set the this.state.articles to the newest articles of corresponding page
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
            console.log("this is the total results "+this.state.totalResults)
        }
       
        
    }
    handlePrevClick = async () => {
        this.updateNews()

        // Updating the state variables,Note:-the setState is a callback function 
        this.setState({
            page: this.state.page -1,
        }, () => {
            console.log("The setState of next function is fired")
        })
        

    }

    handleNextClick = async () => {
        this.updateNews()
       
        // Updating the state variables,Note:-the setState is a callback function 
        this.setState({
            page: this.state.page + 1,
        }, () => {
            console.log("The setState of next function is fired")
        })
       
    }



    render() {
        return (
            <>
                <div className="container my-4  px-4 py-4">
                    <h2 className="text-center">Welcome To The MyNewsApp - Grab the latest news here :</h2>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {/* map is a higher order array method to iterate each element of an array and return the corresponding div tag of each element */}
                        {/* You should pass the unique key to the each element of the array  */}
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-6 col-lg-4" key={element.url}>
                                <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Prev</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News
