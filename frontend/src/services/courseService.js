import api from './api';

/**
 * Course Service — connects to backend REST API
 * Backend response shape: { success: true, count: N, data: [...courses] }
 * The api interceptor returns the full JSON body, so response.data = array of courses.
 */

export async function getCourses(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.level && filters.level !== 'All') params.append('level', filters.level);

  const response = await api.get(`/courses?${params.toString()}`);
  return response.data; // array of courses
}

export async function getCourseById(id) {
  const response = await api.get(`/courses/${id}`);
  return response.data; // single course object
}

export default {
  getCourses,
  getCourseById
};
