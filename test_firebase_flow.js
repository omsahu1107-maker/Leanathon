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

async function runTests() {
  console.log('=== TEST 1: Student Documents (All Categories) ===');
  let docsRes = await request({ hostname: 'localhost', port: 5000, path: '/api/documents/std_9841', method: 'GET' });
  console.table(docsRes.data.data.map(d => ({
    id: d.id,
    type: d.documentType,
    name: d.name,
    status: d.status,
    adminRemark: d.adminRemark
  })));

  console.log('\n=== TEST 2: Admin Search by Roll Number (26084918) ===');
  let rollRes = await request({ hostname: 'localhost', port: 5000, path: '/api/verification/queue?search=26084918', method: 'GET' });
  console.log(`Found ${rollRes.data.count} documents matching roll number 26084918`);

  console.log('\n=== TEST 3: Admin Search by Registration Number (ADM-2026-8941) ===');
  let regRes = await request({ hostname: 'localhost', port: 5000, path: '/api/verification/queue?search=ADM-2026-8941', method: 'GET' });
  console.log(`Found ${regRes.data.count} documents matching registration number ADM-2026-8941`);

  console.log('\n=== TEST 4: Admin Flags 12th Marksheet as "Re-upload Required" ===');
  let decisionRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/verification/document/DOC-9841-01/decision',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    status: 'Re-upload Required',
    remarks: 'Document is unclear. Please upload a clearer 300 DPI scan with visible controller seal.',
    counselorName: 'Dr. S. K. Patnaik'
  });
  console.log('Decision Result:', decisionRes.data.message);

  console.log('\n=== TEST 5: Verify Student Dashboard receives "Re-upload Required" & Overall Status Updates ===');
  docsRes = await request({ hostname: 'localhost', port: 5000, path: '/api/documents/std_9841', method: 'GET' });
  let doc12 = docsRes.data.data.find(d => d.name.includes('12th'));
  console.log(`12th Marksheet Status: ${doc12.status} | Admin Remark: "${doc12.adminRemark}"`);

  let appRes = await request({ hostname: 'localhost', port: 5000, path: '/api/applications/ADM-2026-8941', method: 'GET' });
  console.log(`Overall Application Status: ${appRes.data.data.overallStatus} | Remark: "${appRes.data.data.statusRemark}"`);

  console.log('\n=== TEST 6: Admin Re-verifies and Approves 12th Marksheet ===');
  await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/verification/document/DOC-9841-01/decision',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    status: 'Approved',
    remarks: 'PCM percentage 91.2% confirmed and verified against official board ledger.',
    counselorName: 'Dr. S. K. Patnaik'
  });

  docsRes = await request({ hostname: 'localhost', port: 5000, path: '/api/documents/std_9841', method: 'GET' });
  doc12 = docsRes.data.data.find(d => d.name.includes('12th'));
  console.log(`12th Marksheet Status After Approval: ${doc12.status}`);

  appRes = await request({ hostname: 'localhost', port: 5000, path: '/api/applications/ADM-2026-8941', method: 'GET' });
  console.log(`Overall Application Status After Approval: ${appRes.data.data.overallStatus} | Remark: "${appRes.data.data.statusRemark}"`);
}

runTests().catch(console.error);
