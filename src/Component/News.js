import React, {useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  //document.title = `NewsApp - ${this.capitalizeFirstLetter(props.category)}`
  
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const UpdateNews = async()=>{
  props.setProgress(10); //top loading bar
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b96566c5a8b841149901e9c44d00e809&page=${this.state.page}&pageSize=${props.pageSize}`;
  this.setState({loading: true});let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json()
  props.setProgress(60);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading: false,
  })
    props.setProgress(100);
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
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b96566c5a8b841149901e9c44d00e809&page=${this.state.page}&pageSize=${props.pageSize}`;
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
          <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsApp - Top {this.capitalizeFirstLetter(props.category)} Headlines</h1>
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
     
News.defaultProps = {
  country: 'in',
  pageSize: 8, 
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number, 
  category: PropTypes.string,
}
  export default News