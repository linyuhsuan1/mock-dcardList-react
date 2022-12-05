import React, { useState, useRef, useCallback } from 'react';
import { FixedSizeList as List } from "react-window";
import './App.css';
import PostItem from './components/PostItem/PostItem';
import Loading from './components/LoadingView/Loading';
import axios from 'axios';
import useFetchPost from './hook/useFetchPost';
import { SINGLE_POSTS_URL } from './constant/api';
function App() {
  const [lastId, setLastId] = useState();
  const { posts, error, loading } = useFetchPost(lastId);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [postData, setPostData] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  const lastPostRef = useCallback(node1 => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(([entries]) => {
      console.log('current', entries)
      if (entries.isIntersecting) {
        setLastId(node1.dataset.id);
      }
    })
    if (node1) observer.current.observe(node1)

  }, [lastId])

  const postOpenHandler = (postId) => {

    axios.get(SINGLE_POSTS_URL + postId)
      .then((res) => {
        console.log('get post res', res.data)
        setPostData(res.data)
        setModalIsOpen(true);
      })

    setModalPostId(postId);
  }
  return (
    <div>
      <List
        className="List"
        height={window.innerHeight}
        width={window.innerWidth}
        itemCount={posts.length}
        itemSize={250}
        itemData={posts}
      >
        {({ index, style }) => {
          if (posts.length === index + 1) { //需取得上一批取的的文章的最後一個ID, 再去取下一批
            return <div style={style} ref={lastPostRef} data-id={posts[index].id}>
              <PostItem
                key={index}
                postTitle={posts[index].title}
                postExcerpt={posts[index].excerpt}
                onClick={() => {
                  postOpenHandler(posts[index].id);
                }}
              />
              {loading ? <Loading /> : null}
              {error ? <div>posts fail...</div> : null}
            </div>
          } else {
            return <div style={style}>
              <PostItem
                key={index}
                postTitle={posts[index].title}
                postExcerpt={posts[index].excerpt}
                onClick={() => {
                  postOpenHandler(posts[index].id);
                }}
              />
            </div>
          }
        }}
      </List>
      {
        modalIsOpen ? (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative w-auto max-w-3xl mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
                    <h3 className="text-3xl font-semibold">{postData.title}</h3>
                    <button
                      className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                      onClick={() => setShowModal(false)}>
                      <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">×</span>
                    </button>
                  </div>
                  <div className="relative flex-auto p-6">
                    <p className="my-4 text-lg leading-relaxed text-slate-500">{postData.content}</p>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                    <button
                      className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                      type="button"
                      onClick={() => setModalIsOpen(false)}>
                      Close
                    </button>
                    <button
                      className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                      type="button"
                      onClick={() => setModalIsOpen(false)}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null
      }

    </div>
  );

}

export default App;


