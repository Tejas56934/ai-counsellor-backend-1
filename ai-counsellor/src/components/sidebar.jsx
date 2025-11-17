import React, { useEffect, useRef, useState } from "react";
import { askChat, submitAdmission } from "../api";
import Select from "react-select";
import { locationData } from "./locationData";
import Logo from "../assets/Logo.png"





// Admission Wizard Component
const AdmissionWizard = ({ onSubmit, onCancel, initial = {} }) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    country: initial.country || "",
    state: initial.state || "",
    city: initial.city || "",
    dob: initial.dob || "",
    fullName: initial.fullName || "",
    email: initial.email || "",
    mobile: initial.mobile || "",
    gender: initial.gender || "",
    address: initial.address || "",
  });

  const countries = Object.keys(locationData).map(c => ({ value: c, label: c }));
  const states =
    form.country && locationData[form.country]
      ? Object.keys(locationData[form.country]).map(s => ({ value: s, label: s }))
      : [];
  const cities =
    form.country && form.state
      ? locationData[form.country][form.state].map(city => ({ value: city, label: city }))
      : [];

  const update = (field, value) => {
    if (field === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (field === "country") {
      setForm(f => ({ ...f, country: value, state: "", city: "" }));
    } else if (field === "state") {
      setForm(f => ({ ...f, state: value, city: "" }));
    } else {
      setForm(f => ({ ...f, [field]: value }));
    }
  };

  const next = () => setStep(s => Math.min(3, s + 1));
  const prev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = e => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!form.fullName.trim()) return setError("Full name is required");
    if (!emailRegex.test(form.email)) return setError("Email must be a valid Gmail address");
    if (!mobileRegex.test(form.mobile)) return setError("Mobile number must be exactly 10 digits");

    window.open("https://www.edupluscampus.com/", "_blank", "noopener,noreferrer");
    onSubmit(form);
  };

  return (
    <div className="wizard">
      {error && <p className="error-msg">{error}</p>}

      {step === 1 && (
        <div className="wizard-step">
          <h4>📍 Location</h4>

          <label>Country</label>
           <Select
                      options={countries}
                      value={form.country ? { value: form.country, label: form.country } : null}
                      onChange={opt => update("country", opt.value)}
                      placeholder="Select Country"
                    />

                    <label>State</label>
                    <Select
                      options={states}
                      value={form.state ? { value: form.state, label: form.state } : null}
                      onChange={opt => update("state", opt.value)}
                      placeholder="Select State"
                      isDisabled={!form.country}
                    />

                    <label>City</label>
                    <Select
                      options={cities}
                      value={form.city ? { value: form.city, label: form.city } : null}
                      onChange={opt => update("city", opt.value)}
                      placeholder="Select City"
                      isDisabled={!form.state}
                    />
          <div className="wizard-controls">
            <button type="button" onClick={next}>Next →</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wizard-step">
          <h4>📅 Date of Birth</h4>
          <input
            type="date"
            value={form.dob}
            onChange={e => update("dob", e.target.value)}
          />
          <div className="wizard-controls">
            <button type="button" onClick={prev}>← Back</button>
            <button type="button" onClick={next}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="wizard-step" onSubmit={handleSubmit}>
          <h4>👤 Personal Details</h4>
          <input placeholder="Full name" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
          <input placeholder="Email (must be Gmail)" value={form.email} onChange={e => update('email', e.target.value)} />
          <input placeholder="Mobile (10 digits)" value={form.mobile} onChange={e => update('mobile', e.target.value)} />
          <input placeholder="Gender" value={form.gender} onChange={e => update('gender', e.target.value)} />
          <input placeholder="Address" value={form.address} onChange={e => update('address', e.target.value)} />

          <div className="wizard-controls">
            <button type="button" onClick={prev}>← Back</button>
            <button type="submit">Submit ✓</button>
          </div>
        </form>
      )}
    </div>
  );
};

const CounsellorImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2300f7ff'/%3E%3Ctext x='50' y='65' text-anchor='middle' fill='%23000' font-size='50' font-weight='bold'%3E🤖%3C/text%3E%3C/svg%3E";


const userStyle = `
  :root {
    --primary: #6366f1;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    --glow: #06b6d4;
    --surface: rgba(15, 23, 42, 0.7);
    --surface-light: rgba(30, 41, 59, 0.8);
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.2); }
    50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(139, 92, 246, 0.4); }
  }

  @keyframes slide-in {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  /* AI Toggle Button */
  .ai-toggle {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--gradient-hero);
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4),
                0 0 0 0 rgba(99, 102, 241, 0.4),
                inset 0 1px 1px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    z-index: 9999;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .ai-toggle:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 12px 48px rgba(99, 102, 241, 0.6),
                0 0 60px rgba(139, 92, 246, 0.4),
                inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }

  .ai-toggle.open {
    transform: scale(0.95);
    animation: none;
  }

  .ai-toggle:active {
    transform: scale(0.9);
  }

  .ai-icon {
    width: 38px;
    height: 38px;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
    animation: float 3s ease-in-out infinite;
  }

  /* Tooltip */
  .counsellor-tooltip {
    position: absolute;
    bottom: calc(100% + 16px);
    margin-left: -300px;
    transform: translateX(50%) translateY(8px);
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.95));
    backdrop-filter: blur(10px);
    color: white;
    padding: 10px 16px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    font-size: clamp(13px, 2.5vw, 15px);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10000;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .counsellor-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 10%;
    transform: translateX(50%);
    border: 8px solid transparent;
    border-top-color: rgba(99, 102, 241, 0.95);
  }

  .ai-toggle:hover .counsellor-tooltip {
    opacity: 1;
    transform: translateX(50%) translateY(0);
  }

  /* Sidebar */
  .sidebar {
    position: fixed;
    right: -420px;
    width: 420px;
    height: calc(100vh - 80px);
    top: 40px;
    background: var(--surface);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px 0 0 20px;
    box-shadow: -12px 0 60px rgba(0, 0, 0, 0.5),
                0 0 80px rgba(99, 102, 241, 0.2);
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1050;
    overflow: hidden;
  }

  .sidebar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(180deg,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 100%);
    pointer-events: none;
  }

  .sidebar.active,
  .sidebar.open {
    right: 0;
  }

  /* Sidebar Header */
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    border: 1px solid orange;
    background: White;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .sidebar-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(99, 102, 241, 0.5) 50%,
      transparent 100%);
  }

  .sidebar-header h3 {
    margin: 0;
    color: Black;
    font-size: 1.1rem;
    font-family: "Georgia", serif;
    font-weight: 700;
    opacity: 0.3;
    text-shadow: 0 2px 10px white;
    letter-spacing: 0.5px;
  }

  .logoImage {
    height: 25px;
    width: 56px;
    margin-left: -70px;
    margin-top: 5px;
    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.3));
  }

  .sidebar-header small {
    color: var(--text-secondary);
    font-size: clamp(0.8rem, 2vw, 0.9rem);
  }

  .header-actions .minimize {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: Black;
    font-size: clamp(1.1rem, 2.5vw, 1.2rem);
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 10px;
    line-height: 1;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .header-actions .minimize:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
    box-shadow: 0 4px 16px rgba(236, 72, 153, 0.4);
  }

  /* Chat Area */
  .chat-area {
    padding: 14px;
    display: flex;
    flex-direction: column;
    background: #FDFBEE;
    gap: 12px;
    color: white;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }

  .chat-area::-webkit-scrollbar {
    width: 8px;
  }

  .chat-area::-webkit-scrollbar-track {
    background: #F4991A;
    border-radius: 10px;
  }

  .chat-area::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6366f1, #8b5cf6);
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .chat-area::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #8b5cf6, #ec4899);
  }

  .empty-state {
    color: var(--text-secondary);
    padding: 14px 16px;
    border-radius: 14px;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.1) 0%,
      rgba(139, 92, 246, 0.1) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.95rem;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  /* Chat Bubbles */
  .chat-bubble {
    padding: 10px 14px;
    border-radius: 16px;
    max-width: 78%;
    line-height: 1.5;
    font-size: 0.92rem;
    word-wrap: break-word;
    animation: slide-in 0.4s ease-out;
    position: relative;
    backdrop-filter: blur(10px);
  }

  .chat-bubble.bot {
    align-self: flex-start;
    margin-left: 20px;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.2) 0%,
      rgba(139, 92, 246, 0.2) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: Black;

  }

  .chat-bubble.bot::before {
    content: '🙋';
    position: absolute;
    left: -32px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }

  .chat-bubble.user {
    align-self: flex-end;
    background: linear-gradient(135deg, #ec4899 0%, #f59e0b 100%);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* Action Buttons */
  .actions {
    display: flex;
    gap: 10px;
    padding: 8px 0;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .actions button {
    flex: 1;
    min-width: 100px;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.2) 0%,
      rgba(139, 92, 246, 0.2) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: Black;
    padding: 10px 14px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .actions button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
    transition: left 0.5s ease;
  }

  .actions button:hover::before {
    left: 100%;
  }

  .actions button:hover {
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.4) 0%,
      rgba(139, 92, 246, 0.4) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(99, 102, 241, 0.4);
  }

  /* Sidebar Footer */
  .sidebar-footer {
    display: flex;
    gap: 10px;
    padding: 12px 14px;
    border-top: 1px solid orange;
    background: #F9F5F0;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
    position: relative;
  }

  .sidebar-footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(99, 102, 241, 0.5) 50%,
      transparent 100%);
  }

  .sidebar-footer input {
    flex: 1;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid alicewhite;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: Black;
    outline: none;
    font-size: 0.92rem;
    transition: all 0.3s ease;
  }

  .sidebar-footer input::placeholder {
    color: Black;
  }

  .sidebar-footer input:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(99, 102, 241, 0.8);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }

  .send-btn {
    padding: 10px 18px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #ec4899 0%, #f59e0b 100%);
    color: white;
    font-weight: 700;
    cursor: pointer;
    font-size: 0.92rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(236, 72, 153, 0.4);
    position: relative;
    overflow: hidden;
  }

  .send-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .send-btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .send-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(236, 72, 153, 0.6);
  }

  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Wizard Styles */
  .wizard {
    padding: 14px;
    background: linear-gradient(135deg,
      rgba(99, 102, 241, 0.15) 0%,
      rgba(139, 92, 246, 0.15) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    backdrop-filter: blur(10px);

    animation: slide-in 0.4s ease-out;
  }

  .wizard-step {
    background: linear-gradient(135deg,
      rgba(30, 41, 59, 0.95) 0%,
      rgba(30, 41, 59, 0.85) 100%);
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    margin-top: 0;
    transition: all 0.4s ease;
    color: Black;

    padding-left: 13px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
  }

  .wizard-step:hover {
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.3);
  }

  .wizard-step h4 {
    font-size: 1.1rem;
    color: white;
    margin-bottom: 18px;
    padding-bottom: 10px;
    font-weight: 700;
    position: relative;
    display: inline-block;
  }

  .wizard-step h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ec4899, #f59e0b);
    border-radius: 2px;
  }

  .wizard-step input,
  .wizard-step select {
    width: 100%;
    padding: 10px 14px;
    margin: 8px 0px 16px 0;
    border-radius: 10px;
    margin-left: 5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    font-size: 0.92rem;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  .wizard-step input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .wizard-step select option {
    background: #1e293b;
    color: White;
  }

  .wizard-step input:focus,
  .wizard-step select:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.8);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
  }

  .wizard-step input:hover,
  .wizard-step select:hover {
    border-color: rgba(139, 92, 246, 0.6);
  }

  .wizard-step input:disabled,
  .wizard-step select:disabled {
    background: rgba(100, 100, 100, 0.3);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .wizard-step label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 0.88rem;
    color: White;
    letter-spacing: 0.3px;
  }

  .wizard-controls {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 18px;
  }

  .wizard-controls button {
    flex: 1;
    padding: 10px 16px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #ec4899 0%, #f59e0b 100%);
    color: white;
    font-weight: 700;
    font-size: 0.92rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(236, 72, 153, 0.4);
    position: relative;
    overflow: hidden;
  }

  .wizard-controls button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .wizard-controls button:hover::after {
    width: 400px;
    height: 400px;
  }

  .wizard-controls button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(236, 72, 153, 0.6);
  }

  .wizard-controls button:disabled {
    background: rgba(100, 100, 100, 0.4);
    cursor: not-allowed;
    box-shadow: none;
  }

  /* Error Message */
  .error-msg {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2));
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.4);
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 0.88rem;
    backdrop-filter: blur(10px);
  }

  /* TABLET (601px - 1024px) */
  @media (max-width: 1024px) and (min-width: 601px) {
    .sidebar {
      width: 380px;
      height: 75vh;
      top: 12.5vh;
      border-radius: 18px;
      right: -380px;
    }
    .sidebar.active,
    .sidebar.open {
      right: 15px;
    }
    .chat-bubble {
      max-width: 75%;
    }
  }

  /* MOBILE (≤600px) */
  @media (max-width: 600px) {
    .sidebar {
      width: 85%;
      height: 75vh;
      top: 12.5vh;
      right: -100%;
      left: auto;
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    }
    .sidebar.active,
    .sidebar.open {
      right: 7.5%;
      left: auto;
    }

    .ai-toggle {
      right: 16px;
      bottom: 16px;
      width: 56px;
      height: 56px;
    }

    .ai-icon {
      width: 34px;
      height: 34px;
    }

    .chat-area {
      padding: 12px;
      gap: 10px;
    }

    .chat-bubble {
      max-width: 85%;
      font-size: 0.9rem;
      padding: 9px 12px;
    }

    .chat-bubble.bot::before {
      left: -28px;
      font-size: 18px;
    }

    .actions {
      flex-direction: column;
      gap: 8px;
    }
    .actions button {
      width: 100%;
      min-width: unset;
    }

    .sidebar-footer input,
    .send-btn {
      padding: 9px 12px;
      font-size: 0.9rem;
    }

    .wizard-controls {
      flex-direction: column;
    }
    .wizard-controls button {
      width: 100%;
    }

    .wizard-step {
      padding: 18px 20px;
    }

    .counsellor-tooltip {
      font-size: 12px;
      padding: 7px 11px;
    }

    .logoImage {
      margin-left: -55px;

      height: 24px;
      width: 48px;
    }
  }

  /* EXTRA SMALL (≤360px) */
  @media (max-width: 360px) {
    .ai-toggle {
      width: 52px;
      height: 52px;
      right: 12px;
      bottom: 12px;
    }
    .ai-icon {
      width: 32px;
      height: 32px;
    }
    .sidebar-header {
      padding: 12px;
    }
    .sidebar-header h3 {
      font-size: 1rem;
    }
    .chat-bubble {
      font-size: 0.875rem;
      padding: 8px 12px;
    }
    .sidebar-footer {
      padding: 10px;
      gap: 8px;
    }
    .sidebar-footer input {
      padding: 8px 10px;
      font-size: 0.875rem;
    }
    .send-btn {
      padding: 8px 12px;
      font-size: 0.875rem;
    }
    .actions button {
      padding: 8px 10px;
      font-size: 0.85rem;
    }
  }

  /* LANDSCAPE MOBILE */
  @media (max-height: 500px) and (orientation: landscape) {
    .sidebar {
      height: 85vh;
      top: 7.5vh;
    }
    .chat-area {
      padding: 10px;
    }
    .sidebar-header,
    .sidebar-footer {
      padding: 10px;
    }
    .chat-bubble {
      padding: 8px 12px;
    }
  }
`;

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showWizard, setShowWizard] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show intro messages when first opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => addBot("Hello from EDUPlus Campus AI Counselor."), 400);
      setTimeout(() => addBot("I'm here to help with admissions, registrations and CRM queries."), 1000);
      setTimeout(() => addBot("Try: 'What are the admission steps?' or click '🎓 Admissions'"), 1500);
    }
  }, [open]);

  function addBot(text) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  }

  function addUser(text) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  async function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    addUser(text);
    setInput("");
    setLoading(true);
    try {
      const reply = await askChat(text, "CRM");
      addBot(typeof reply === "string" ? reply : JSON.stringify(reply));
    } catch (err) {
      addBot("Sorry, I could not reach AI. " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  }

  async function handleAdmissionSubmit(formData) {
    setLoading(true);
    try {
      const resp = await submitAdmission(formData);
      setShowWizard(false);
      addBot("Thanks — admission submitted. Our team will contact you shortly.");
      if (resp?.redirect) window.location.href = "https://www.edupluscampus.com/";
    } catch (err) {
      addBot("Error submitting admission: " + (err?.error || err?.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{userStyle}</style>
      <button
        className={`ai-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle AI Counselor"
      >
        <div className="counsellor-tooltip">I'm your Virtual Assistant!</div>
        <img src={CounsellorImage} alt="AI" className="ai-icon" />
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="sidebar-header">
          <div>
            <h3>AI COUNSELLOR</h3>
            <img src={Logo} alt="logo" className="logoImage"/>
          </div>
          <div className="header-actions">
            <button
              className="minimize"
              onClick={() => setOpen(false)}
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="chat-area" role="log" aria-live="polite">
          {messages.length === 0 && (
            <div className="empty-state">Hi 👋 — Ask me anything about admissions or CRM.</div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${msg.from === "bot" ? "bot" : "user"}`}
            >
              {msg.text}
            </div>
          ))}

          {showWizard ? (
            <AdmissionWizard onCancel={() => setShowWizard(false)} onSubmit={handleAdmissionSubmit} />
          ) : (
            <div className="actions">
              <button onClick={() => setShowWizard(true)}>🎓 Admissions</button>
              <button onClick={() => { setMessages([]); addBot("How can I help you today?"); }}>↺ Reset</button>
            </div>
          )}

          <div ref={scrollRef}></div>
        </div>

        <div className="sidebar-footer">
          <input
            type="text"
            placeholder="Type your question related to CRM.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            aria-label="Message input"
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="send-btn">
            {loading ? "..." : "Send"}
          </button>
        </div>
      </aside>
    </>
  );
}