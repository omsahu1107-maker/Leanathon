export const APPLICATION_STAGES = [
  { id: 1, name: 'Inquiry', short: 'Inquiry' },
  { id: 2, name: 'Application Started', short: 'Started' },
  { id: 3, name: 'Personal Details', short: 'Personal' },
  { id: 4, name: 'Academic Details', short: 'Academic' },
  { id: 5, name: 'Document Verification', short: 'Documents' },
  { id: 6, name: 'Eligibility Verification', short: 'Eligibility' },
  { id: 7, name: 'Admission Approval', short: 'Approval' },
  { id: 8, name: 'Enrollment & Confirmed', short: 'Enrolled' }
];

export const DOCUMENT_STATUSES = {
  VERIFIED: 'Verified',
  PROCESSING: 'Processing',
  NEEDS_REVIEW: 'Needs Review',
  MISSING: 'Missing',
  REJECTED: 'Rejected'
};

export const COURSE_CATEGORIES = [
  'All',
  'Engineering',
  'Agriculture',
  'Management',
  'Computer Applications',
  'Sciences',
  'Pharmacy & Nursing',
  'Aviation',
  'Humanities',
  'Doctoral (Ph.D.)'
];
