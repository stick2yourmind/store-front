import { Variants } from 'framer-motion';

export const SLIDE_IN_VARIANT: Variants = {
  hidden: { opacity: 0, x: 0, y: -100 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export const SHOW_VARIANT: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

export const ZOOM_IN: Variants = {
  hidden: { fontSize: 0 },
  enter: { fontSize: '20rem' },
};

export const FADE_DOWN_VARIANT: Variants = {
  hidden: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export const ZOOM_50_IN = {
  hidden: { opacity: 0, scale: 0.5 },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};
