import React from 'react'

function TestComponent() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">Test Component</h1>
        <p className="mt-4 text-gray-600">If you can see this styled with Tailwind CSS, everything is working!</p>
      </div>
    </div>
  )
}

export default TestComponent