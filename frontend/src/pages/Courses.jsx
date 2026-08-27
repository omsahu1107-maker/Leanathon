import React, { useState, useEffect } from 'react';
import CourseCard from '../components/courses/CourseCard';
import CourseFilter from '../components/courses/CourseFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { GraduationCap, Sparkles } from 'lucide-react';
import courseService from '../services/courseService';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const data = await courseService.getCourses({
          category: selectedCategory,
          search: searchQuery
        });
        setCourses(data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to load courses:', err);
        setError('Failed to fetch courses. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      loadCourses();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Academic Programs</h1>
            <span className="text-xs bg-brand-50 text-brand-700 font-semibold px-2.5 py-0.5 rounded-full border border-brand-200">
              2026 Admissions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover accredited undergraduate & postgraduate engineering, management, and computing degrees.
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <CourseFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Courses Grid */}
      {loading ? (
        <LoadingSpinner message="Searching available programs..." />
      ) : error ? (
        <EmptyState
          icon={GraduationCap}
          title="Error loading courses"
          description={error}
          actionText="Retry"
          onAction={() => setSelectedCategory('All')}
        />
      ) : courses.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No courses found"
          description={`No programs matched "${searchQuery}". Try clearing filters or searching for terms like "CSE", "AI", or "Cloud".`}
          actionText="Clear Search"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
