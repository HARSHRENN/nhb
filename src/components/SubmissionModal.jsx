import React, { useEffect, useRef, useState, useId } from 'react';
import { X } from 'lucide-react';
export function SubmissionModal({
  isOpen,
  onClose,
  title,
  intro,
  fields,
  submit,
  attachment,
  extra = {}
}) {
  const identifier = useId();
  const ref = useRef(null);
  const [values, setValues] = useState({});
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (isOpen && !d.open) d.showModal();else if (!isOpen && d.open) d.close();
    if (!isOpen) {
      setValues({});
      setFile(null);
      setError('');
      setResult(null);
      formRef.current?.reset();
    }
  }, [isOpen]);
  const send = async e => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const body = new FormData();
    for (const [key, value] of Object.entries({
      ...values,
      ...extra
    })) body.append(key, value);
    if (file) body.append(attachment.key, file);
    try {
      const response = await submit(body);
      if (!response.success) throw new Error(response.error || 'Could not submit your request.');
      setResult(response.quote || response.application);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };
  return <dialog ref={ref} className="brief-dialog submission-dialog" aria-labelledby={`submission-${identifier}`} onCancel={e => {
    e.preventDefault();
    if (!busy) onClose();
  }} onClick={e => {
    if (e.target === e.currentTarget && !busy) onClose();
  }}><div className="dialog-heading"><h2 id={`submission-${identifier}`}>{title}</h2><button aria-label="Close form" disabled={busy} onClick={onClose}><X /></button></div><div className="lightbox-caption">{result ? <div role="status"><h3>Thank you. Your submission has been received.</h3><p>Your details are saved for our team to review.</p><p>Reference: {result.id}</p><button className="pill primary" onClick={onClose}>Done</button></div> : <><p>{intro}</p><form ref={formRef} className="cms-form" onSubmit={send}>{fields.map(({
            key,
            label,
            type = 'text',
            required = false
          }) => <label key={key}>{label}{type === 'textarea' ? <textarea rows={4} maxLength={10000} value={values[key] || ''} onChange={e => setValues({
              ...values,
              [key]: e.target.value
            })} required={required} /> : <input type={type} required={required} value={values[key] || ''} maxLength={300} onChange={e => setValues({
              ...values,
              [key]: e.target.value
            })} />}</label>)}<label>{attachment.label}<input type="file" accept={attachment.accept} onChange={e => {
              const f = e.target.files?.[0];
              if (f?.size > 25 * 1024 * 1024) {
                setError('Attachment must be under 25 MB.');
                e.target.value = '';
                setFile(null);
              } else {
                setError('');
                setFile(f || null);
              }
            }} /><small>Optional, up to 25 MB.</small></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="pill primary" disabled={busy}>{busy ? 'Submitting…' : 'Submit'}</button></form></>}</div></dialog>;
}
