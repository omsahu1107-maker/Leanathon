import React, { createContext, useContext, useState, useEffect } from 'react';
import profileService from '../services/profileService';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('admitai_user');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const [profile, setProfile] = useState(() => {
    try {
      const cached = localStorage.getItem('admitai_profile');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('admitai_user') || !!localStorage.getItem('admitai_token');
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await profileService.getProfile(user.id);
        if (data) {
          setProfile(data);
          setUser(prev => ({
            ...prev,
            id: data.id || prev?.id,
            name: data.name || prev?.name,
            email: data.email || prev?.email,
            phone: data.phone || prev?.phone,
            applicationId: data.applicationId || prev?.applicationId
          }));
          localStorage.setItem('admitai_profile', JSON.stringify(data));
        }
      } catch (err) {
        console.warn('Profile load sync:', err.message);
      } finally {
        setLoading(false);
      }
    }

    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const loginUser = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response && response.user) {
        setUser(response.user);
        if (response.profile) {
          setProfile(response.profile);
          localStorage.setItem('admitai_profile', JSON.stringify(response.profile));
        }
        localStorage.setItem('admitai_user', JSON.stringify(response.user));
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const registerUser = async (studentData) => {
    try {
      const response = await authService.register(studentData);
      if (response && response.user) {
        const registeredStudent = {
          ...response.user,
          ...studentData
        };

        setUser(registeredStudent);
        setProfile(response.profile || registeredStudent);

        localStorage.setItem('admitai_user', JSON.stringify(registeredStudent));
        localStorage.setItem('admitai_profile', JSON.stringify(response.profile || registeredStudent));
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logoutUser = () => {
    authService.logout();
    localStorage.removeItem('admitai_user');
    localStorage.removeItem('admitai_profile');
    localStorage.removeItem('admitai_token');
    setIsAuthenticated(false);
    setUser(null);
    setProfile(null);
  };

  const updateStudentProfile = async (updatedData) => {
    try {
      const studentId = user?.id || 'std_9841';
      const saved = await profileService.updateProfile(studentId, updatedData);
      setProfile(saved);
      setUser(prev => ({
        ...prev,
        name: saved.name || prev?.name,
        email: saved.email || prev?.email,
        phone: saved.phone || prev?.phone
      }));
      localStorage.setItem('admitai_profile', JSON.stringify(saved));
      return saved;
    } catch (error) {
      console.error('Failed to update student profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isAuthenticated,
      login: loginUser,
      register: registerUser,
      logout: logoutUser,
      updateStudentProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
