const courseService = require('../services/courseService');

async function getCourses(req, res, next) {
  try {
    const { category, search, level } = req.query;
    const courses = await courseService.getAllCourses({ category, search, level });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: `Course with id '${id}' not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCourses,
  getCourseById
};
