import api from './api';
import { mockCourses } from '../data/mockData';

/**
 * Course Service — connects to backend REST API with rich offline fallback
 */
export async function getCourses(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.level && filters.level !== 'All') params.append('level', filters.level);

    const response = await api.get(`/courses?${params.toString()}`);
    if (response && response.data) {
      return response.data;
    }
    return mockCourses;
  } catch (error) {
    console.warn('[CourseService] Backend offline, returning client fallback catalog:', error.message);
    let result = [...mockCourses];
    if (filters.category && filters.category !== 'All') {
      result = result.filter(c => c.category === filters.category);
    }
    if (filters.level && filters.level !== 'All') {
      result = result.filter(c => c.level === filters.level);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        (c.shortDescription && c.shortDescription.toLowerCase().includes(q))
      );
    }
    return result;
  }
}

export async function getCourseById(id) {
  try {
    const response = await api.get(`/courses/${id}`);
    if (response && response.data) {
      return response.data;
    }
    return mockCourses.find(c => c.id === id) || mockCourses[0];
  } catch (error) {
    console.warn('[CourseService] Backend offline, returning client fallback course:', error.message);
    return mockCourses.find(c => c.id === id) || mockCourses[0];
  }
}

export default {
  getCourses,
  getCourseById
};
