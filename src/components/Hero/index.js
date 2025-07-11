import React from 'react';
import useDeviceType from '../useDeviceType';
import DesktopHero from './DesktopHero';
import MobileHero from './MobileHero';

const Hero = (props) => {
  const { isMobile } = useDeviceType();
  
  return isMobile ? (
    <MobileHero {...props} />
  ) : (
    <DesktopHero {...props} />
  );
};

export default Hero; 