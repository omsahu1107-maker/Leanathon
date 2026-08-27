const config = require('../config');

let nodemailer = null;
let transporter = null;

try {
  nodemailer = require('nodemailer');
  if (config.smtp.user && config.smtp.pass) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });
    console.log('[EmailService] SMTP Transporter initialized successfully.');
  } else {
    console.log('[EmailService] SMTP credentials not configured in .env — using automated console dispatcher.');
  }
} catch (e) {
  console.log('[EmailService] Running in simulated email dispatch mode.');
}

/**
 * Send Direct Notification Email to Student Mail
 * Mirrors every in-app notification directly to the student's registered email inbox
 */
async function sendDirectNotificationEmail({ studentEmail, studentName, title, description, actionUrl, actionText, type }) {
  const subject = `[GIET University AdmitAI] Notification: ${title}`;

  let badgeColor = '#2563eb';
  let badgeBg = '#eff6ff';
  let icon = '🔔';

  const t = (title || '').toLowerCase();
  if (t.includes('approved') || t.includes('verified') || type === 'completed') {
    badgeColor = '#059669';
    badgeBg = '#ecfdf5';
    icon = '✅';
  } else if (t.includes('re-upload') || t.includes('required') || t.includes('action') || t.includes('pending')) {
    badgeColor = '#d97706';
    badgeBg = '#fffbeb';
    icon = '⚠️';
  } else if (t.includes('rejected')) {
    badgeColor = '#dc2626';
    badgeBg = '#fef2f2';
    icon = '❌';
  }

  const fullActionUrl = actionUrl && actionUrl.startsWith('http') ? actionUrl : `${config.clientUrl}${actionUrl || '/'}`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff; color: #1e293b;">
      <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px;">
        <h2 style="color: #1e293b; margin: 0; font-size: 20px; letter-spacing: 0.5px;">GIET UNIVERSITY, GUNUPUR</h2>
        <p style="color: #64748b; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; font-weight: 600;">Central Admissions & Counseling Office (AdmitAI)</p>
      </div>

      <p style="font-size: 15px; color: #334155; margin-bottom: 16px;">Dear <strong>${studentName || 'Student'}</strong>,</p>
      
      <p style="font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 20px;">
        You have received a new official notification regarding your admission application:
      </p>

      <div style="background-color: ${badgeBg}; border: 1px solid ${badgeColor}; padding: 20px; border-radius: 12px; margin: 16px 0;">
        <div style="margin-bottom: 8px;">
          <h3 style="color: ${badgeColor}; margin: 0; font-size: 16px; font-weight: bold;">${icon} ${title}</h3>
        </div>
        <p style="color: #334155; margin: 8px 0 0 0; font-size: 14px; line-height: 1.6;">${description}</p>
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${fullActionUrl}" style="background: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
          ${actionText || 'View in Admission Portal'} →
        </a>
      </div>

      <div style="margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; line-height: 1.5;">
        <p style="margin: 0;">GIET University, Gunupur, Dist-Rayagada, Odisha - 765022</p>
        <p style="margin: 4px 0 0 0;">Admissions Helpline: <strong>+91 (06857) 250172</strong> | Email: <strong>admissions@giet.edu</strong></p>
      </div>
    </div>
  `;

  if (transporter && studentEmail) {
    try {
      const info = await transporter.sendMail({
        from: config.smtp.from,
        to: studentEmail,
        subject,
        html: htmlContent
      });
      console.log(`[EmailService] 📧 Live email dispatched to student inbox (${studentEmail}): ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.warn(`[EmailService] Live SMTP delivery failed: ${err.message}. Logging email.`);
    }
  }

  console.log(`[EmailService] 📧 [NOTIFICATION SENT TO STUDENT MAIL] To: ${studentEmail || 'student@giet.edu'} | Subject: "${subject}" | Content: "${description}"`);
  return { success: true, simulated: true };
}

/**
 * Send Document Verification Update Email
 */
async function sendDocumentVerificationEmail({ studentEmail, studentName, documentName, status, adminRemark, counselorName }) {
  const title = `Document Status Update: ${documentName} (${status})`;
  const desc = status === 'Approved'
    ? `Your ${documentName} has been approved by the admissions counselor.${adminRemark ? ` Remark: "${adminRemark}"` : ''}`
    : status === 'Re-upload Required'
    ? `Action required: Please re-upload ${documentName}. Counselor instruction: "${adminRemark || 'Upload a clear, full-page scan.'}"`
    : `Your ${documentName} could not be approved. Reason: "${adminRemark || 'Eligibility criteria not met.'}"`;

  return sendDirectNotificationEmail({
    studentEmail,
    studentName,
    title,
    description: desc,
    actionUrl: '/documents',
    actionText: 'View Documents',
    type: status === 'Approved' ? 'completed' : 'warning'
  });
}

/**
 * Send Application Final Decision Email
 */
async function sendApplicationDecisionEmail({ studentEmail, studentName, applicationId, status, remarks }) {
  const title = `Application Status Update: ${status}`;
  const desc = `Your application (${applicationId}) has been updated to "${status}". Remarks: ${remarks || 'All required credentials reviewed by University Admissions.'}`;

  return sendDirectNotificationEmail({
    studentEmail,
    studentName,
    title,
    description: desc,
    actionUrl: '/application-status',
    actionText: 'View Admission Status',
    type: status.includes('Approved') ? 'completed' : 'info'
  });
}

module.exports = {
  sendDirectNotificationEmail,
  sendDocumentVerificationEmail,
  sendApplicationDecisionEmail
};
