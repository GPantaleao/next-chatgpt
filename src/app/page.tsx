"use client"

import { Sun, Warning, Lightning } from '@phosphor-icons/react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-6xl font-bold mb-20">ChatGPT</h1>
      
      <div className='flex space-x-2 text-center'>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <Sun size={32}/>
            <h2>Examples</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Explain Something To me&quot;</p>
            <p className="infoText">&quot;Explain Something To me&quot;</p>
            <p className="infoText">&quot;Explain Something To me&quot;</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <Lightning size={32}/>
            <h2>Capabilities</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Explain Something To me&quot;</p>
            <p className="infoText">&quot;Explain Something To me&quot;</p>
            <p className="infoText">&quot;Explain Something To me&quot;</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <Warning size={32}/>
            <h2>Limitations</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">&quot;Explain Something To me&quot;</p>
            <p className="infoText">&quot;Explain Something To me&quot;</p>
            <p className="infoText">&quot;Explain Something To me&quot;</p>
          </div>
        </div>
      </div>
    </div>
  )
}
