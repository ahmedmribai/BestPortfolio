import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { GlassCard, GradientText } from '../glassmorphism';

const SkillsSection = styled.section`
  margin: 0 auto;
  padding: 100px 0;
  max-width: 1000px;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
  padding: 100px 0;

  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    
    h2 {
      font-size: clamp(26px, 5vw, var(--fz-heading));
    }
  }
`;

const SkillCategory = styled(GlassCard)`
  padding: 30px;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(100, 255, 218, 0.3);
  }

  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    
    h3 {
      color: var(--lightest-slate);
      font-size: 18px;
      margin: 0;
    }
    
    .percentage {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--green);
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 480px) {
    height: 6px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    border-radius: 10px;
    width: ${props => props.$progress}%;
    transition: width 2s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: shimmer 2s infinite;
    }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 50px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
`;

// Aliases for styled components used in JSX
const StyledSkillsSection = SkillsSection;
const SkillCard = SkillCategory;
const StatsContainer = SkillsGrid;

const StatCard = styled(GlassCard)`
  text-align: center;
  padding: 30px 20px;
  
  .stat-number {
    font-size: clamp(40px, 5vw, 50px);
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
    display: block;
  }
  
  .stat-label {
    color: var(--slate);
    font-size: 16px;
    font-family: var(--font-mono);
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (revealContainer.current) {
      observer.observe(revealContainer.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillsData = [
    { name: 'React.js / React Native', level: 95 },
    { name: 'JavaScript / TypeScript', level: 90 },
    { name: 'HTML5 / CSS3', level: 95 },
    { name: 'Node.js / Express', level: 85 },
    { name: 'Tailwind CSS', level: 88 },
    { name: 'MongoDB / PostgreSQL', level: 80 },
    { name: 'Git / GitHub', level: 92 },
    { name: 'RESTful APIs / GraphQL', level: 87 },
    { name: 'Firebase / AWS', level: 75 },
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '100+', label: 'GitHub Contributions' },
    { number: '4+', label: 'Years Experience' },
    { number: '15+', label: 'Technologies Mastered' },
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <div className="section-header">
        <h2 className="numbered-heading">
          <GradientText>Technical Skills & Expertise</GradientText>
        </h2>
      </div>

      <SkillsGrid>
        {skillsData.map((skill, i) => (
          <SkillCard key={i}>
            <div className="skill-header">
              <h3>{skill.name}</h3>
              <span className="percentage">{skill.level}%</span>
            </div>
            <ProgressBar $progress={isVisible ? skill.level : 0}>
              <div className="progress-fill" />
            </ProgressBar>
          </SkillCard>
        ))}
      </SkillsGrid>

      <StatsContainer>
        {stats.map((stat, i) => (
          <StatCard key={i}>
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </StatCard>
        ))}
      </StatsContainer>
    </StyledSkillsSection>
  );
};

export default Skills;
