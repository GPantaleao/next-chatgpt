"use client"

import { AppContext } from '@/context/AppContext'
import { Sun, Warning, Lightning, SidebarSimple } from '@phosphor-icons/react'
import { useContext } from 'react'

export default function Home() {
  const { isMobile, setIsHeaderOpen, isHeaderOpen } = useContext(AppContext)
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white relative max-w-full flex-1 overflow-hidden transition-all">
      <div
        className={`top-4 left-4 p-3 text-sm rounded-md border-gray-500 border hover:bg-gray-600/70 cursor-pointer text-gray-300 transition-colors ${isHeaderOpen ? "hidden" : "absolute"} transition-all`}
        title="Show Sidebar"
        onClick={() => setIsHeaderOpen(!isHeaderOpen)}
      >
        <SidebarSimple size={20} />
      </div>
      <h1 className="text-6xl font-bold mb-20">ChatGPT</h1>
      
      <div className='flex space-x-2 text-center'>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <Sun size={32}/>
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;How do I make an HTTP request in Javascript?&quot;</p>
            <p className="infoText">&quot;Explain quantum computing in simple terms&quot;</p>
            <p className={`infoText ${isMobile && 'hidden' }`}>&quot;Methods to help and prevent global warming&quot;</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <Lightning size={32}/>
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Remembers what user said earlier in the conversation&quot;</p>
            <p className="infoText">&quot;Allows user to provide follow-up corrections&quot;</p>
            <p className={`infoText ${isMobile && 'hidden' }`}>&quot;Trained to decline inappropriate requests&quot;</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <Warning size={32}/>
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;May occasionally generate incorrect information&quot;</p>
            <p className="infoText">&quot;May occasionally produce harmful instructions or biased content&quot;</p>
            <p className={`infoText ${isMobile && 'hidden' }`}>&quot;Limited knowledge of world and events after 2021&quot;</p>
          </div>
        </div>
      </div>
    </div>
  )
}
