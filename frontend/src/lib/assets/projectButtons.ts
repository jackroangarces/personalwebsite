import orange from '$lib/assets/project-assets/orange.svg';
import blue from '$lib/assets/project-assets/blue.svg';
import green from '$lib/assets/project-assets/green.svg';

export const projectButtonStyles = {
  orange,
  blue,
  green,
} as const;

export type ProjectButtonStyle = keyof typeof projectButtonStyles;
