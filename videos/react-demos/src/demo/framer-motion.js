import React, { useState } from 'react';
import { motion, useCycle } from 'framer-motion';

export default function FramerMotion() {
  const [ySpot, setYSpot] = useState(0);
  const [position, cyclePosition] = useCycle(
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: -100, y: 0 }
  );
  return (
    <div>
      <h1>Framer Motion</h1>
      <motion.button
        onClick={() => cyclePosition()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Do it!
      </motion.button>
      <br />
      <br />
      <motion.div
        style={{
          width: 200,
          height: 200,
          background: 'black',
          margin: '0 auto',
        }}
        drag="x"
        dragConstraints={{ left: -40, right: 40 }}
        animate={position}
      />
    </div>
  );
}
