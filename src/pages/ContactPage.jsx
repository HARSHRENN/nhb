import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { api } from '../lib/api';
import { trackEvent } from '../lib/analytics';
export function ContactPage() {
  const {
    content
  } = useData();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product inquiry',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const submit = async e => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const result = await api('/contact', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setReference(result.id);
      setStatus('sent');
      trackEvent('generate_lead', {
        lead_type: 'contact'
      });
    } catch (e) {
      setError(e.message);
      setStatus('');
    }
  };
  return <div className="brief-page"><section className="brief-page-heading wrap"><span className="eyebrow">CONTACT</span><h1>Let’s start a conversation.</h1><p>Talk to us about products, careers, or visiting our Amalsad plant.</p></section><section className="brief-section wrap contact-grid"><div><h2>Find us in Amalsad.</h2><address>{content.address}</address><div className="contact-links">{[['Sales', content.salesEmail], ['General inquiries', content.contactEmail], ['Careers', content.careersEmail]].map(([label, email]) => email && <p key={label}>{label}<a href={`mailto:${email}`}>{email}</a></p>)}{content.phone && <p>Phone<a href={`tel:${content.phone.replace(/[^+\d]/g, '')}`}>{content.phone}</a></p>}</div><iframe className="plant-map" title="NHB Amalsad plant location" src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapQuery || content.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.mapQuery || content.address)}`} target="_blank" rel="noreferrer">Open in Google Maps ↗</a></div><div className="brief-card"><h2>Send a message.</h2>{status === 'sent' ? <div role="status" className="brief-empty"><h3>Thank you. Your message has been received.</h3><p>Your inquiry is saved for the NHB team to review.</p><small>Reference: {reference}</small><button className="text-link" onClick={() => {
            setStatus('');
            setForm({
              name: '',
              email: '',
              phone: '',
              subject: 'Product inquiry',
              message: ''
            });
          }}>Send another message</button></div> : <form className="cms-form" onSubmit={submit}>{[['name', 'Your name', 'text'], ['email', 'Email address', 'email'], ['phone', 'Phone (optional)', 'tel']].map(([key, label, type]) => <label key={key}>{label}<input type={type} required={key !== 'phone'} autoComplete={key === 'name' ? 'name' : key === 'email' ? 'email' : 'tel'} value={form[key]} maxLength={200} onChange={e => setForm({
              ...form,
              [key]: e.target.value
            })} /></label>)}<label>Subject<select value={form.subject} onChange={e => setForm({
              ...form,
              subject: e.target.value
            })}>{['Product inquiry', 'Careers inquiry', 'Lean / plant visit', 'General inquiry'].map(s => <option key={s}>{s}</option>)}</select></label><label>Your message<textarea required rows={6} maxLength={10000} value={form.message} onChange={e => setForm({
              ...form,
              message: e.target.value
            })} /></label>{error && <p role="alert" className="form-error">{error}</p>}<button className="pill primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button></form>}</div></section></div>;
}
