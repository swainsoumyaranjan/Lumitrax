/**
 * Detect if the current device is a mobile device
 * @returns boolean indicating if the device is mobile
 */
export function isMobile(): boolean {
  // Check if window is defined (for SSR)
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Use React Native Web's detection if available
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }
  
  // Additional check based on screen width
  return window.innerWidth <= 768;
}

/**
 * Detect if the device is in portrait orientation
 * @returns boolean indicating if the device is in portrait orientation
 */
export function isPortrait(): boolean {
  // Check if window is defined (for SSR)
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.innerHeight > window.innerWidth;
}

/**
 * Get the device type
 * @returns string indicating the device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  // Check if window is defined (for SSR)
  if (typeof window === 'undefined') {
    return 'desktop';
  }
  
  const width = window.innerWidth;
  
  if (width <= 480) {
    return 'mobile';
  } else if (width <= 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}
