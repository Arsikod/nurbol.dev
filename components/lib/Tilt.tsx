import React, { PropsWithChildren, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

export default function Tilt({ children }: PropsWithChildren): JSX.Element {
  const tiltRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }
  });
  return <div ref={tiltRef}>{children}</div>;
}
