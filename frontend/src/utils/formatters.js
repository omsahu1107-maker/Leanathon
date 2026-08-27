export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getStatusBadgeVariant(status) {
  switch ((status || '').toLowerCase()) {
    case 'verified':
    case 'completed':
    case 'approved':
      return 'success';
    case 'processing':
    case 'in progress':
      return 'info';
    case 'needs review':
    case 'pending review':
    case 'upcoming':
    case 'pending':
      return 'warning';
    case 'missing':
    case 'rejected':
    case 'needs re-upload':
    case 'action required':
      return 'danger';
    default:
      return 'default';
  }
}
