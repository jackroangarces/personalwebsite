<script lang="ts">
  import { onMount } from 'svelte';
  import { aeroConfig } from './aeroConfig';
  import { clamp, smoothstep, gaussianFalloff, distanceSquared } from '$lib/utils/aero/aeroMath';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let animationFrame = 0;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let isMobile = false;

  type MouseState = {
    x: number;
    y: number;
    active: boolean;
  };

  type Point = {
    x: number;
    y: number;
  };

  type AeroLine = {
    offsetY: number;
    amplitude: number;
    frequency: number;
    phase: number;
    speed: number;
    width: number;
    alpha: number;
    bandIndex: number;
    drift: number;
  };

  type MistLine = {
    offsetY: number;
    amplitude: number;
    frequency: number;
    phase: number;
    speed: number;
    width: number;
    alpha: number;
    bandIndex: number;
    drift: number;
  };

  const mouse: MouseState = {
    x: -9999,
    y: -9999,
    active: false
  };

  let lines: AeroLine[] = [];
  let mistLines: MistLine[] = [];
  let sampleStep = aeroConfig.sampleStepDesktop;

  function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  function createLines() {
    const centerY = height * 0.35;
    const mainCount = isMobile
      ? Math.max(10, Math.floor(aeroConfig.lineCount * aeroConfig.reducedLineFactorMobile))
      : aeroConfig.lineCount;

    const mistCount = isMobile
      ? Math.max(8, Math.floor(aeroConfig.mistLineCount * aeroConfig.reducedLineFactorMobile))
      : aeroConfig.mistLineCount;

    lines = Array.from({ length: mainCount }, (_, i) => ({
      offsetY:
        centerY +
        (i - mainCount / 2) * aeroConfig.baseSpacing +
        randomBetween(-18, 18),
      amplitude: randomBetween(aeroConfig.minAmplitude, aeroConfig.maxAmplitude),
      frequency: randomBetween(aeroConfig.minFrequency, aeroConfig.maxFrequency),
      phase: randomBetween(0, Math.PI * 2),
      speed: randomBetween(aeroConfig.minSpeed, aeroConfig.maxSpeed),
      width: randomBetween(aeroConfig.minWidth, aeroConfig.maxWidth),
      alpha: randomBetween(aeroConfig.minAlpha, aeroConfig.maxAlpha),
      bandIndex: i % aeroConfig.colorBands.length,
      drift: randomBetween(-20, 20)
    }));

    mistLines = Array.from({ length: mistCount }, (_, i) => ({
      offsetY:
        centerY +
        (i - mistCount / 2) * (aeroConfig.baseSpacing * 1.3) +
        randomBetween(-36, 36),
      amplitude: randomBetween(aeroConfig.minAmplitude * 1.4, aeroConfig.maxAmplitude * 1.8),
      frequency: randomBetween(aeroConfig.minFrequency * 0.7, aeroConfig.maxFrequency * 0.75),
      phase: randomBetween(0, Math.PI * 2),
      speed: randomBetween(aeroConfig.minSpeed * 0.7, aeroConfig.maxSpeed * 0.8),
      width: randomBetween(aeroConfig.mistMinWidth, aeroConfig.mistMaxWidth),
      alpha: randomBetween(aeroConfig.mistMinAlpha, aeroConfig.mistMaxAlpha),
      bandIndex: i % aeroConfig.colorBands.length,
      drift: randomBetween(-40, 40)
    }));
  }

  function resizeCanvas() {
    if (!canvas) return;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    isMobile = width <= aeroConfig.mobileBreakpoint;
    sampleStep = isMobile ? aeroConfig.sampleStepMobile : aeroConfig.sampleStepDesktop;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createLines();
  }

  function getScrollFactor() {
    // Use multiple sources: body/height:100% can make window.scrollY stay 0
    const scrollY = Math.max(
      window.scrollY ?? 0,
      document.documentElement.scrollTop ?? 0,
      document.body.scrollTop ?? 0
    );
    const normalized = scrollY / Math.max(height, 1);

    const strongZone = 1 - smoothstep(
      aeroConfig.heroBoostEnd,
      aeroConfig.sectionFalloffEnd,
      normalized
    );

    return clamp(strongZone, 0.6, 1);
  }

  function getGlobalArc(x: number) {
    const origin = width * 0.16;
    return 0.0000022 * (x - origin) * (x - origin) - height * 0.06;
  }

  function getMouseInfluence(px: number, py: number, radiusScale = 1) {
    if (!mouse.active) return 0;

    const d2 = distanceSquared(px, py, mouse.x, mouse.y);
    return gaussianFalloff(d2, aeroConfig.mouseRadius * radiusScale);
  }

  function drawSmoothPath(points: Point[]) {
    if (!ctx || points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }

    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  function buildMistPoints(line: MistLine, time: number, scrollFactor: number): Point[] {
    const points: Point[] = [];

    for (let x = 0; x <= width + sampleStep; x += sampleStep) {
      const arc = getGlobalArc(x);

      const baseY =
        line.offsetY +
        arc +
        line.drift * Math.sin(time * 0.00012 + line.phase) +
        Math.sin(x * line.frequency + time * line.speed + line.phase) * line.amplitude;

      const influence = getMouseInfluence(x, baseY, 1.4) * scrollFactor;

      const pulse =
        Math.sin(x * (line.frequency * 2.1) + time * (line.speed * 4.2) + line.phase) *
        (18 * influence);

      const pullX = mouse.active ? (mouse.x - x) * 0.006 * influence : 0;
      const pullY = mouse.active ? (mouse.y - baseY) * 0.04 * influence : 0;

      points.push({
        x: x + pullX,
        y: baseY + pulse + pullY
      });
    }

    return points;
  }

  function buildCorePoints(line: AeroLine, time: number, scrollFactor: number): Point[] {
    const points: Point[] = [];

    for (let x = 0; x <= width + sampleStep; x += sampleStep) {
      const arc = getGlobalArc(x);

      const baseY =
        line.offsetY +
        arc +
        line.drift * Math.sin(time * 0.00016 + line.phase) +
        Math.sin(x * line.frequency + time * line.speed + line.phase) * line.amplitude;

      const influence = getMouseInfluence(x, baseY, 1) * scrollFactor;

      const turbulence =
        Math.sin(x * (line.frequency * 3.1) + time * (line.speed * 7.2) + line.phase) *
        (20 * influence);

      const pullY = mouse.active ? (mouse.y - baseY) * 0.08 * influence : 0;
      const spread = mouse.active ? Math.sin((x - mouse.x) * 0.02) * 8 * influence : 0;

      points.push({
        x,
        y: baseY + turbulence + pullY + spread
      });
    }

    return points;
  }

  function drawMistLine(points: Point[], line: MistLine, scrollFactor: number) {
    if (!ctx) return;

    const colors = aeroConfig.colorBands[line.bandIndex];
    drawSmoothPath(points);
    ctx.strokeStyle = `rgba(${colors.glow}, ${line.alpha * scrollFactor})`;
    ctx.lineWidth = line.width;
    ctx.stroke();
  }

  function drawCoreLine(points: Point[], line: AeroLine, scrollFactor: number) {
    if (!ctx) return;

    const colors = aeroConfig.colorBands[line.bandIndex];
    const useBlur = !isMobile;

    ctx.save();

    ctx.filter = useBlur ? 'blur(10px)' : 'none';
    drawSmoothPath(points);
    ctx.strokeStyle = `rgba(${colors.glow}, ${line.alpha * 0.05 * scrollFactor})`;
    ctx.lineWidth = line.width * 12;
    ctx.stroke();

    ctx.filter = useBlur ? 'blur(5px)' : 'none';
    drawSmoothPath(points);
    ctx.strokeStyle = `rgba(${colors.glow}, ${line.alpha * 0.10 * scrollFactor})`;
    ctx.lineWidth = line.width * 7;
    ctx.stroke();

    ctx.filter = 'none';
    drawSmoothPath(points);
    ctx.strokeStyle = `rgba(${colors.glow}, ${line.alpha * 0.16 * scrollFactor})`;
    ctx.lineWidth = line.width * 3.5;
    ctx.stroke();

    drawSmoothPath(points);
    ctx.strokeStyle = `rgba(${colors.line}, ${line.alpha * scrollFactor})`;
    ctx.lineWidth = line.width;
    ctx.stroke();

    ctx.restore();
  }

  function drawRibbonFill(
    upperPoints: Point[],
    lowerPoints: Point[],
    bandIndex: number,
    scrollFactor: number
  ) {
    if (!ctx || upperPoints.length < 2 || lowerPoints.length < 2) return;

    const colors = aeroConfig.colorBands[bandIndex];
    const midIndex = Math.floor(upperPoints.length / 2);

    const topMid = upperPoints[midIndex];
    const bottomMid = lowerPoints[midIndex];
    const centerY = (topMid.y + bottomMid.y) / 2;

    const gradient = ctx.createLinearGradient(0, topMid.y, 0, bottomMid.y);
    gradient.addColorStop(0, `rgba(${colors.line}, 0)`);
    gradient.addColorStop(0.5, `rgba(${colors.glow}, ${0.14 * scrollFactor})`);
    gradient.addColorStop(1, `rgba(${colors.line}, 0)`);

    ctx.beginPath();
    ctx.moveTo(upperPoints[0].x, upperPoints[0].y);

    for (let i = 1; i < upperPoints.length; i++) {
      ctx.lineTo(upperPoints[i].x, upperPoints[i].y);
    }

    for (let i = lowerPoints.length - 1; i >= 0; i--) {
      ctx.lineTo(lowerPoints[i].x, lowerPoints[i].y);
    }

    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();

    const bloom = ctx.createRadialGradient(
      width * 0.35,
      centerY,
      0,
      width * 0.35,
      centerY,
      width * 0.22
    );
    bloom.addColorStop(0, `rgba(${colors.glow}, ${0.05 * scrollFactor})`);
    bloom.addColorStop(1, `rgba(${colors.glow}, 0)`);

    ctx.fillStyle = bloom;
    ctx.fill();
  }

  function render(time: number) {
    if (!ctx || !canvas) return;

    const scrollFactor = getScrollFactor();
    canvas.style.opacity = String(scrollFactor);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = aeroConfig.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const mistPointSets = mistLines.map((line) => ({
      line,
      points: buildMistPoints(line, time, scrollFactor * 0.9)
    }));

    const corePointSets = lines.map((line) => ({
      line,
      points: buildCorePoints(line, time, scrollFactor)
    }));

    ctx.globalCompositeOperation = 'source-over';
    for (const { line, points } of mistPointSets) {
      drawMistLine(points, line, scrollFactor * 0.9);
    }

    // Ribbon fills between selected neighboring line pairs.
    // Every few pairs instead of all pairs keeps it from becoming muddy.
    for (let i = 0; i < corePointSets.length - 1; i++) {
      const shouldFill = i % 4 === 1 || i % 5 === 2;
      if (!shouldFill) continue;

      const a = corePointSets[i];
      const b = corePointSets[i + 1];
      drawRibbonFill(a.points, b.points, a.line.bandIndex, scrollFactor * 0.9);
    }

    for (const { line, points } of corePointSets) {
      drawCoreLine(points, line, scrollFactor);
    }

    ctx.globalCompositeOperation = 'source-over';
    animationFrame = requestAnimationFrame(render);
  }

  function handleMouseMove(event: MouseEvent) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;
  }

  function handleMouseLeave() {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  }

  onMount(() => {
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<canvas bind:this={canvas} class="aero-bg"></canvas>

<style>
  .aero-bg {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 0;
    pointer-events: none;
  }
</style>