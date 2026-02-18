import { Variants, Transition, Variant } from 'framer-motion'

// Type exports for better developer experience
export type { Variants, Transition, Variant }

// Base transition configuration
export const baseTransition: Transition = {
  duration: 0.6,
  ease: 'easeOut',
}

// Fade in from bottom (most common pattern)
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

// Simple fade in (no movement)
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

// Slide in from left
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
}

// Slide in from right
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
}

// Scale in with fade
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
}

// Stagger container for animating children in sequence
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Individual stagger item (same as fadeInUp for consistency)
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

// Interactive variants for buttons and links
export const hoverTap: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}

// Mobile menu slide in from right
export const mobileMenuOverlay: Variants = {
  open: {
    opacity: 1,
    x: 0,
  },
  closed: {
    opacity: 0,
    x: '100%',
  },
}

// Mobile menu item animations
export const mobileMenuItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
}

// Bottom CTA bar slide up animation
export const slideUpBar: Variants = {
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
  },
}

// Menu icon path animations for hamburger menu
export const menuIconPaths: Variants = {
  closed: {
    d: 'M4 6h16',
  },
  open: {
    d: 'M4 18h16',
  },
}

export const menuIconMiddle: Variants = {
  closed: {
    d: 'M4 12h16',
    opacity: 1,
  },
  open: {
    d: 'M4 12h16',
    opacity: 0,
  },
}

export const menuIconBottom: Variants = {
  closed: {
    d: 'M4 18h16',
  },
  open: {
    d: 'M4 6h16',
  },
}

// ============================================================================
// VARIANT FACTORY FUNCTIONS
// Functions that create variants with dynamic delays and custom timing
// ============================================================================

/**
 * Creates a fadeInUp variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for fade in from bottom animation
 */
export const createFadeInUp = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a fadeIn variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for simple fade in animation
 */
export const createFadeIn = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a slideInLeft variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for slide in from left animation
 */
export const createSlideInLeft = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a slideInRight variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for slide in from right animation
 */
export const createSlideInRight = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a scaleIn variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for scale in with fade animation
 */
export const createScaleIn = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a staggerContainer variant with custom stagger timing
 * @param staggerDelay - Delay between each child animation in seconds (default: 0.1)
 * @returns Variants object for container with staggered children
 */
export const createStaggerContainer = (staggerDelay = 0.1): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

/**
 * Creates a staggerItem variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for individual stagger item animation
 */
export const createStaggerItem = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a mobileMenuItem variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for mobile menu item animation
 */
export const createMobileMenuItem = (delay = 0): Variants => ({
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})

/**
 * Creates a slideUpBar variant with a custom delay
 * @param delay - Delay in seconds before animation starts (default: 0)
 * @returns Variants object for bottom bar slide up animation
 */
export const createSlideUpBar = (delay = 0): Variants => ({
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay,
    },
  },
})
