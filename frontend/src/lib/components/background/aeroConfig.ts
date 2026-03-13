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
    
    // Fades when scrolling to bottom.
    heroBoostStart: 0,
    heroBoostEnd: 0.1, 
    sectionFalloffEnd: 0.5, 

    // Moves downward when scrolling to bottom proportional speed to page size.
    scrollYOffsetMax: 200,

    // Dark mode variants (no scroll fade/offset in dark mode)
    dark: {
      backgroundColor: 'rgba(24, 24, 24, 1)',
      colorBands: [
        { line: '60, 140, 220', glow: '80, 160, 240' },
        { line: '70, 160, 235', glow: '100, 180, 245' },
        { line: '80, 120, 200', glow: '110, 150, 230' }
      ]
    }
  };