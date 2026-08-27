import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ApplicationStepper from '../components/application/ApplicationStepper';
import PersonalInformationForm from '../components/application/PersonalInformationForm';
import AcademicInformationForm from '../components/application/AcademicInformationForm';
import CoursePreferenceForm from '../components/application/CoursePreferenceForm';
import DocumentUploadStep from '../components/application/DocumentUploadStep';
import ApplicationReview from '../components/application/ApplicationReview';
import Button from '../components/common/Button';
import ProgressBar from '../components/common/ProgressBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';
import applicationService from '../services/applicationService';
import profileService from '../services/profileService';

export default function Application() {
  const [searchParams] = useSearchParams();
  const courseParam = searchParams.get('course');
  const navigate = useNavigate();

  const { user } = useAuth();
  const { application, documents, fetchDocuments, saveApplication, loading } = useApplication();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const [formData, setFormData] = useState(() => ({
    name: user?.name || 'Rishi Kumar',
    dob: '2005-04-14',
    email: user?.email || 'rishi@gmail.com',
    phone: user?.phone || '+91 94371 88290',
    gender: 'Male',
    category: 'General',
    nationality: 'Indian',
    address: {
      street: '',
      city: 'Bhubaneswar',
      state: user?.state || 'Odisha',
      pincode: '751024',
      country: 'India'
    },
    academics: {
      tenth: {
        board: 'CBSE / State Board',
        school: '',
        percentage: '88.0',
        passingYear: '2024'
      },
      twelfth: {
        board: 'CHSE / CBSE Board',
        school: '',
        percentage: user?.pcmPercentage || '89.5',
        passingYear: '2026',
        stream: 'Science (PCM)'
      },
      entranceExam: {
        examName: 'JEE Main 2026',
        scorePercentile: '94.2',
        rank: '18450'
      }
    },
    coursePreferences: [
      { priority: 1, courseId: 'btech-cse', courseName: user?.program || 'B.Tech in Computer Science & Engineering' },
      { priority: 2, courseId: 'btech-aiml', courseName: 'B.Tech in Artificial Intelligence & Machine Learning' },
      { priority: 3, courseId: 'btech-ece', courseName: 'B.Tech in Electronics & Communication' }
    ]
  }));

  // Load active profile data into form state
  useEffect(() => {
    async function loadFormData() {
      try {
        const studentId = user?.id || 'std_9841';
        const p = await profileService.getProfile(studentId);
        if (p) {
          setFormData(prev => ({
            ...prev,
            name: user?.name || p.name || prev.name,
            dob: p.dob || prev.dob,
            email: user?.email || p.email || prev.email,
            phone: user?.phone || p.phone || prev.phone,
            gender: p.gender || prev.gender,
            category: p.category || prev.category,
            address: {
              ...prev.address,
              ...(p.address || {}),
              state: user?.state || p.address?.state || prev.address?.state
            },
            academics: {
              ...prev.academics,
              ...(p.academics || {}),
              twelfth: {
                ...prev.academics?.twelfth,
                ...(p.academics?.twelfth || {}),
                percentage: user?.pcmPercentage || p.academics?.twelfth?.percentage || prev.academics.twelfth.percentage
              }
            },
            coursePreferences: [
              { priority: 1, courseId: 'btech-cse', courseName: user?.program || prev.coursePreferences[0]?.courseName }
            ]
          }));
        }
      } catch (err) {
        console.warn('Using local application defaults:', err);
      }
    }
    loadFormData();
  }, [user]);

  // Handle course param selection
  useEffect(() => {
    if (courseParam) {
      const courseMap = {
        'btech-cse': 'B.Tech in Computer Science & Engineering',
        'btech-aiml': 'B.Tech in Artificial Intelligence & Machine Learning',
        'btech-ece': 'B.Tech in Electronics & Communication',
        'btech-mech': 'B.Tech in Mechanical & Mechatronics Engineering',
        'mca-cloud': 'Master of Computer Applications (Cloud & DevOps)',
        'mba-tech': 'MBA in Technology Management & Business Analytics'
      };

      if (courseMap[courseParam]) {
        setFormData(prev => {
          const updated = [...prev.coursePreferences];
          updated[0] = {
            priority: 1,
            courseId: courseParam,
            courseName: courseMap[courseParam]
          };
          return { ...prev, coursePreferences: updated };
        });
        setCurrentStep(3); // Jump to course step
      }
    }
  }, [courseParam]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveApplication({
        ...formData,
        lastSaved: new Date().toISOString()
      });
      const studentId = user?.id || 'std_9841';
      await profileService.updateProfile(studentId, formData);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    } catch (err) {
      console.error('Failed to save draft:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleNextStep = async () => {
    await handleSaveDraft();
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    try {
      const appId = user?.applicationId || application?.id || 'ADM-2026-8941';
      await applicationService.submitApplication(appId);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/application-status');
      }, 1500);
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSubmitting(false);
    }
  };

  if (loading && !application) {
    return <LoadingSpinner message="Loading application form..." />;
  }

  // Dynamic progress calculated directly from active step (Step 1 = 20%, Step 2 = 40%, etc.)
  const stepProgress = Math.min(100, Math.round((currentStep / 5) * 100));

  // Only steps preceding currentStep are completed
  const completedStepIds = Array.from({ length: currentStep - 1 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admission Application Form</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Academic Session 2026-2027 • Application ID: <span className="font-mono font-bold text-brand-600">{user?.applicationId || application?.id || 'ADM-2026-8941'}</span>
          </p>
        </div>

        {/* Progress Gauge */}
        <div className="w-full sm:w-56">
          <ProgressBar percentage={stepProgress} size="md" color="brand" showLabel />
        </div>
      </div>

      {/* Save Toast Feedback */}
      {saveToast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Application draft saved successfully to secure registry.</span>
        </div>
      )}

      {/* 5-Step Visual Stepper */}
      <ApplicationStepper
        currentStep={currentStep}
        onStepClick={(step) => setCurrentStep(step)}
        completedSteps={completedStepIds}
      />

      {/* Step Form Rendering */}
      <div className="min-h-[420px]">
        {currentStep === 1 && (
          <PersonalInformationForm formData={formData} onChange={handleFieldChange} />
        )}
        {currentStep === 2 && (
          <AcademicInformationForm formData={formData} onChange={handleFieldChange} />
        )}
        {currentStep === 3 && (
          <CoursePreferenceForm formData={formData} onChange={handleFieldChange} />
        )}
        {currentStep === 4 && (
          <DocumentUploadStep
            documents={documents}
            onUploadSuccess={() => fetchDocuments()}
          />
        )}
        {currentStep === 5 && (
          <ApplicationReview formData={formData} documents={documents} />
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              size="md"
              icon={ArrowLeft}
              onClick={handlePreviousStep}
            >
              Previous Step
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="md"
            icon={Save}
            loading={isSaving}
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>

          {currentStep < 5 ? (
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              onClick={handleNextStep}
            >
              Save & Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              loading={isSubmitting}
              icon={CheckCircle2}
              onClick={handleFinalSubmission}
            >
              Final Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
