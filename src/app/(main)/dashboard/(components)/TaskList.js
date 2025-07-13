// app/(main)/dashboard/(components)/TaskList.js
'use client';

import { useState } from 'react';

export default function TaskList({
  tasks,
  onStatusUpdate,
  onEditTask,
  onDeleteTask,
  userRole,
  currentUserId
}) {
  const [updatingStatus, setUpdatingStatus] = useState({});

  const handleStatusChange = async (taskId, newStatus) => {
    setUpdatingStatus({ ...updatingStatus, [taskId]: true });
    try {
      await onStatusUpdate(taskId, newStatus);
    } finally {
      setUpdatingStatus({ ...updatingStatus, [taskId]: false });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flow-root">
      {/* Mobile Card Layout */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
              {/* Task Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {task.description}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    disabled={updatingStatus[task._id] || 
                      (userRole !== 'admin' && task.assignedTo._id !== currentUserId)}
                    className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(task.status)} ${
                      updatingStatus[task._id] ? 'opacity-50' : ''
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Assigned to:</span>
                  <span className="text-gray-900 font-medium">{task.assignedTo.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Deadline:</span>
                  <span className="text-gray-900">{formatDate(task.deadline)}</span>
                </div>
              </div>

              {/* Actions */}
              {userRole === 'admin' && (
                <div className="flex justify-end space-x-4 mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onEditTask(task)}
                    className="text-xs text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTask(task._id)}
                    className="text-xs text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </div>
              )}
              {userRole !== 'admin' && task.assignedTo._id === currentUserId && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs text-green-600 font-medium">
                    You can update status
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {task.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {task.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {task.assignedTo.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {task.assignedTo.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task._id, e.target.value)}
                          disabled={updatingStatus[task._id] || 
                            (userRole !== 'admin' && task.assignedTo._id !== currentUserId)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)} ${
                            updatingStatus[task._id] ? 'opacity-50' : ''
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(task.deadline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          {userRole === 'admin' && (
                            <>
                              <button
                                onClick={() => onEditTask(task)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => onDeleteTask(task._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </>
                          )}
                          {userRole !== 'admin' && task.assignedTo._id === currentUserId && (
                            <span className="text-green-600 text-sm">
                              You can update status
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}