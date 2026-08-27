const applicationService = require('../services/applicationService');

async function getApplication(req, res, next) {
  try {
    const { id } = req.params;
    const application = await applicationService.getApplicationById(id || 'ADM-2026-8941');

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
}

async function updateApplication(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await applicationService.updateApplication(id || 'ADM-2026-8941', req.body);

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

async function submitApplication(req, res, next) {
  try {
    const { id } = req.params;
    const submitted = await applicationService.submitApplication(id || 'ADM-2026-8941');

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully for review',
      data: submitted
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getApplication,
  updateApplication,
  submitApplication
};
