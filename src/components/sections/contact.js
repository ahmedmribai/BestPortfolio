import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GlassCard, GradientText, AnimatedBorder } from '../glassmorphism';

const StyledContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 30px;
  }
`;

const ContactForm = styled.form`
  margin-top: 50px;
  text-align: left;
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  .form-group {
    position: relative;
    
    &.full-width {
      grid-column: 1 / -1;
    }
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: var(--lightest-slate);
    font-size: 14px;
    font-family: var(--font-mono);
    font-weight: 500;
    
    .required {
      color: var(--green);
    }
  }
  
  input,
  textarea {
    width: 100%;
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--lightest-slate);
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: var(--green);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 3px rgba(100, 255, 218, 0.1);
    }
    
    &.error {
      border-color: #ff6b6b;
    }
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  .error-message {
    color: #ff6b6b;
    font-size: 12px;
    margin-top: 5px;
    font-family: var(--font-mono);
  }
  
  .form-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
  
  .submit-btn {
    ${({ theme }) => theme.mixins.bigButton};
    position: relative;
    overflow: hidden;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &.success {
      background-color: #4caf50;
      border-color: #4caf50;
    }
  }
  
  .success-message {
    color: var(--green);
    text-align: center;
    margin-top: 20px;
    font-family: var(--font-mono);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitSuccess(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What's Next?</h2>

      <h2 className="title"><GradientText>Let's Build Something Amazing</GradientText></h2>

      <p>
        I'm always excited about new opportunities and collaborations. Whether you need a 
        <strong> web application</strong>, <strong>mobile app</strong>, or have an innovative 
        idea to discuss, I'd love to hear from you!
      </p>

      <AnimatedBorder>
        <GlassCard style={{ padding: '40px' }}>
          <ContactForm onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="John Doe"
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
              
              <div className="form-group">
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="john@example.com"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
            </div>
            
            <div className="form-group full-width">
              <label>
                Subject <span className="required">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? 'error' : ''}
                placeholder="Project Inquiry"
              />
              {errors.subject && <div className="error-message">{errors.subject}</div>}
            </div>
            
            <div className="form-group full-width">
              <label>
                Message <span className="required">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell me about your project..."
              />
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className={`submit-btn ${submitSuccess ? 'success' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : submitSuccess ? 'Sent!' : 'Send Message'}
              </button>
              <a className="email-link" href={`mailto:${email}`}>
                Or Email Directly
              </a>
            </div>
            
            {submitSuccess && (
              <div className="success-message">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </ContactForm>
        </GlassCard>
      </AnimatedBorder>
    </StyledContactSection>
  );
};

export default Contact;
