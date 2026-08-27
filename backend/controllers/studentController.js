const studentService = require('../services/studentService');

async function getProfile(req, res, next) {
  try {
    const id = req.params.id || 'std_9841';
    const profile = await studentService.getStudentProfile(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        error: `Student profile ${id} not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const id = req.params.id || 'std_9841';
    const updated = await studentService.updateStudentProfile(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function getActivity(req, res, next) {
  try {
    const id = req.params.id || 'std_9841';
    const activities = await studentService.getStudentActivity(id);

    res.status(200).json({
      success: true,
      data: activities
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getActivity
};
