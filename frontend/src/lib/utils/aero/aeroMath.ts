export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }
  
  export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
  
  export function smoothstep(edge0: number, edge1: number, x: number) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }
  
  export function gaussianFalloff(distanceSquared: number, radius: number) {
    return Math.exp(-distanceSquared / (radius * radius));
  }
  
  export function distanceSquared(x1: number, y1: number, x2: number, y2: number) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  }