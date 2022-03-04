import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    // Setting up the default propstypes if the props doesn't pass
    static defaultProps = {
        country: 'in',
        page: 0,
        category: 'general',
    }
    // Setting up the proptypes datatypes of their corresponding variable
    static propTypes = {
        country: PropTypes.string.isRequired,
        page: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
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
            page: 1,
            totalResults: 0
        }

    }



    async componentDidMount() {
        // Calling the updateNews function 
        // console.log("component didMount fired")
        this.updateNews()

    }

    async updateNews() {
        this.props.setProgress(10)
        // console.log("updateNews has been fired")
        // This is condition for the pagination,it can handle the last page and do not fecth the non-existing pages when user clicking the next button by default we aslo  handled the next button disabled when the last page occur
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        // console.log("If condition fired")
        // Defining the page variable
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true }
            , () => {
            })
        // Fetching the newest news from corresponding page
        let data = await fetch(url)
        this.props.setProgress(40)
        // Convert the raw data to json using .json function
        let parsedData = await data.json()
        this.props.setProgress(70)
        // Set the this.state.articles to the newest articles of corresponding page
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,

            // Here the page value in constructor is 0 and when the api fetch we pass the page +1 because it configure detct page variable as 0 and setState will is a asynchronous function    
        }, () => {
        })
        this.props.setProgress(100)


        // }


    }
    // handlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     // Updating the state variables,Note:-the setState is a callback function 
    //     this.setState({
    //         page: this.state.page - 1,
    //     }, () => {
    //         // console.log("The setState of render of method in previous button "+ this.state.page)
    //         this.updateNews(url)
    //     })



    // }

    // handleNextClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //     // Updating the state variables,Note:-the setState is a callback function 
    //     this.setState({
    //         page: this.state.page + 1,
    //     }, () => {

    //         // console.log(" In callback : The setState of render of method in next button "+ this.state.page)
    //         this.updateNews(url)
    //     })

    //     // console.log("The setState of render of method in next button "+ this.state.page)

    // }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            console.log("this is a callback function " + this.state.page)
        })
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`

        let data = await fetch(url)

        let parsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    }



    render() {
        // Here do not update the state variables 
        // Update state variables in returen
        // console.log("Render function fired")
        return (
            <>
                <div className="container my-4  px-4 py-4">
                    <h2 className="text-center">Top Headlines From: {this.props.category}</h2>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<h4><Spinner /></h4>}
                    >

                        <div className="row">
                            {/* map is a higher order array method to iterate each element of an array and return the corresponding div tag of each element */}
                            {/* You should pass the unique key to the each element of the array  */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-6 col-lg-4" key={element.url}>
                                    <NewsItem title={element.title} desc={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                            {/* {console.log("The infiniteScroll has been fired "+this.state.articles)} */}
                        </div>

                    </InfiniteScroll>

                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={() => {
                            // Updating the state variables,Note:-the setState is a callback function 
                            this.setState({
                                page: this.state.page - 1,
                            }, () => {

                                // console.log(" In callback : The setState of render of method in next button "+ this.state.page)
                                this.updateNews()
                            })
                        }}>&larr;Prev</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={() => {
                            // Updating the state variables,Note:-the setState is a callback function 
                            this.setState({
                                page: this.state.page + 1,
                            }, () => {

                                // console.log(" In callback : The setState of render of method in next button "+ this.state.page)
                                this.updateNews()
                            })
                        }}>Next&rarr;</button>
                    </div> */}
                </div>
            </>
        )
    }
}

export default News
