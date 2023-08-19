const NewsItem =(props)=>{
    
        let {title, description, imageUrl, newsUrl, author, date} = props;
        return (
            <div className="my-3">
                <div className="card">
                <img src={!imageUrl?"https://www.shutterstock.com/image-vector/news-background-world-map-backdrop-260nw-691718833.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary"><b>By</b> {author} <b>on</b> {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
    
export default NewsItem