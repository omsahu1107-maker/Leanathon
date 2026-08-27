import React, { useState, useEffect } from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Edit2,
  Save,
  CheckCircle2,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import profileService from '../services/profileService';

export default function Profile() {
  const { user, profile: contextProfile, updateStudentProfile } = useAuth();
  const { application } = useApplication();

  const [profile, setProfile] = useState(() => ({
    id: user?.id || 'std_9841',
    name: user?.name || 'Aditya Mohanty',
    email: user?.email || 'aditya.mohanty@example.com',
    phone: user?.phone || '+91 94371 88290',
    dob: '2005-04-14',
    category: 'General',
    bloodGroup: 'B+',
    applicationId: user?.applicationId || 'ADM-2026-8941',
    targetProgram: user?.program || 'B.Tech in Computer Science & Engineering',
    address: {
      street: 'Campus Residence / Native Address',
      city: 'Bhubaneswar',
      state: user?.state || 'Odisha',
      pincode: '751024'
    },
    academics: {
      tenth: {
        school: 'Secondary High School',
        board: 'CBSE / State Board',
        percentage: 88.0
      },
      twelfth: {
        school: 'Junior College of Science',
        board: 'CHSE / CBSE Board',
        percentage: parseFloat(user?.pcmPercentage) || 89.5,
        pcmPercentage: parseFloat(user?.pcmPercentage) || 89.5
      },
      entranceExam: {
        examName: 'JEE (Main) 2026',
        scorePercentile: 94.2,
        rank: '18450'
      }
    },
    guardian: {
      name: 'B. K. Mohanty',
      relation: 'Father',
      phone: user?.phone || '+91 94371 88290',
      occupation: 'Professional'
    },
    ...(contextProfile || {})
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const studentId = user?.id || 'std_9841';
        const data = await profileService.getProfile(studentId);
        if (data) {
          setProfile(prev => ({
            ...prev,
            ...data,
            name: user?.name || data.name || prev.name,
            email: user?.email || data.email || prev.email,
            phone: user?.phone || data.phone || prev.phone,
            applicationId: user?.applicationId || data.applicationId || prev.applicationId,
            targetProgram: user?.program || data.targetProgram || prev.targetProgram,
            address: {
              ...prev.address,
              ...(data.address || {}),
              state: user?.state || data.address?.state || prev.address?.state
            },
            academics: {
              ...prev.academics,
              ...(data.academics || {}),
              twelfth: {
                ...prev.academics?.twelfth,
                ...(data.academics?.twelfth || {}),
                percentage: parseFloat(user?.pcmPercentage) || data.academics?.twelfth?.percentage || 89.5
              }
            }
          }));
        }
      } catch (err) {
        console.warn('Failed to load profile:', err);
      }
    }
    loadData();
  }, [user]);

  const handleFieldChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setProfile(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateStudentProfile(profile);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully to central admission registry.</span>
        </div>
      )}

      {/* Profile Header Card */}
      <Card className="border-slate-200/90 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
              alt={profile.name || user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-brand-50 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{profile.name || user?.name || 'Aditya Mohanty'}</h1>
                <Badge variant="primary" size="sm">Verified Candidate</Badge>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                <span className="font-mono text-slate-700">ID: {user?.id || profile.id}</span>
                <span>•</span>
                <span>Category: <strong className="text-slate-700">{profile.category || 'General'}</strong></span>
                <span>•</span>
                <span>Blood Group: <strong className="text-slate-700">{profile.bloodGroup || 'B+'}</strong></span>
              </div>

              <p className="text-xs text-brand-600 font-semibold mt-1 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Target: {profile.targetProgram || user?.program || profile.targetCourseName || 'B.Tech in Computer Science & Engineering'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  loading={isSaving}
                  icon={Save}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Application Snapshot Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Application Number</span>
          <span className="text-sm font-bold font-mono text-brand-600 mt-1 block">
            {user?.applicationId || profile.applicationId || application?.id || 'ADM-2026-8941'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Current Status</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-slate-900">{application?.currentStage || 'Document Verification'}</span>
            <Badge variant="primary" size="sm">Active</Badge>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Target Intake</span>
          <span className="text-sm font-bold text-slate-900 mt-1 block">
            Autumn 2026 Batch
          </span>
        </div>
      </div>

      {/* 1. Personal Information Section */}
      <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><User className="w-4 h-4 text-brand-600" /> Personal & Contact Information</h3>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Full Legal Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            ) : (
              <p className="font-semibold text-slate-800 text-sm">{profile.name || user?.name}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={profile.dob}
                onChange={(e) => handleFieldChange('dob', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            ) : (
              <p className="font-semibold text-slate-800 text-sm">{profile.dob || '2005-04-14'}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            ) : (
              <p className="font-semibold text-slate-800 text-sm">{profile.email || user?.email}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Mobile Contact</label>
            {isEditing ? (
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            ) : (
              <p className="font-semibold text-slate-800 text-sm">{profile.phone || user?.phone}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-400 font-medium mb-1">Residential Address</label>
            {isEditing ? (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Street"
                  value={profile.address?.street}
                  onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
                  className="col-span-2 px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={profile.address?.city}
                  onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={profile.address?.state}
                  onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
            ) : (
              <p className="font-medium text-slate-800">
                {profile.address?.street || 'Campus Residence'}, {profile.address?.city || 'Bhubaneswar'}, {profile.address?.state || user?.state || 'Odisha'} - {profile.address?.pincode || '751024'}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* 2. Academic Information Section */}
      <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><GraduationCap className="w-4 h-4 text-indigo-600" /> Academic Qualifications</h3>}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-slate-400 font-medium block">10th Standard</span>
            <span className="font-extrabold text-slate-900 text-base mt-1 block">{profile.academics?.tenth?.percentage || 88.0}%</span>
            <p className="text-slate-500 text-[11px] mt-0.5">{profile.academics?.tenth?.school || 'Secondary School'} ({profile.academics?.tenth?.board || 'State / CBSE'})</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-slate-400 font-medium block">12th Standard (PCM)</span>
            <span className="font-extrabold text-slate-900 text-base mt-1 block">
              {profile.academics?.twelfth?.percentage || user?.pcmPercentage || 89.5}%
            </span>
            <p className="text-slate-500 text-[11px] mt-0.5">{profile.academics?.twelfth?.school || 'Higher Secondary Science'} ({profile.academics?.twelfth?.board || 'CHSE / CBSE'})</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-slate-400 font-medium block">Entrance Examination</span>
            <span className="font-extrabold text-brand-600 text-base mt-1 block">{profile.academics?.entranceExam?.scorePercentile || 94.2} %tile</span>
            <p className="text-slate-500 text-[11px] mt-0.5">{profile.academics?.entranceExam?.examName || 'JEE (Main) 2026'} • AIR {profile.academics?.entranceExam?.rank || '18450'}</p>
          </div>
        </div>
      </Card>

      {/* 3. Guardian Information Section */}
      <Card header={<h3 className="font-bold text-slate-900 text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Guardian & Emergency Contact</h3>}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Guardian Name</span>
            <span className="font-semibold text-slate-800 text-sm">{profile.guardian?.name || 'Parent / Guardian'}</span>
            <span className="text-slate-400 text-[11px] block">({profile.guardian?.relation || 'Father'})</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Guardian Phone</span>
            <span className="font-semibold text-slate-800 text-sm">{profile.guardian?.phone || user?.phone || '+91 94371 88290'}</span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Occupation</span>
            <span className="font-semibold text-slate-800 text-sm">{profile.guardian?.occupation || 'Professional / Business'}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
