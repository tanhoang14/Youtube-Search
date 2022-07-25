import '../Youtube/YoutubeSearch.scss'
import { useState,useEffect } from 'react'
import axios from 'axios';
import moment from 'moment'
import {FaSearch} from 'react-icons/fa'
import Logo from '../style/logo_size.jpg'
const YoutubeSearch = () => {
    const [videos,setVideos] = useState();
    const [query, setQuery] = useState('');
    useEffect (()=>{

    }, [])
    const handleSearchYoutube = async () => {
        let res = await axios({
            "method": "GET",
            "url": 'https://www.googleapis.com/youtube/v3/search',
            "params":{
                'part':'snippet',
                'maxResults':'20',
                'key':'AIzaSyCUJXT1_AyVYE_5omJVW7Df0BYVIq-PLBA',
                'type':'video',
                'q':query
            }
        })
        if(res.data && res.data.items){
            let raw = res.data.items;
            if(raw && raw.length > 0){
                let result = [];
                raw.map(item =>{
                    let object = {};
                    object.id = item.id.videoId
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.publishedAt
                    object.author = item.snippet.channelTitle
                    object.desription = item.snippet.desription

                result.push(object)
                })
                setVideos(result)
            }
        }
}
    return(
        <div className="youtube-search-container">
            <img className='logo' src={Logo} alt=""/>
            <div className="yt-search">
                <input type="text" placeholder='Search' 
                    value ={query}
                    onChange= {(event) => setQuery(event.target.value)}
                />
                <button type="button" onClick={handleSearchYoutube}><FaSearch size="1.4rem" color='white'/></button> 
            </div>

            {videos && videos.length >0 &&
            
            videos.map(item =>{
                return(
                <div className="yt-result" key ={item.id}>
                    <div className="left">
                        <iframe className='ifram-yt'
                            src={`https://www.youtube.com/embed/${item.id}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
    
                        </iframe>
                    </div>
                    <div className="right">
                        <div className="title">
                            {item.title}
                        </div>
                        <div className="create-at">
                            Created At : {moment(item.createdAt).format('MM-DD-YYYY: mm:ss As')}
                        </div>
                        <div className="author">
                            Author: {item.author}
                        </div>
                        <div className="description">
                            {item.desription}
                        </div>
                    </div>
                </div>
                )
            })
            }
      
        </div>
    )
}
export default YoutubeSearch