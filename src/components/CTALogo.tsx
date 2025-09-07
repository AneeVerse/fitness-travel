"use client";

import React from 'react';
import Image from 'next/image';

const CTALogo = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
      <Image
        src="/images/new-logo.svg"
        alt="Tiger Terrain"
        width={500}
        height={500}
        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[528px] xl:h-[528px]"
        priority
      />
    </div>
  );
};

export default CTALogo;
