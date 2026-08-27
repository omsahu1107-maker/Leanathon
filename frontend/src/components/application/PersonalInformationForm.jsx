import React from 'react';
import Card from '../common/Card';

export default function PersonalInformationForm({ formData, onChange }) {
  return (
    <Card className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Personal & Contact Details</h3>
        <p className="text-xs text-slate-500 mt-0.5">Please ensure all information matches your official government identity documents.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name (As per 10th Certificate) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={formData.dob || ''}
            onChange={(e) => onChange('dob', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="e.g. rahul.sharma@example.com"
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
          <select
            value={formData.gender || 'Male'}
            onChange={(e) => onChange('gender', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Category / Reservation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Category / Quota</label>
          <select
            value={formData.category || 'General'}
            onChange={(e) => onChange('category', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
          >
            <option value="General">General</option>
            <option value="EWS">Economically Weaker Section (EWS)</option>
            <option value="OBC-NCL">OBC (Non-Creamy Layer)</option>
            <option value="SC">Scheduled Caste (SC)</option>
            <option value="ST">Scheduled Tribe (ST)</option>
          </select>
        </div>
      </div>

      {/* Address Section */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Residential Address</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address</label>
            <input
              type="text"
              value={formData.address?.street || ''}
              onChange={(e) => onChange('address', { ...formData.address, street: e.target.value })}
              placeholder="e.g. 42, Garden View Residency, Sector 62"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
            <input
              type="text"
              value={formData.address?.city || ''}
              onChange={(e) => onChange('address', { ...formData.address, city: e.target.value })}
              placeholder="e.g. Noida"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
            <input
              type="text"
              value={formData.address?.state || ''}
              onChange={(e) => onChange('address', { ...formData.address, state: e.target.value })}
              placeholder="e.g. Uttar Pradesh"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
            <input
              type="text"
              value={formData.address?.pincode || ''}
              onChange={(e) => onChange('address', { ...formData.address, pincode: e.target.value })}
              placeholder="e.g. 201301"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
            <input
              type="text"
              value={formData.address?.country || 'India'}
              onChange={(e) => onChange('address', { ...formData.address, country: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
