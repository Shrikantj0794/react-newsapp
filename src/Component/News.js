import React, {useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  //document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`
  
  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const UpdateNews = async(props)=>{
  props.setProgress(10); //top loading bar
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b96566c5a8b841149901e9c44d00e809&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json()
  props.setProgress(60)
  setArticles(parsedData.articles)
  setTotalResults(parsedData.totalResults)
  setLoading(false)
  props.setProgress(100);
}

useEffect(() => {
  UpdateNews();
},)
const handlePrevClick = async ()=>{
    setPage(page-1)
    UpdateNews();
}

const handleNextClick = async ()=>{ 
    setPage(page+1)
    UpdateNews();
}
const fetchMoreData = async(props) => {
  setTimeout (async()=>{ 
    setPage(page+1)
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b96566c5a8b841149901e9c44d00e809&page=${page}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
  },500);
  
};

  return (
        <>
          <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner />}
          <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">

                    <div className="row">
                        {articles.map((element) => {
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