import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import useParallax from '../../hooks/useParallax';
import Typewriter from '../typewriter';
import ScrollIndicator from '../scrollIndicator';
import { GradientText } from '../glassmorphism';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  overflow: hidden;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
      font-size: clamp(14px, 4vw, 16px);
    }

    &::after {
      content: '🚀';
      position: absolute;
      right: -40px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.8em;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;

    @media (max-width: 768px) {
      font-size: clamp(18px, 5vw, 22px);
      line-height: 1.1;
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;

    @media (max-width: 768px) {
      max-width: 100%;
      font-size: clamp(15px, 4vw, 18px);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(100, 255, 218, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px -15px var(--green-tint);
    }
  }
`;

const ParallaxContainer = styled.div`
  transform: translateY(${props => props.$offset}px);
  transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const FloatingCode = styled.div`
  position: absolute;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: 14px;
  opacity: 0.3;
  animation: float 20s infinite linear;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: 12px;
    opacity: 0.2;
  }

  @keyframes float {
    from {
      transform: translateX(-100px) translateY(0) rotate(0deg);
    }
    to {
      transform: translateX(calc(100vw + 100px)) translateY(-20px) rotate(360deg);
    }
  }

  &:nth-child(1) {
    top: 15%;
    left: -100px;
    animation-duration: 18s;
  }
  &:nth-child(2) {
    top: 30%;
    left: -100px;
    animation-duration: 22s;
    animation-delay: 2s;
  }
  &:nth-child(3) {
    top: 50%;
    left: -100px;
    animation-duration: 20s;
    animation-delay: 4s;
  }
  &:nth-child(4) {
    top: 70%;
    left: -100px;
    animation-duration: 24s;
    animation-delay: 6s;
  }
  &:nth-child(5) {
    top: 85%;
    left: -100px;
    animation-duration: 19s;
    animation-delay: 8s;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const BackgroundCode = () => {
  const codeSnippets = [
    { text: '<Hero />', top: '10%', left: '5%', delay: '0s' },
    { text: 'const skills = ["React", "JavaScript"]', top: '20%', right: '10%', delay: '2s' },
    { text: 'npm run develop', top: '70%', left: '8%', delay: '4s' },
    { text: '{ useState }', top: '60%', right: '5%', delay: '6s' },
    { text: 'git push origin main', top: '40%', left: '3%', delay: '8s' },
    { text: 'async/await', top: '80%', right: '15%', delay: '10s' },
    { text: 'export default', top: '30%', right: '20%', delay: '3s' },
    { text: 'styled-components', top: '50%', left: '10%', delay: '5s' },
  ];

  return (
    <>
      {codeSnippets.map((snippet, i) => (
        <FloatingCode
          key={i}
          style={{
            top: snippet.top,
            left: snippet.left,
            right: snippet.right,
            animationDelay: snippet.delay,
          }}>
          {snippet.text}
        </FloatingCode>
      ))}
    </>
  );
};

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const parallaxOffset = useParallax(0, 0.3);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = (
    <h1>
      <GradientText>Hi, my name is</GradientText>
    </h1>
  );
  const two = (
    <h2 className="big-heading">
      AZIZ GTARI<span style={{ color: 'var(--green)' }}>.</span>
    </h2>
  );
  const three = (
    <h3 className="big-heading">
      I build <Typewriter text="web & mobile applications." delay={80} startDelay={2000} />
    </h3>
  );
  const four = (
    <>
      <p>
        I'm a <GradientText>full stack developer</GradientText> passionate about crafting
        exceptional digital experiences that blend <strong>creativity</strong> with{' '}
        <strong>functionality</strong>. Specializing in <strong>React.js</strong>,{' '}
        <strong>React Native</strong>, and modern web technologies, I transform ideas into{' '}
        <GradientText>pixel-perfect</GradientText>, performant applications that users love.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href="#contact" rel="noreferrer">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <BackgroundCode />
      <ParallaxContainer $offset={parallaxOffset}>
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => {
                if (!itemRefs.current[i]) {itemRefs.current[i] = React.createRef();}
                return (
                  <CSSTransition
                    key={i}
                    classNames="fadeup"
                    timeout={loaderDelay}
                    nodeRef={itemRefs.current[i]}>
                    <div ref={itemRefs.current[i]} style={{ transitionDelay: `${i + 1}00ms` }}>
                      {item}
                    </div>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        )}
      </ParallaxContainer>
      <ScrollIndicator />
    </StyledHeroSection>
  );
};

export default Hero;
