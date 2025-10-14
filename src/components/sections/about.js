import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import useParallax from '../../hooks/useParallax';

const StyledAboutSection = styled.section`
  max-width: 900px;
  position: relative;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        transform: translateX(5px);
        color: var(--green);
      }

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const ParallaxContainer = styled.div`
  transform: translateY(${props => props.$offset}px);
  transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const parallaxOffset = useParallax(200, 0.2);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'React.js',
    'React Native',
    'JavaScript (ES6+)',
    'HTML5 & CSS3',
    'Tailwind CSS',
    'Node.js',
    'TypeScript',
    'RESTful APIs',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <ParallaxContainer $offset={parallaxOffset}>
        <h2 className="numbered-heading">About Me</h2>
        <div className="inner">
          <StyledText>
            <div>
              <p>
                Hello! My name is AZIZ GTARI and I'm a passionate full stack web and mobile
                developer. I specialize in creating modern, responsive applications that provide
                exceptional user experiences across all devices and platforms.
              </p>

              <p>
                My expertise spans both web and mobile development, with a strong focus on React.js
                for web applications and React Native for mobile apps. I enjoy crafting clean,
                efficient code and implementing modern UI/UX designs using tools like Tailwind CSS.
              </p>

              <p>
                I'm constantly learning and staying up-to-date with the latest technologies and best
                practices in the ever-evolving world of web and mobile development. My goal is to
                build applications that are not only functional but also intuitive and enjoyable to
                use.
              </p>

              <p>Here are a few technologies I’ve been working with recently:</p>
            </div>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </StyledText>

          <StyledPic>
            <div className="wrapper">
              <StaticImage
                className="img"
                src="../../images/me.jpg"
                width={500}
                quality={95}
                formats={['AUTO', 'WEBP', 'AVIF']}
                alt="Headshot"
              />
            </div>
          </StyledPic>
        </div>
      </ParallaxContainer>
    </StyledAboutSection>
  );
};

export default About;
