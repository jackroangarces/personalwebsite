<script lang="ts">
  import { onMount } from 'svelte';
  import baseSvg from '$lib/assets/turbines/turbine_base.svg';
  import spinnerSvg from '$lib/assets/turbines/turbine_spinner.svg';

  interface Props {
    baseSpeed?: number;
    maxSpeed?: number;
    proximityRadius?: number;
    /** Scale factor for size (1 = full, 0.5 = half) */
    scale?: number;
  }

  let {
    baseSpeed = 1,
    maxSpeed = 4,
    proximityRadius = 300,
    scale = 1
  }: Props = $props();

  let container: HTMLDivElement;
  let rotation = $state(0);
  let mouseX = $state(-9999);
  let mouseY = $state(-9999);
  let rafId = 0;

  function getDistance() {
    if (!container) return Infinity;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.15;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getSpeedMultiplier() {
    const d = getDistance();
    if (d >= proximityRadius) return 1;
    const t = 1 - d / proximityRadius;
    return 1 + t * (maxSpeed / baseSpeed - 1);
  }

  function tick() {
    const mult = getSpeedMultiplier();
    rotation += baseSpeed * mult;
    rafId = requestAnimationFrame(tick);
  }

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  });
</script>

<div class="turbine" bind:this={container} style="transform: scale({scale}); transform-origin: bottom center;">
  <img src={baseSvg} alt="" class="turbine-base" />
  <img
    src={spinnerSvg}
    alt=""
    class="turbine-spinner"
    style="transform: rotate({rotation}deg)"
  />
</div>

<style>
  .turbine {
    position: relative;
    width: 35px;
    flex-shrink: 0;
  }

  .turbine-base {
    display: block;
    width: 50%;
    height: 50%;
  }

  .turbine-spinner {
    position: absolute;
    left: -165.5%;
    top: -84px;
    transform-origin: center center;
    width: 500%;
    margin-left: -60%;
    height: auto;
    pointer-events: none;
  }
</style>
