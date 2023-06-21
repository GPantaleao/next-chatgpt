"use client"

import { Comment } from  'react-loader-spinner'

export default function Loading() {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-white space-y-2">
    <Comment
      visible={true}
      height="80"
      width="80"
      ariaLabel="comment-loading"
      wrapperStyle={{}}
      wrapperClass="comment-wrapper"
      color="#fff"
      backgroundColor="#11A37F"
    />
    <p className="font-medium text-lg">Loading Messages...</p>
  </div>
  )
}
