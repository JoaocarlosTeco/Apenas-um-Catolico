import React from 'react';
import { Helmet } from 'react-helmet';
import useDeviceType from '../../components/useDeviceType';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

const Home = () => {
  const { isMobile } = useDeviceType();

  return (
    <>
      <Helmet>
        <title>Apenas um Católico - Início</title>
        <meta name="description" content="Site católico dedicado à evangelização e devoção aos santos." />
      </Helmet>
      
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
};

export default Home; 