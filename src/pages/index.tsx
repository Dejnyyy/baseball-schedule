import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: 'Nunito, sans-serif' }} // Ensure Nunito is imported/loaded via your globals or head
    >
      {/* Junior Varsity Side - Dark Gray with White Text */}
      <Link
        href="/jv"
        className="flex items-center justify-center w-1/2 h-screen rounded-l-none bg-gray-800 text-white transition-all hover:bg-gray-900 rounded-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">JV</h1>
          <p className="text-2xl">JV Schedule</p>
        </div>
      </Link>

      {/* Varsity Side - Light Gray with Black Text */}
      <Link
        href="/varsity"
        className="flex items-center justify-center w-1/2 h-screen rounded-r-none bg-gray-200 text-black transition-all hover:bg-gray-300 rounded-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Varsity</h1>
          <p className="text-2xl">Varsity Schedule</p>
        </div>
      </Link>
      <div className='absolute right-4 bottom-4 font-bold  text-2xl text-center text-green-500 z-20'><Link href={"https://dejny.eu"} target='_blank'><p>Dejny.eu</p></Link></div>

    </div>
  )
}
