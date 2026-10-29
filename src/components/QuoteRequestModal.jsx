import React from 'react';
import { useData } from '../context/DataContext';
import { SubmissionModal } from './SubmissionModal';
const fields = [{
  key: 'companyName',
  label: 'Company',
  required: true
}, {
  key: 'contactPerson',
  label: 'Contact name'
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
  key: 'material',
  label: 'Material'
}, {
  key: 'ballDiameter',
  label: 'Ball diameter'
}, {
  key: 'precisionGrade',
  label: 'Precision grade'
}, {
  key: 'quantity',
  label: 'Quantity'
}, {
  key: 'application',
  label: 'Application'
}, {
  key: 'notes',
  label: 'Additional requirements',
  type: 'textarea'
}];
export function QuoteRequestModal({
  isOpen,
  onClose
}) {
  const {
    submitQuote
  } = useData();
  return <SubmissionModal isOpen={isOpen} onClose={onClose} title="Request a quote" intro="Share your requirements and attach a drawing for our team to review." fields={fields} submit={submitQuote} attachment={{
    key: 'drawingFile',
    label: 'Engineering drawing (PDF, DWG, DXF or STEP)',
    accept: '.pdf,.dwg,.dxf,.step,.stp'
  }} />;
}
