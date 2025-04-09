import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* JV side */}
      <div className="w-1/2 bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer flex justify-center items-center text-white text-2xl">
        <Link href="/jv">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Junior Varsity</h1>
            <p>Go to JV Schedule</p>
          </div>
        </Link>
      </div>
      
      {/* Varsity side */}
      <div className="w-1/2 bg-green-600 hover:bg-green-700 transition-colors cursor-pointer flex justify-center items-center text-white text-2xl">
        <Link href="/varsity">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Varsity</h1>
            <p>Go to Varsity Schedule</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
