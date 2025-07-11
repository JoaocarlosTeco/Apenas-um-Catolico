import { useState, useEffect } from 'react';
import { DeviceType } from '../types';

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  useEffect(() => {
    const checkDeviceType = (): void => {
      if (typeof window === 'undefined') {
        // SSR safe default
        setDeviceType({
          isMobile: false,
          isTablet: false,
          isDesktop: true
        });
        return;
      }

      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      setDeviceType({
        isMobile,
        isTablet,
        isDesktop
      });
    };

    // Check on mount
    checkDeviceType();

    // Add event listener for resize
    window.addEventListener('resize', checkDeviceType);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType; 