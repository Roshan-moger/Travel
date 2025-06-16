"use client"
 
import { LogIn } from "lucide-react"
import { Link } from "react-router-dom"
 
export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
        {/* Register Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <LogIn className="w-6 h-6 text-gray-600" />
          </div>
        </div>
 
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">Create your account</h1>
 
        {/* Disabled Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Registration Currently Disabled</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  New user registration is temporarily disabled. Please contact support or use the existing login
                  credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Disabled Form */}
        <form className="space-y-6 opacity-50 pointer-events-none">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              disabled
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              disabled
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              disabled
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
 
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              disabled
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
 
          <button
            type="submit"
            disabled
            className="w-full bg-gray-400 text-white font-medium py-3 px-4 rounded-lg cursor-not-allowed"
          >
            Sign Up (Disabled)
          </button>
        </form>
 
        {/* Back to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}