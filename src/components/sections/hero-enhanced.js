import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import useParallax from '../../hooks/useParallax';
import Typewriter from '../typewriter';

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

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
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
  font-family: var(--font-mono);
  color: var(--green);
  opacity: 0.1;
  font-size: 14px;
  pointer-events: none;
  animation: float 20s infinite ease-in-out;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-20px) rotate(2deg); }
    50% { transform: translateY(10px) rotate(-1deg); }
    75% { transform: translateY(-15px) rotate(1deg); }
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

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Ahmed Mribai.</h2>;
  const three = (
    <h3 className="big-heading">
      I build <Typewriter text="web & mobile applications." delay={80} startDelay={2000} />
    </h3>
  );
  const four = (
    <>
      <p>
        I'm a full stack web and mobile developer specializing in creating exceptional
        digital experiences using React, React Native, JavaScript, and modern web technologies.
        I'm passionate about building responsive, user-friendly applications with clean,
        efficient code.
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="#contact"
      rel="noreferrer">
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
                if (!itemRefs.current[i]) itemRefs.current[i] = React.createRef();
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
    </StyledHeroSection>
  );
};

export default Hero;
