"use client"

import Link from 'next/link'
import { 
  ArrowRight,
  Code2,
  Brain,
  Zap,
  BarChart3,
  Trees,
  Network,
  List
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { useAuth } from '@/contexts/AuthContext'

const features = [
  {
    name: 'Sorting Algorithms',
    description: 'Visualize various sorting algorithms like Bubble Sort, Quick Sort, and Merge Sort with step-by-step animations.',
    icon: BarChart3,
    href: '/dashboard/sorting',
  },
  {
    name: 'Tree Structures',
    description: 'Explore binary trees, add/remove nodes, and see different traversal methods in action.',
    icon: Trees,
    href: '/dashboard/trees',
  },
  {
    name: 'Graph Algorithms',
    description: 'Learn about graph traversal algorithms like DFS and BFS with interactive visualizations.',
    icon: Network,
    href: '/dashboard/graphs',
  },
  {
    name: 'Array Operations',
    description: 'Understand array operations and manipulations with visual representations.',
    icon: List,
    href: '/dashboard/arrays',
  },
]

const benefits = [
  {
    name: 'Interactive Learning',
    description: 'Learn data structures and algorithms through hands-on visualization and interaction.',
    icon: Brain,
  },
  {
    name: 'Step-by-Step Visualization',
    description: 'Watch algorithms unfold in real-time with detailed step-by-step animations.',
    icon: Code2,
  },
  {
    name: 'Performance Insights',
    description: 'Understand algorithm complexity and performance characteristics through visual feedback.',
    icon: Zap,
  },
]

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Learn DSA with</span>
                  <span className="block text-indigo-600">Interactive Visualizations</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Master Data Structures and Algorithms through interactive visualizations. Watch algorithms in action, understand their behavior, and learn how they work.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href={user ? "/dashboard" : "/login"}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      {user ? "Go to Dashboard" : "Get Started"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to learn DSA
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Explore our comprehensive collection of data structure and algorithm visualizations.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <Link href={feature.href} className="text-lg leading-6 font-medium text-gray-900 hover:text-indigo-600">
                      {feature.name}
                    </Link>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Benefits</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Why choose our platform?
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {benefits.map((benefit) => (
                <div key={benefit.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <benefit.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{benefit.name}</h3>
                    <p className="mt-2 text-base text-gray-500">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">Start learning today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href={user ? "/dashboard" : "/signup"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {user ? "Go to Dashboard" : "Get started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
