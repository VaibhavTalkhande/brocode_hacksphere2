"use client"

import { DashboardLayout } from '@/components/DashboardLayout'
import { 
  Trees, 
  Network, 
  List, 
  BarChart3,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
const stats = [
  { name: 'Tree Visualizations', value: '5', icon: Trees, href: '/dashboard/trees' },
  { name: 'Graph Visualizations', value: '3', icon: Network, href: '/dashboard/graphs' },
  { name: 'Array Visualizations', value: '8', icon: List, href: '/dashboard/arrays' },
  { name: 'Sorting Visualizations', value: '6', icon: BarChart3, href: '/dashboard/sorting' },
]

const recentActivity = [
  { name: 'Binary Tree Traversal', type: 'Tree', time: '2 hours ago' },
  { name: 'Bubble Sort', type: 'Sorting', time: '4 hours ago' },
  { name: 'Graph DFS', type: 'Graph', time: '1 day ago' },
  { name: 'Array Operations', type: 'Array', time: '2 days ago' },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your DSA Visualization dashboard
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow duration-150 ease-in-out"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <span className="font-medium text-indigo-600 hover:text-indigo-500">
                      View all <span className="sr-only">{stat.name}</span>
                      <ArrowRight className="inline-block ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </dd>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul role="list" className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.name} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-indigo-600 truncate">{activity.name}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {activity.type}
                        </p>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 