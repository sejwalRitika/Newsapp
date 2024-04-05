import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem';
import Spinner from './Spinner';
const News = (props)=>{
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totalResults, setTotalResults] = useState(0)

const captionlizeFirstLetter = (string)=>{
return string.charAt(0).toUpperCase() + string.slice(1);
}
 
const UpdateNews = async ()=>{
props.setProgress(10);
const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=22fd9c4f1c6e4154a114dcd9ae4cde07&
page=${page}&pageSize=${props.pageSize}`;
setLoading (true)
let data = await fetch(url);
props.setProgress(30);
let parsedDate = await data.json()
props.setProgress(70);
setArticles(parsedDate.articles);
setTotalResults(parsedDate.totalResults);
setLoading(false)
props.setProgress(100);
}
useEffect(() => {
document. title=`${captionlizeFirstLetter(props.category)} - NewsMonkey`;
UpdateNews();
// eslint-disable-next-line
},[])


const fetchMoreData = async() => {
const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=22fd9c4f1c6e4154a114dcd9ae4cde07&
page=${page+1}&pageSize=${props.pageSize}`;
setPage(page+1)
let data = await fetch(url);
let parsedDate = await data.json()
setArticles(articles.concat(parsedDate.articles))
setTotalResults(parsedDate.totalResults)
  };
return(
<>
<h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}> NewsMonkey - Top {captionlizeFirstLetter(props.category)} Headlines</h1>
{loading &&<Spinner/>}
<InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
<div className="contanier">
<div className="row">
{articles.map((element)=>{
 return <div className='col-md-4' key={element.url}>
<NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}author={element.author} date={  element.publishedAt}source={element.source.name}/>
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
News.propsTypes = {
  country: PropTypes.string,
  pageSize : PropTypes.number,
  category: PropTypes.string,

}
export default News