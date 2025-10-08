import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MonitorWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--green);
  border-radius: 8px;
  padding: 15px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--green);
  z-index: 9;
  min-width: 200px;
  opacity: ${props => props.$show ? 1 : 0};
  pointer-events: ${props => props.$show ? 'auto' : 'none'};
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MetricLabel = styled.span`
  color: var(--slate);
`;

const MetricValue = styled.span`
  color: ${props => {
    if (props.$status === 'good') return 'var(--green)';
    if (props.$status === 'warning') return 'var(--blue)';
    if (props.$status === 'poor') return 'var(--pink)';
    return 'var(--green)';
  }};
`;

const PerformanceMonitor = ({ show = false }) => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
    domNodes: 0
  });

  useEffect(() => {
    if (!show) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : 0,
          domNodes: document.getElementsByTagName('*').length
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Get initial load time
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime: loadTime / 1000 }));
    }

    measureFPS();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [show]);

  const getFPSStatus = (fps) => {
    if (fps >= 50) return 'good';
    if (fps >= 30) return 'warning';
    return 'poor';
  };

  const getMemoryStatus = (memory) => {
    if (memory < 50) return 'good';
    if (memory < 100) return 'warning';
    return 'poor';
  };

  return (
    <MonitorWrapper $show={show}>
      <MetricRow>
        <MetricLabel>FPS:</MetricLabel>
        <MetricValue $status={getFPSStatus(metrics.fps)}>{metrics.fps}</MetricValue>
      </MetricRow>
      {metrics.memory > 0 && (
        <MetricRow>
          <MetricLabel>Memory:</MetricLabel>
          <MetricValue $status={getMemoryStatus(metrics.memory)}>{metrics.memory} MB</MetricValue>
        </MetricRow>
      )}
      <MetricRow>
        <MetricLabel>Load Time:</MetricLabel>
        <MetricValue $status={metrics.loadTime < 3 ? 'good' : 'warning'}>
          {metrics.loadTime.toFixed(2)}s
        </MetricValue>
      </MetricRow>
      <MetricRow>
        <MetricLabel>DOM Nodes:</MetricLabel>
        <MetricValue $status={metrics.domNodes < 1500 ? 'good' : 'warning'}>
          {metrics.domNodes}
        </MetricValue>
      </MetricRow>
    </MonitorWrapper>
  );
};

export default PerformanceMonitor;
