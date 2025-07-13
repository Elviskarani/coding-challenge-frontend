// app/page.js (your main index page)
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Task Management Platform
        </h1>
        
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
            Proceed to Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}