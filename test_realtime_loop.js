const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testRealtimeLoop() {
  console.log('--- Step 1: Student uploads a Diploma / Additional Certificate ---');
  // Upload metadata via POST /api/documents/upload or simulated
  const uploadRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/documents/upload',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    studentId: 'std_9841',
    docId: 'doc-107',
    docName: 'Diploma Engineering Certificate (Lateral Entry)',
    documentType: 'Diploma Certificate',
    category: 'Academic'
  });
  console.log('Upload Status:', uploadRes.data.success ? '✓ Document Uploaded & Saved to Firestore' : 'Failed');

  console.log('\n--- Step 2: Admin Queue automatically reflects new upload in real time ---');
  const adminDocs = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/documents',
    method: 'GET'
  });
  const uploadedInAdmin = adminDocs.data.data.find(d => d.name.includes('Diploma') || d.id === 'doc-107');
  console.log(`Found in Admin Queue: "${uploadedInAdmin?.name}" | Status: ${uploadedInAdmin?.status}`);

  console.log('\n--- Step 3: Admin reviews exact document and marks as "Approved" with remarks ---');
  const verifyRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/admin/documents/${uploadedInAdmin.id}/verify`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  }, {
    status: 'Approved',
    remarks: 'State Council of Technical Education diploma percentage 87.4% validated. Eligible for CSE Lateral Entry.',
    counselorName: 'Dr. S. K. Patnaik'
  });
  console.log('Admin Decision:', verifyRes.data.message);

  console.log('\n--- Step 4: Student Portal receives real-time update without refresh ---');
  const studentDocs = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/documents/std_9841',
    method: 'GET'
  });
  const studentDoc = studentDocs.data.data.find(d => d.name.includes('Diploma') || d.id === 'doc-107');
  console.log(`Student Side Document Status: "${studentDoc?.status}"`);
  console.log(`Student Side Counselor Remark: "${studentDoc?.adminRemark}"`);

  const studentApp = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/applications/ADM-2026-8941',
    method: 'GET'
  });
  console.log(`Student Overall Application Status: "${studentApp.data.data.overallStatus}"`);
}

testRealtimeLoop().catch(console.error);
