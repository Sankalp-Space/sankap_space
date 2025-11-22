"use client";

import React from 'react'
import Particles from './Particles'
import { motion } from 'framer-motion'


const HeroContent = () => {
  return (
    <div className="relative h-full w-full flex items-center justify-center text-center text-white overflow-hidden bg-black">
      <Particles 
        className="absolute inset-0 -z-10"
        particleColors={['#ffffff', '#a0a0a0']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={10}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <motion.div>
      </motion.div>
    </div>
  )
}

export default HeroContent
