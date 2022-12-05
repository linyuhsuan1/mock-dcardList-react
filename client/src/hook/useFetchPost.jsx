import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { POPULAR_POSTS_URL, API_POST_LIMIT } from '../constant/api';

const useFetchPost=(lastId)=>{
    const [posts,setPosts]= useState([]);
    const [error, setError] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setError(false);
        setLoading(true);
        if (lastId) {
            setTimeout(() => {
              axios.get(POPULAR_POSTS_URL + '&limit=' + API_POST_LIMIT + '&before=' + lastId)
                .then((result) => {
                    setPosts(oldPosts => {
                        return [...oldPosts, ...result.data]
                    });	
                    setLoading(false);
                })
                .catch(() => {
                  setError(true);
                })
            }, 800)
          }else{
            axios.get(POPULAR_POSTS_URL + '&limit=' + API_POST_LIMIT)
            .then((result) => {
              setPosts(result.data);
              setLoading(false);
            })
            .catch(() => {
              setError(true);
            })
          }
    },[lastId])
    return {posts, error, loading}
}
export default  useFetchPost;
