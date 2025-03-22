"use client"

import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                
                <span className="text-xl font-semibold text-gray-800">Algoviz</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/#features"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/#case-studies"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Case Studies
            </Link>
            <Link
              href="/#testimonials"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Testimonials
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/#features"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              How It Works
            </Link>
            <Link
              href="/#case-studies"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Case Studies
            </Link>
            <Link
              href="/#testimonials"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            >
              Testimonials
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
} 