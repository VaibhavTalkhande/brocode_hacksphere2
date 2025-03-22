"use client"

import { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Plus, Minus, RotateCcw } from 'lucide-react'

interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

const createNode = (value: number): TreeNode => ({
  value,
  left: null,
  right: null,
})

const sampleTree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null,
    },
    right: {
      value: 5,
      left: null,
      right: null,
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: null,
      right: null,
    },
    right: {
      value: 7,
      left: null,
      right: null,
    },
  },
}

export default function TreePage() {
  const [tree, setTree] = useState<TreeNode>(sampleTree)
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder')

  const addNode = (parent: TreeNode, value: number, isLeft: boolean) => {
    const newNode = createNode(value)
    if (isLeft) {
      parent.left = newNode
    } else {
      parent.right = newNode
    }
    setTree({ ...tree })
  }

  const removeNode = (node: TreeNode) => {
    if (node === tree) {
      setTree(createNode(0))
    } else {
      // Find and remove the node from its parent
      const findAndRemove = (root: TreeNode, target: TreeNode): boolean => {
        if (root.left === target) {
          root.left = null
          return true
        }
        if (root.right === target) {
          root.right = null
          return true
        } else {
          return (root.left && findAndRemove(root.left, target)) ||
                 (root.right && findAndRemove(root.right, target)) !== null
        }
      }
      findAndRemove(tree, node)
      setTree({ ...tree, left: tree.left, right: tree.right })
    }
  }

  const renderNode = (node: TreeNode, level: number = 0) => {
    if (!node) return null

    return (
      <div key={node.value} className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-150 ${
            selectedNode === node
              ? 'bg-indigo-600 text-white'
              : 'bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50'
          }`}
          onClick={() => setSelectedNode(node)}
        >
          {node.value}
        </div>
        <div className="flex space-x-8">
          {node.left && (
            <div className="relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-indigo-500" />
              {renderNode(node.left, level + 1)}
            </div>
          )}
          {node.right && (
            <div className="relative">
              <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-indigo-500" />
              {renderNode(node.right, level + 1)}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tree Visualizer</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualize and manipulate binary trees
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="traversal" className="block text-sm font-medium text-gray-700">
                Traversal Type
              </label>
              <select
                id="traversal"
                value={traversalType}
                onChange={(e) => setTraversalType(e.target.value as 'inorder' | 'preorder' | 'postorder')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="inorder">In-order</option>
                <option value="preorder">Pre-order</option>
                <option value="postorder">Post-order</option>
              </select>
            </div>

            {selectedNode && (
              <div className="flex items-end space-x-2">
                <button
                  onClick={() => addNode(selectedNode, Math.floor(Math.random() * 100), true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Left
                </button>
                <button
                  onClick={() => addNode(selectedNode, Math.floor(Math.random() * 100), false)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Right
                </button>
                <button
                  onClick={() => removeNode(selectedNode)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Remove
                </button>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setTree(sampleTree)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Tree
              </button>
            </div>
          </div>
        </div>

        {/* Tree Visualization */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-center">
            {renderNode(tree)}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 