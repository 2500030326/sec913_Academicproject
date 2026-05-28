import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ShieldAlert, Trash2 } from 'lucide-react';
import AdminNav from '../components/AdminNav';
import { adminAPI } from '../utils/api';

const roleLabels = {
  1: 'USER',
  2: 'EDITOR',
  3: 'ADMIN',
};

const fallbackUsers = [
  {
    id: 'seed-admin',
    fullname: 'NewsSphere Admin',
    email: 'admin@newssphere.ai',
    role: 3,
    status: 1,
  },
  {
    id: 'seed-editor',
    fullname: 'Priya Raman',
    email: 'priya.raman@newssphere.ai',
    role: 2,
    status: 1,
  },
  {
    id: 'seed-reader',
    fullname: 'Alex Reader',
    email: 'alex.reader@example.com',
    role: 1,
    status: 1,
  },
  {
    id: 'seed-analyst',
    fullname: 'Rahul Menon',
    email: 'rahul.menon@example.com',
    role: 1,
    status: 0,
  },
];

const UserManagement = ({ showNav = true }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await adminAPI.listUsers();
        const nextUsers = response.users || response;
        setUsers(Array.isArray(nextUsers) && nextUsers.length > 0 ? nextUsers : fallbackUsers);
      } catch (error) {
        console.error(error);
        setUsers(fallbackUsers);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const updateRole = async (userId, role) => {
    try {
      await adminAPI.updateUserRole(userId, role);
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role } : user)));
    } catch (error) {
      console.error(error);
    }
  };

  const suspendUser = async (userId) => {
    try {
      await adminAPI.suspendUser(userId);
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: 0 } : user)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await adminAPI.deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full px-4 md:px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        {showNav && <AdminNav />}

        <motion.div className="glass-morphism p-6 rounded-[2rem] border border-white/10 shadow-glass-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white">User Management</h2>
              <p className="text-gray-400">View and manage users, roles, suspensions, and account status.</p>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-3 bg-neon-cyan/15 text-neon-cyan rounded-3xl font-semibold hover:bg-neon-cyan/20 transition-all">
              <UserPlus size={18} /> Invite Team
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400">
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-white/5">
                      <td className="py-4 px-4 text-white">{user.fullname}</td>
                      <td className="py-4 px-4 text-gray-300">{user.email}</td>
                      <td className="py-4 px-4 text-gray-300">{roleLabels[user.role] || 'USER'}</td>
                      <td className="py-4 px-4 text-gray-300">{user.status === 1 ? 'Active' : 'Suspended'}</td>
                      <td className="py-4 px-4 space-x-2">
                        <button className="px-3 py-2 bg-white/5 rounded-2xl text-sm text-neon-cyan hover:bg-white/10" onClick={() => updateRole(user.id, 2)}>
                          Editor
                        </button>
                        <button className="px-3 py-2 bg-white/5 rounded-2xl text-sm text-neon-purple hover:bg-white/10" onClick={() => suspendUser(user.id)}>
                          <ShieldAlert size={14} /> Suspend
                        </button>
                        <button className="px-3 py-2 bg-white/5 rounded-2xl text-sm text-neon-pink hover:bg-white/10" onClick={() => deleteUser(user.id)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
};

export default UserManagement;
