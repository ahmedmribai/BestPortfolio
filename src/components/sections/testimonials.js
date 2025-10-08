import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { GlassCard, GradientText } from '../glassmorphism';
import { Icon } from '@components/icons';

const TestimonialsSection = styled.section`
  margin: 0 auto;
  padding: 100px 0;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
    
    h2 {
      font-size: clamp(26px, 5vw, var(--fz-heading));
      margin-bottom: 20px;
    }
    
    p {
      color: var(--slate);
      max-width: 600px;
      margin: 0 auto;
    }
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 30px;
    margin-top: 50px;
  
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  
    @media (max-width: 480px) {
      margin-top: 30px;
    }
  }
`;

// Use base component directly in JSX (avoid aliasing to prevent undefined issues)

const TestimonialCard = styled(GlassCard)`
  padding: 30px;
  position: relative;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.1);
  }
  
  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -10px;
    font-size: 50px;
    color: var(--green);
    opacity: 0.3;
    font-family: Georgia, serif;
    
    @media (max-width: 480px) {
      font-size: 35px;
      top: -5px;
    }
  }
  
  .testimonial-content {
    margin-bottom: 30px;
    color: var(--light-slate);
    font-size: 16px;
    line-height: 1.6;
    font-style: italic;
    position: relative;
    padding-left: 30px;
    
    @media (max-width: 480px) {
      font-size: 14px;
      padding-left: 20px;
    }
  }
  
  .testimonial-footer {
    display: flex;
    align-items: center;
    gap: 15px;
    
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: white;
      font-size: 20px;
    }
    
    .author-info {
      flex: 1;
      
      .author-name {
        color: var(--lightest-slate);
        font-weight: 600;
        font-size: 17px;
        margin-bottom: 3px;
      }
      
      .author-title {
        color: var(--slate);
        font-size: 14px;
        font-family: var(--font-mono);
      }
    }
    
    .company-logo {
      color: var(--green);
      opacity: 0.7;
      
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  
  .rating {
    display: flex;
    gap: 3px;
    margin-top: 15px;
    
    .star {
      color: #ffd700;
      font-size: 18px;
    }
  }
`;

const Testimonials = () => {
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const testimonials = [
    {
      content: "Ahmed is an exceptional developer who brings both technical expertise and creative vision to every project. His ability to translate complex requirements into elegant solutions is remarkable. He delivered our e-commerce platform ahead of schedule with features that exceeded our expectations.",
      name: "Sarah Johnson",
      title: "CEO & Founder",
      company: "TechVentures Inc.",
      initials: "SJ",
      rating: 5
    },
    {
      content: "Working with Ahmed transformed our mobile app development process. His deep knowledge of React Native and attention to UI/UX details resulted in an app that our users absolutely love. The performance optimizations he implemented reduced our load times by 60%.",
      name: "Michael Chen",
      title: "Product Manager",
      company: "InnovateTech",
      initials: "MC",
      rating: 5
    },
    {
      content: "Ahmed's full-stack expertise was invaluable for our startup. He architected and built our entire platform from scratch, implementing best practices and ensuring scalability. His proactive communication and problem-solving skills made him a joy to work with.",
      name: "Emily Rodriguez",
      title: "CTO",
      company: "StartupHub",
      initials: "ER",
      rating: 5
    },
    {
      content: "The task management system Ahmed developed revolutionized our team's productivity. His implementation of real-time features and intuitive design has made it an essential tool for our daily operations. Highly recommend him for any complex web application projects.",
      name: "David Kim",
      title: "Operations Director",
      company: "GlobalTech Solutions",
      initials: "DK",
      rating: 5
    },
    {
      content: "Ahmed's ability to quickly understand business requirements and translate them into technical solutions is outstanding. He rebuilt our legacy system with modern technologies, improving performance by 10x while maintaining backward compatibility.",
      name: "Lisa Thompson",
      title: "Engineering Manager",
      company: "DataFlow Systems",
      initials: "LT",
      rating: 5
    },
    {
      content: "As a designer, I loved working with Ahmed. He has a keen eye for detail and always ensures pixel-perfect implementation. His suggestions often improved the original designs, and his animations brought our interfaces to life.",
      name: "Alex Martinez",
      title: "UI/UX Designer",
      company: "Creative Studios",
      initials: "AM",
      rating: 5
    }
  ];

  return (
    <TestimonialsSection id="testimonials" ref={revealContainer}>
      <div className="section-header">
        <h2 className="numbered-heading">
          <GradientText>Client Testimonials</GradientText>
        </h2>
        <p>
          Hear what clients and colleagues say about working with me on their projects
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i}>
            <span className="quote-icon">"</span>
            <p className="testimonial-content">
              {testimonial.content}
            </p>
            <div className="testimonial-footer">
              <div className="avatar">
                {testimonial.initials}
              </div>
              <div className="author-info">
                <div className="author-name">{testimonial.name}</div>
                <div className="author-title">
                  {testimonial.title} • {testimonial.company}
                </div>
              </div>
            </div>
            <div className="rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
          </TestimonialCard>
        ))}
      </div>
    </TestimonialsSection>
  );
};

export default Testimonials;
