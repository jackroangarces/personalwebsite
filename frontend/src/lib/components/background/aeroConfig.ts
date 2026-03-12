export const aeroConfig = {
    backgroundColor: 'rgba(247, 251, 255, 1)',
  
    lineCount: 24,
    mistLineCount: 18,
    baseSpacing: 11,
  
    mouseRadius: 240,
  
    minAmplitude: 10,
    maxAmplitude: 28,
  
    minFrequency: 0.0018,
    maxFrequency: 0.0075,
  
    minSpeed: 0.00022,
    maxSpeed: 0.001,
  
    minAlpha: 0.045,
    maxAlpha: 0.12,
  
    minWidth: 0.8,
    maxWidth: 2.0,
  
    mistMinWidth: 6,
    mistMaxWidth: 18,
    mistMinAlpha: 0.012,
    mistMaxAlpha: 0.032,
  
    sampleStepDesktop: 16,
    sampleStepMobile: 28,
  
    colorBands: [
      { line: '0, 110, 235', glow: '90, 190, 255' },
      { line: '0, 150, 255', glow: '120, 220, 255' },
      { line: '30, 95, 220', glow: '100, 170, 255' }
    ],
  
    mobileBreakpoint: 768,
    reducedLineFactorMobile: 0.55,
  
    heroBoostStart: 0,
    heroBoostEnd: 0.1, // proportion of viewport height where effect is strongest
    sectionFalloffEnd: 0.5 // fades more after this viewport-height multiple
  };