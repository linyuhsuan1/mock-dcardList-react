import React from 'react';
const PostItem = ({postTitle,postExcerpt,onClick})=>{
  return (
      <div onClick={onClick}>
         <div className="block w-full max-w-2xl p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{postTitle}</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">{postExcerpt}</p>
        </div>
      </div>
      
  )
}


export default PostItem;
