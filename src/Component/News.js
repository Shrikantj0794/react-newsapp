import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
constructor(){
  super();
  this.state={
    articles: [],
    loading: false,
    page:1
  }
}

 async componentDidMount(){
  let url ='https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b96566c5a8b841149901e9c44d00e809&page=1&pageSize=20'
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }
  //class function
  handlePrevClick=async()=>{
    console.log('prev')
    let url =`https://newsapi.org/v2/top-headlines?country=us&categor=business&apiKey=b96566c5a8b841149901e9c44d00e809&page=${this.state.page-1}&pageSize=20`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles
    })
  }
   handleNextClick=async()=>{
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){
      console.log('end')
    }
    else{
    console.log('Next')
    let url =`https://newsapi.org/v2/top-headlines?country=us&categor=business&apiKey=b96566c5a8b841149901e9c44d00e809&page=${this.state.page+1}&pageSize=20`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles
    })
    }
}
  render() {
    return (
      <div>
        <div className="container my-3 ">
            <h2>Todays News - Top Headlines</h2>
            <div className="row ">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4 d-flex justify-content-between" key={element.url} >
              <NewsItem title={element.title?element.title.slice(0,45): ''} description={element.description?element.description.slice(0,88):''} ImgUrl={element.urlToImage?element.urlToImage:'https://www.middleweb.com/wp-content/uploads/2017/08/breaking-news-blue-600.jpg'}newsUrl={element.url}/>
              </div>
            })}
            </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
