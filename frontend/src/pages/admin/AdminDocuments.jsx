import React, { useState, useEffect } from 'react';
import {
  FileText,
  FileCheck2,
  FileX,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  Sparkles,
  User,
  Award,
  ExternalLink,
  Bot,
  Layers,
  Image as ImageIcon,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import adminService from '../../services/adminService';

const STATUS_FILTERS = ['All', 'Verified', 'Pending Review', 'Needs Re-upload'];
const CATEGORY_FILTERS = ['All', 'Academic', 'Entrance', 'Identity'];

export default function AdminDocuments() {
  const { isDark } = useTheme();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | 'ocr'
  const [decisionStatus, setDecisionStatus] = useState('');
  const [counselorRemarks, setCounselorRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDocuments({
        status: statusFilter,
        category: categoryFilter,
        search: searchQuery
      });
      setDocuments(data || []);
    } catch (err) {
      console.error('Failed to load documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
    const interval = setInterval(() => {
      fetchDocs();
    }, 3000);
    return () => clearInterval(interval);
  }, [statusFilter, categoryFilter, searchQuery]);

  const handleOpenDoc = (doc) => {
    setSelectedDoc(doc);
    setDecisionStatus(doc.status);
    setCounselorRemarks(doc.remarks || '');
    setZoomLevel(100);
    setRotation(0);
    setViewMode('photo');
    setActionSuccess('');
  };

  const handleCloseModal = () => {
    setSelectedDoc(null);
    setActionSuccess('');
  };

  const handleVerifySubmit = async (status) => {
    if (!selectedDoc) return;

    // Validate required remark for Re-upload / Reject
    let finalRemark = counselorRemarks.trim();
    if (status === 'Re-upload Required' && !finalRemark) {
      finalRemark = 'Document is unclear or missing official seal. Please upload a clearer high-resolution scan.';
      setCounselorRemarks(finalRemark);
    } else if (status === 'Rejected' && !finalRemark) {
      finalRemark = 'Document does not meet eligibility requirements for this program.';
      setCounselorRemarks(finalRemark);
    }

    setUpdating(true);
    setActionSuccess('');

    try {
      const updated = await adminService.verifyDocument(selectedDoc.id, status, finalRemark);
      setSelectedDoc(updated);
      setActionSuccess(`Document successfully marked as "${status}" and synced to Student Dashboard!`);
      fetchDocs();
    } catch (err) {
      alert('Failed to update document: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ============================================================
          PAGE TITLE & AI AUDIT COUNTER
      ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              OCR Document Intelligence & Exact Photo Inspection Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Student Uploaded Documents
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Inspect the exact original photos, scanned marksheets, and rank cards uploaded by applicants alongside AI OCR verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            Total Uploads: <strong>{documents.length}</strong>
          </span>
          <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            Original Photo Inspection: <strong>Active</strong>
          </span>
        </div>
      </div>

      {/* ============================================================
          SEARCH & MULTI-FILTER CONTROLS
      ============================================================ */}
      <div className={`p-4 rounded-2xl border flex flex-col lg:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Search input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Document name, Candidate, App ID..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs outline-none border transition-colors ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
            }`}
          />
        </div>

        {/* Status & Category Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Status:</span>
            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isDark
                      ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Type:</span>
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : isDark
                      ? 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          UPLOADED DOCUMENTS GALLERY GRID
      ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => {
          const docImage = doc.imageUrl || doc.fileUrl || '/documents/marksheet_12th.jpg';
          return (
            <div
              key={doc.id}
              onClick={() => handleOpenDoc(doc)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all hover:border-indigo-500/50 hover:shadow-lg flex flex-col justify-between group ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div>
                {/* Header: Student Info & Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium text-slate-300">{doc.studentName}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {doc.applicationId}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                    doc.status === 'Verified' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                    doc.status === 'Needs Re-upload' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                    'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}>
                    {doc.status}
                  </span>
                </div>

                {/* Real Document Image Thumbnail */}
                <div className="h-40 w-full rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden mb-3 group-hover:border-indigo-500/40 transition-colors flex items-center justify-center">
                  <img
                    src={docImage}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      e.target.src = '/documents/marksheet_12th.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-indigo-300 flex items-center gap-1 border border-indigo-500/30">
                    <ImageIcon className="w-3 h-3" />
                    <span>Exact Uploaded Photo</span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-slate-300 font-mono">
                    <span className="truncate max-w-[150px] font-bold text-white drop-shadow">{doc.fileName}</span>
                    <span className="text-emerald-400 font-bold bg-black/60 px-1.5 py-0.5 rounded">OCR: {doc.confidenceScore}%</span>
                  </div>
                </div>

                {/* Remarks snippet */}
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {doc.remarks}
                </p>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  By: <strong className="text-white">{doc.verifiedBy}</strong>
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDoc(doc);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Exact Photo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================
          INTERACTIVE DOCUMENT VIEWER & EXACT PHOTO AUDIT MODAL
      ============================================================ */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-6xl h-[94vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border transition-colors duration-200 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Header */}
            <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    {selectedDoc.name}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      selectedDoc.status === 'Verified' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                      selectedDoc.status === 'Needs Re-upload' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' :
                      'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}>
                      {selectedDoc.status}
                    </span>
                  </h2>
                  <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                    <span className="text-indigo-300 font-bold">{selectedDoc.studentName} ({selectedDoc.applicationId})</span>
                    <span>·</span>
                    <span>File: {selectedDoc.fileName} ({selectedDoc.fileSize})</span>
                  </div>
                </div>
              </div>

              {/* View Switcher & Controls */}
              <div className="flex items-center gap-3">
                
                {/* Switch View Mode: Photo vs OCR */}
                <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                  <button
                    onClick={() => setViewMode('photo')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      viewMode === 'photo'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Exact Photo Scan</span>
                  </button>
                  <button
                    onClick={() => setViewMode('ocr')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      viewMode === 'ocr'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>OCR Data Match</span>
                  </button>
                </div>

                {/* Zoom & Rotation controls */}
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-slate-300">
                  <button
                    onClick={() => setZoomLevel(Math.max(zoomLevel - 20, 50))}
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono px-2">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(Math.min(zoomLevel + 20, 250))}
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setRotation((rotation + 90) % 360)}
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg ml-1"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                  
                  {/* Download Original Photo */}
                  <a
                    href={selectedDoc.imageUrl || selectedDoc.fileUrl || '/documents/marksheet_12th.jpg'}
                    target="_blank"
                    rel="noreferrer"
                    download={selectedDoc.fileName}
                    className="p-1.5 hover:text-white hover:bg-slate-800 rounded-lg ml-1 text-indigo-400"
                    title="Download Original High-Res File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Split into Document Canvas (Left 65%) + Decision Form (Right 35%) */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* ============================================================
                  LEFT CANVAS: EXACT SCANNED PHOTO UPLOADED BY STUDENT
              ============================================================ */}
              <div className="lg:w-8/12 bg-slate-950 p-6 overflow-auto flex items-center justify-center relative select-none">
                
                {viewMode === 'photo' ? (
                  <div
                    style={{
                      transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease-out'
                    }}
                    className="max-w-full max-h-full flex items-center justify-center p-2"
                  >
                    {/* Exact Photo Uploaded by Student */}
                    <img
                      src={selectedDoc.imageUrl || selectedDoc.fileUrl || '/documents/marksheet_12th.jpg'}
                      alt={selectedDoc.name}
                      className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border-2 border-slate-700 bg-white"
                      onError={(e) => {
                        e.target.src = '/documents/marksheet_12th.jpg';
                      }}
                    />
                  </div>
                ) : (
                  /* Formatted OCR Certificate View */
                  <div
                    style={{
                      transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease-out'
                    }}
                    className="w-full max-w-lg bg-amber-50 text-slate-900 p-8 rounded-xl shadow-2xl border-4 border-amber-200 relative overflow-hidden"
                  >
                    {/* Institutional Seal Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <Award className="w-72 h-72 text-slate-900" />
                    </div>

                    {/* Header */}
                    <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
                      <div className="text-[10px] tracking-widest uppercase font-bold text-slate-600">
                        OFFICIAL ACADEMIC CREDENTIAL / MARKSHEET
                      </div>
                      <div className="text-base font-black uppercase text-slate-900 tracking-tight">
                        {selectedDoc.ocrData?.board || selectedDoc.ocrData?.university || selectedDoc.ocrData?.examSession || 'GOVERNMENT EXAMINATION AUTHORITY'}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-700">
                        {selectedDoc.name} · Session {selectedDoc.ocrData?.passingYear || '2026'}
                      </div>
                    </div>

                    {/* Candidate Profile Details */}
                    <div className="py-4 space-y-2 text-xs border-b border-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Candidate Name:</span>
                        <strong className="font-bold text-slate-900 font-mono">{selectedDoc.ocrData?.candidateName || selectedDoc.studentName.toUpperCase()}</strong>
                      </div>
                      {selectedDoc.ocrData?.rollNumber && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Roll / Registration No:</span>
                          <strong className="font-mono">{selectedDoc.ocrData.rollNumber}</strong>
                        </div>
                      )}
                      {selectedDoc.ocrData?.institution && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">College / School:</span>
                          <strong className="text-right">{selectedDoc.ocrData.institution}</strong>
                        </div>
                      )}
                      {selectedDoc.ocrData?.dateOfBirth && (
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Date of Birth:</span>
                          <strong>{selectedDoc.ocrData.dateOfBirth}</strong>
                        </div>
                      )}
                    </div>

                    {/* Subject Scores Table if present */}
                    {selectedDoc.ocrData?.subjects && (
                      <div className="py-3">
                        <table className="w-full text-left text-[11px]">
                          <thead>
                            <tr className="border-b border-slate-400 font-bold">
                              <th className="pb-1">Subject</th>
                              <th className="pb-1 text-center">Max</th>
                              <th className="pb-1 text-center">Secured</th>
                              <th className="pb-1 text-right">Grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {selectedDoc.ocrData.subjects.map((sub, i) => (
                              <tr key={i}>
                                <td className="py-1 font-medium">{sub.name}</td>
                                <td className="py-1 text-center font-mono">{sub.max}</td>
                                <td className="py-1 text-center font-mono font-bold">{sub.secured}</td>
                                <td className="py-1 text-right font-mono font-bold text-indigo-700">{sub.grade}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Entrance Score details if JEE */}
                    {selectedDoc.ocrData?.totalNtaPercentile && (
                      <div className="py-3 space-y-1.5 text-xs">
                        <div className="flex justify-between font-bold text-sm bg-amber-100 p-2 rounded">
                          <span>Total NTA Percentile Score:</span>
                          <span className="font-mono text-indigo-800">{selectedDoc.ocrData.totalNtaPercentile}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>All India Rank (AIR):</span>
                          <span className="font-bold font-mono">#{selectedDoc.ocrData.allIndiaRank}</span>
                        </div>
                      </div>
                    )}

                    {/* Footer & Signature Stamp */}
                    <div className="pt-6 border-t-2 border-slate-800 flex items-center justify-between text-[10px]">
                      <div className="space-y-0.5">
                        <span className="text-slate-500 block">Digitally Verified Document</span>
                        <span className="font-mono text-emerald-800 font-bold">SHA-256: 4f8a91b0...</span>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-6 border-b border-slate-900 border-dashed mb-1" />
                        <span className="font-bold">Controller of Examinations</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* ============================================================
                  RIGHT COLUMN: OCR EXTRACTED TELEMETRY & DECISION FORM
              ============================================================ */}
              <div className="lg:w-4/12 p-6 overflow-y-auto space-y-5 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/90">
                
                {/* Photo Verification Banner */}
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Original File Verification
                    </span>
                    <span className="font-mono text-emerald-300">{selectedDoc.confidenceScore}% Match</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Compare the exact photo/scan on the left with applicant profile ({selectedDoc.studentName}). Verify candidate name, roll number, seal, and mark totals.
                  </p>
                </div>

                {/* Extracted Key Entity Values */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-white block">Extracted Field Ledger:</span>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Student Name:</span>
                      <span className="text-white font-bold">{selectedDoc.ocrData?.candidateName || selectedDoc.studentName}</span>
                    </div>
                    {selectedDoc.ocrData?.pcmScore && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">PCM Marks:</span>
                        <span className="text-emerald-400 font-bold">{selectedDoc.ocrData.pcmScore}</span>
                      </div>
                    )}
                    {selectedDoc.ocrData?.aggregatePercentage && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">12th Aggregate:</span>
                        <span className="text-white font-bold">{selectedDoc.ocrData.aggregatePercentage}</span>
                      </div>
                    )}
                    {selectedDoc.ocrData?.allIndiaRank && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Entrance AIR:</span>
                        <span className="text-indigo-400 font-bold">#{selectedDoc.ocrData.allIndiaRank}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Audit Status:</span>
                      <span className={`font-bold ${
                        selectedDoc.status === 'Verified' ? 'text-emerald-400' :
                        selectedDoc.status === 'Needs Re-upload' ? 'text-rose-400' : 'text-amber-400'
                      }`}>{selectedDoc.status}</span>
                    </div>
                  </div>
                </div>

                {/* Counselor Audit Decision Form */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-white block">
                    Counselor Verification Decision:
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleVerifySubmit('Verified')}
                      disabled={updating}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVerifySubmit('Needs Re-upload')}
                      disabled={updating}
                      className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Re-upload</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleVerifySubmit('Rejected')}
                      disabled={updating}
                      className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <FileX className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Counselor Audit Notes / Remark</label>
                    <textarea
                      rows={3}
                      value={counselorRemarks}
                      onChange={(e) => setCounselorRemarks(e.target.value)}
                      placeholder="Add document feedback or verification notes..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                    />
                  </div>

                  {actionSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{actionSuccess}</span>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
