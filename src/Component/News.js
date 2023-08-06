import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  render() {
    return (
      <div>
        <div className="container my-3">
            <h2>Todays News - Top Headlines</h2>
            <div className="row">
                <div className="col-md-4">
                <NewsItem title='myTitle' description='myDesc'/>
                </div>
                <div className="col-md-4">
                <NewsItem title='myTitle' description='myDesc'/>
                </div>
                <div className="col-md-4">
                <NewsItem title='myTitle' description='myDesc'/>
                </div>
            </div>
        </div>
        
      </div>
    )
  }
}

export default News
