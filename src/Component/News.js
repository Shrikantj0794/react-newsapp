import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults:0
  }
  document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`
}
async UpdateNews(){
  this.props.setProgress(10); //top loading bar
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b96566c5a8b841149901e9c44d00e809&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData = await data.json()
  this.props.setProgress(60);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
  })
    this.props.setProgress(100);
}

// componentDidMount used for featching api
async componentDidMount(){ 
    this.UpdateNews();
}

handlePrevClick = async ()=>{
    this.setState({page: this.state.page-1})
    this.UpdateNews();
}

handleNextClick = async ()=>{ 
    this.setState({page: this.state.page+1})
    this.UpdateNews();
}
fetchMoreData = async() => {
  setTimeout (async()=>{ 
    this.setState({page:this.state.page+1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b96566c5a8b841149901e9c44d00e809&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData); 
  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
    totalResults: parsedData.totalResults,
    })
  },500);
  
};

render() { 
  return (
        <>
          <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsApp - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">

                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>

            </>
        )
    }
}
     
  export default News