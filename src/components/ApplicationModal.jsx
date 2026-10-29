import React from 'react';
import { useData } from '../context/DataContext';
import { SubmissionModal } from './SubmissionModal';
const fields = [{
  key: 'applicantName',
  label: 'Full name',
  required: true
}, {
  key: 'email',
  label: 'Email address',
  type: 'email',
  required: true
}, {
  key: 'phone',
  label: 'Phone',
  type: 'tel'
}, {
  key: 'currentLocation',
  label: 'Current location'
}, {
  key: 'experience',
  label: 'Relevant experience'
}, {
  key: 'noticePeriod',
  label: 'Notice period'
}, {
  key: 'summary',
  label: 'Tell us about your background',
  type: 'textarea'
}];
export function ApplicationModal({
  isOpen,
  onClose,
  job
}) {
  const {
    submitApplication
  } = useData();
  return <SubmissionModal isOpen={isOpen} onClose={onClose} title={`Apply for ${job?.title || 'a role at NHB'}`} intro="Share your details with our recruitment team." fields={fields} submit={submitApplication} extra={{
    jobTitle: job?.title || 'General Application'
  }} attachment={{
    key: 'resumeFile',
    label: 'Resume (PDF or Word)',
    accept: '.pdf,.doc,.docx'
  }} />;
}
