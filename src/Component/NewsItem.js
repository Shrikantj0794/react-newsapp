import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, ImgUrl, newsUrl}= this.props;
    return (
      <div>
        <div className="card" style={{width: "20rem"}}>
        <img src={ImgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-dark btn-sm">Read More</a>
        </div>
        </div>
        </div>
    )
  }
}

export default NewsItem
