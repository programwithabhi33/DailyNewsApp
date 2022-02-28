import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {

        // Object destructing in render function 
        let {url} = this.props;
        return (
            <div>
                <ddddiv className="card my-4 mx-4" style={{width: "18rem"}}>
                    <img src={url} className="card-img-top" alt="..." />
                    <div className="card-body text-center">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="/" className="btn  btn-sm btn-primary">Read More</a>
                    </div>
                </ddddiv>
        </div>
        )
    }
}

export default NewsItem
