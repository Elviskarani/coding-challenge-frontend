// app/(main)/dashboard/page.js
'use client';

import { useState, useEffect } from 'react';
import { authAPI, tasksAPI } from '@/app/lib/api';
import TaskList from './(components)/TaskList';
import CreateEditTask from './(components)/CreateEditTask';
import FilterControls from './(components)/FilterControls';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, statusFilter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    if (statusFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === statusFilter));
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowCreateModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingTask(null);
  };

  const handleTaskSaved = () => {
    fetchTasks();
    handleCloseModal();
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await tasksAPI.updateTaskStatus(taskId, newStatus);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(taskId);
        fetchTasks();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 lg:px-8 pb-6 min-h-screen">
      {/* Header section - mobile optimized */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
            {user?.role === 'admin' ? 'All Tasks' : 'My Tasks'}
          </h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-700">
            {user?.role === 'admin' 
              ? 'Manage all tasks in the system'
              : 'View and update your assigned tasks'
            }
          </p>
        </div>
        
        {/* Create Task Button - Mobile friendly */}
        {user?.role === 'admin' && (
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleCreateTask}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="sm:hidden">Create New Task</span>
              <span className="hidden sm:inline">Create Task</span>
            </button>
          </div>
        )}
      </div>

      {/* Error message - mobile responsive */}
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-3 rounded text-sm">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="break-words">{error}</span>
          </div>
        </div>
      )}

      {/* Filter Controls - mobile responsive */}
      <div className="mt-4 sm:mt-6">
        <FilterControls
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      </div>

      {/* Task List - mobile responsive */}
      <div className="mt-4 sm:mt-6">
        <TaskList
          tasks={filteredTasks}
          onStatusUpdate={handleStatusUpdate}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          userRole={user?.role}
          currentUserId={user?._id}
        />
      </div>

      {/* Modal - mobile responsive */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleCloseModal}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="inline-block w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <CreateEditTask
                task={editingTask}
                onClose={handleCloseModal}
                onSave={handleTaskSaved}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}