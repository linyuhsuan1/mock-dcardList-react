
import React from 'react';

const Loading= () => {

    return(
        <div className="w-full max-w-xl p-4 mx-auto">
        <div className="flex space-x-4 animate-pulse">
          <div className="flex-1 py-1 space-y-4">
            <div className="w-3/4 h-4 bg-blue-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-200 rounded"></div>
              <div className="w-5/6 h-4 bg-blue-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Loading;
