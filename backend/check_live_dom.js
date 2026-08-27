const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('🔍 Checking Live Running Services:');
  try {
    const backend = await get('http://localhost:5000/api/health');
    console.log('  ✅ Backend API [http://localhost:5000/api/health]:', backend.status, backend.body);
  } catch (e) {
    console.log('  ⚠️ Backend API error:', e.message);
  }

  try {
    const frontend = await get('http://localhost:5173');
    console.log('  ✅ Frontend Dev Server [http://localhost:5173]:', frontend.status, `(HTML length: ${frontend.body.length} bytes)`);
    console.log('  📄 Title/Root Element:', frontend.body.slice(0, 400));
  } catch (e) {
    console.log('  ⚠️ Frontend error:', e.message);
  }
}

verify();
