import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=> {
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)
  const [totalResults,setResults] = useState(0)


    //  In class component 
    useEffect(()=>{
        document.title = props.category + "-MyNewsApp"
        updateNews()

        // useEffect provide cleartimeout function to clear the call stack with corresponding function
        return () => clearTimeout(updateNews)

    },
    // In the below arry you can provide any variable, when the variable changes the useEffect run
    [])

    const updateNews=async() =>{
        props.setProgress(10)

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}`
        
        setLoading(true)
        // Fetching the newest news from corresponding page
        let data = await fetch(url)
        props.setProgress(40)
        // Convert the raw data to json using .json function
        let parsedData = await data.json()
        props.setProgress(70)

            setArticles(parsedData.articles)
            setResults(parsedData.totalResults)
            setLoading(false)


        props.setProgress(100)


        // }


    }
    // handlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${ page - 1}&pageSize=${props.pageSize}`
    //     // Updating the state variables,Note:-the setState is a callback function 
    //    setPage(page-1)



    // }

    // handleNextClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page + 1}&pageSize=${props.pageSize}`
    //     // Updating the state variables,Note:-the setState is a callback function 
    //   setPage(page+1)

    //     // console.log("The setState of render of method in next button "+ this.state.page)

    // }

    const fetchMoreData = async () => {
        // setState is a asynchronous funcion
        setPage(page +1)
        // console.log(page)

        console.log(page)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page+1}&pageSize=${props.pageSize}`

        let data = await fetch(url)

        let parsedData = await data.json()

        setArticles(articles.concat(parsedData.articles))
    }
        return (
            <>
                <div className="container my-4  px-4 py-4">
                    <h2 className="text-center news-h2">Top Headlines From: {props.category}</h2>
                    {loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<h4><Spinner /></h4>}
                    >

                        <div className="row">
                            {/* map is a higher order array method to iterate each element of an array and return the corresponding div tag of each element */}
                            {/* You should pass the unique key to the each element of the array  */}
                            {articles.map((element) => {
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
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={() => {
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
News.defaultProps = {
    country: 'in',
    page: 0,
    category: 'general',
}
// Setting up the proptypes datatypes of their corresponding variable
News.propTypes = {
    country: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
}

export default News
