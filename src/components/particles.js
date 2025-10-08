import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ParticlesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const CodeParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Code snippets to display
    const codeSnippets = [
      'const', 'function', 'import', 'export', 'class', 'async', 'await',
      'React', 'useState', 'useEffect', 'return', '=>', '{}', '[]', '()',
      '<div>', '</div>', 'npm', 'git', 'push', 'commit', 'fetch', 'then',
      'catch', 'try', 'if', 'else', 'for', 'while', 'map', 'filter',
      'reduce', 'props', 'state', 'component', 'render', 'const app =',
      'console.log', 'document', 'window', 'addEventListener', 'onClick',
      '===', '!==', '&&', '||', '...', 'jsx', 'tsx', 'css', 'html',
      '<Component />', 'styled`', 'graphql`', 'npm install', 'yarn add'
    ];

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 10;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.color = Math.random() > 0.5 ? '#64ffda' : '#8892b0';
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Parallax effect based on mouse position
        if (window.mouseX !== undefined) {
          this.x += (window.mouseX - canvas.width / 2) * 0.00005 * this.size;
          this.y += (window.mouseY - canvas.height / 2) * 0.00005 * this.size;
        }

        // Fade in and out
        this.opacity += this.fadeSpeed;
        if (this.opacity > 0.4 || this.opacity < 0.1) {
          this.fadeSpeed = -this.fadeSpeed;
        }

        // Reset when out of bounds
        if (this.y > canvas.height + 50 || this.x < -50 || this.x > canvas.width + 50) {
          this.reset();
          this.y = -50;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    // Binary rain effect
    class BinaryParticle {
      constructor(x) {
        this.x = x;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.char = Math.random() > 0.5 ? '1' : '0';
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -20;
          this.char = Math.random() > 0.5 ? '1' : '0';
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#64ffda';
        ctx.font = '12px monospace';
        ctx.fillText(this.char, this.x, this.y);
      }
    }

    // Initialize particles
    const particles = [];
    const binaryParticles = [];
    const particleCount = 30;
    const binaryColumns = 20;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    for (let i = 0; i < binaryColumns; i++) {
      const x = (canvas.width / binaryColumns) * i;
      for (let j = 0; j < 5; j++) {
        binaryParticles.push(new BinaryParticle(x));
      }
    }

    // Mouse tracking
    window.mouseX = 0;
    window.mouseY = 0;

    const handleMouseMove = (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw binary rain
      binaryParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw code particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ParticlesContainer>
      <Canvas ref={canvasRef} />
    </ParticlesContainer>
  );
};

export default CodeParticles;
