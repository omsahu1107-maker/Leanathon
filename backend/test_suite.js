/**
 * AdmitAI / GIET University Automated Test Suite
 * Tests Backend API Endpoints, Mock Data Store, and AI Admission Guidance Engine
 */

const assert = require('assert');
const { mockCourses, mockApplication, mockStudentProfile, mockDocuments, mockNotifications } = require('./data/mockData');
const { processChatMessage } = require('./services/aiService');

let passedTests = 0;
let failedTests = 0;

function runTest(testName, testFn) {
  try {
    testFn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

async function runAsyncTest(testName, testFn) {
  try {
    await testFn();
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${testName}`);
    console.error(`     Error: ${err.message}`);
    failedTests++;
  }
}

async function runAllTests() {
  console.log('\n======================================================');
  console.log('🏛️  GIET UNIVERSITY / AdmitAI Test Suite Execution');
  console.log('======================================================\n');

  // Group 1: Course Catalog & Structure
  console.log('📦 GROUP 1: Course Catalog & Academic Offerings');
  runTest('Course catalog should not be empty', () => {
    assert(Array.isArray(mockCourses) && mockCourses.length > 0, 'Courses must be an array');
  });

  runTest('Should include signature GIET University Engineering programs', () => {
    const cse = mockCourses.find(c => c.id === 'btech-cse');
    const aiml = mockCourses.find(c => c.id === 'btech-aiml');
    const ece = mockCourses.find(c => c.id === 'btech-ece');
    assert(cse, 'B.Tech CSE must exist');
    assert(aiml, 'B.Tech AI & ML must exist');
    assert(ece, 'B.Tech ECE must exist');
  });

  runTest('Should include School of Agricultural Sciences (B.Sc Agriculture)', () => {
    const agri = mockCourses.find(c => c.id === 'bsc-agri');
    assert(agri, 'B.Sc Agriculture must exist');
    assert.strictEqual(agri.category, 'Agriculture');
    assert(agri.description.includes('GIET University School of Agricultural Sciences'));
  });

  runTest('Should include Management and Computer Application programs', () => {
    const mba = mockCourses.find(c => c.id === 'mba');
    const mca = mockCourses.find(c => c.id === 'mca');
    const bba = mockCourses.find(c => c.id === 'bba');
    const bca = mockCourses.find(c => c.id === 'bca');
    assert(mba, 'MBA must exist');
    assert(mca, 'MCA must exist');
    assert(bba, 'BBA must exist');
    assert(bca, 'BCA must exist');
  });

  runTest('Should include Pharmacy, Nursing, and Aviation programs', () => {
    const nursing = mockCourses.find(c => c.id === 'bsc-nursing');
    const pharmacy = mockCourses.find(c => c.id === 'b-pharmacy');
    const aero = mockCourses.find(c => c.id === 'btech-aero');
    const ame = mockCourses.find(c => c.id === 'ame');
    assert(nursing, 'B.Sc Nursing must exist');
    assert(pharmacy, 'B.Pharmacy must exist');
    assert(aero, 'B.Tech Aeronautical must exist');
    assert(ame, 'AME must exist');
  });

  runTest('Should include Doctoral (Ph.D.) Research Programs across all schools', () => {
    const phdPhysics = mockCourses.find(c => c.id === 'phd-physics');
    const phdCSE = mockCourses.find(c => c.id === 'phd-cse');
    const phdAgri = mockCourses.find(c => c.id === 'phd-agri');
    const phdManagement = mockCourses.find(c => c.id === 'phd-management');
    const phdBotany = mockCourses.find(c => c.id === 'phd-botany');
    const phdZoology = mockCourses.find(c => c.id === 'phd-zoology');
    assert(phdPhysics, 'Ph.D Physics must exist');
    assert(phdCSE, 'Ph.D CSE must exist');
    assert(phdAgri, 'Ph.D Agriculture must exist');
    assert(phdManagement, 'Ph.D Management must exist');
    assert(phdBotany, 'Ph.D Botany must exist');
    assert(phdZoology, 'Ph.D Zoology must exist');
  });

  runTest('All courses must have valid fee structures and eligibility', () => {
    mockCourses.forEach(course => {
      assert(course.id, `Course must have ID`);
      assert(course.name, `Course ${course.id} must have a name`);
      assert(course.fees && course.fees.perSemester && course.fees.annual, `Course ${course.id} must have fee details`);
      assert(course.eligibility, `Course ${course.id} must have eligibility info`);
    });
  });

  // Group 2: Student Application & Documents
  console.log('\n📄 GROUP 2: Student Application & Document Verification');
  runTest('Mock application profile should have valid initial stage and percentage', () => {
    assert(mockApplication.id.startsWith('ADM-'), 'Application ID must start with ADM-');
    assert(mockApplication.completionPercentage >= 0 && mockApplication.completionPercentage <= 100);
    assert(mockApplication.currentStage, 'Current stage must be defined');
  });

  runTest('Document store must contain required student documents', () => {
    assert(Array.isArray(mockDocuments) && mockDocuments.length >= 4, 'Must have at least 4 documents');
    const tenth = mockDocuments.find(d => d.name && d.name.includes('10th'));
    const twelfth = mockDocuments.find(d => d.name && d.name.includes('12th'));
    assert(tenth, '10th Marksheet document must exist');
    assert(twelfth, '12th Marksheet document must exist');
  });

  runTest('Notifications hub should contain alerts for action items', () => {
    assert(Array.isArray(mockNotifications) && mockNotifications.length > 0, 'Notifications must not be empty');
  });

  // Group 3: AI Admission Guidance Engine
  console.log('\n🤖 GROUP 3: AI Admission Assistant Knowledge Engine');

  await runAsyncTest('AI should answer queries about GIET University Gunupur & Legacy', async () => {
    const response = await processChatMessage('Tell me about GIET University Gunupur');
    assert(response.text.includes('GIET University'), 'Response should mention GIET University');
    assert(response.text.includes('1997'), 'Response should mention 1997 establishment');
    assert(response.text.includes('Vidya Bharati Educational Trust'), 'Response should mention Vidya Bharati Educational Trust');
    assert(response.text.includes('NAAC'), 'Response should mention NAAC accreditation');
    assert(response.action && response.action.route === '/about-giet', 'Response should route to /about-giet');
  });

  await runAsyncTest('AI should answer placement statistics and highest package', async () => {
    const response = await processChatMessage('What are the placement records and highest package?');
    assert(response.text.includes('95%'), 'Response should mention 95%+ placement rate');
    assert(response.text.includes('19.5'), 'Response should mention top package');
    assert(response.text.includes('TCS') || response.text.includes('Infosys') || response.text.includes('Amazon'), 'Response should mention top recruiters');
  });

  await runAsyncTest('AI should provide campus, hostel, and dining facilities information', async () => {
    const response = await processChatMessage('Tell me about campus facilities and hostel accommodation');
    assert(response.text.includes('Hostel') || response.text.includes('AC'), 'Response should mention hostels');
    assert(response.text.includes('Library') || response.text.includes('Sports'), 'Response should mention campus facilities');
    assert(response.action && response.action.route === '/about-giet', 'Action should navigate to /about-giet');
  });

  await runAsyncTest('AI should evaluate student eligibility and merit scholarships', async () => {
    const response = await processChatMessage('Am I eligible for admission and scholarships?');
    assert(response.text.includes('88.6%'), 'Response should evaluate student 12th board score');
    assert(response.text.includes('Merit Excellence Scholarship') || response.text.includes('GIETU'), 'Response should mention merit scholarship');
  });

  await runAsyncTest('AI should check document requirements and missing files', async () => {
    const response = await processChatMessage('What documents are pending or required?');
    assert(response.text.includes('Income Certificate') || response.text.includes('Missing'), 'Response should flag missing Income Certificate');
    assert(response.action && response.action.route === '/documents', 'Action should route to /documents');
  });

  await runAsyncTest('AI should provide important admission dates and deadlines', async () => {
    const response = await processChatMessage('What are the important admission deadlines for 2026?');
    assert(response.text.includes('Deadline') || response.text.includes('September') || response.text.includes('October'), 'Response should provide dates');
  });

  // Final Summary
  console.log('\n======================================================');
  console.log(`📊 TEST RESULTS SUMMARY`);
  console.log(`   Total Tests : ${passedTests + failedTests}`);
  console.log(`   Passed      : ${passedTests}`);
  console.log(`   Failed      : ${failedTests}`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runAllTests();
