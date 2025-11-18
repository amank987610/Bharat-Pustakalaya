import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, activeTab);
      
      // Redirect based on role
      if (activeTab === 'admin') {
        navigate('/admin');
      } else if (activeTab === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white py-8 px-6 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary font-bold text-3xl mx-auto mb-4">
              HSS
            </div>
            <h1 className="text-2xl font-bold">Login Portal</h1>
            <p className="text-sm mt-2">+2 Hari Shankar Singh High School</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-4 text-center font-semibold transition ${
                activeTab === 'student'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex-1 py-4 text-center font-semibold transition ${
                activeTab === 'teacher'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-4 text-center font-semibold transition ${
                activeTab === 'admin'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">Demo Credentials:</p>
              <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                {activeTab === 'student' && 'Email: rahul@student.com'}
                {activeTab === 'teacher' && 'Email: amit@teacher.com'}
                {activeTab === 'admin' && 'Email: admin@school.com'}
                <br />
                Password: password123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
