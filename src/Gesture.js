import React from 'react';
import clamp from 'lodash-es/clamp';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const Gesture = () => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useDrag(({ down, movement, velocity }) => {
    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ? movement : [0, 0],
      config: { mass: velocity, tension: 500 * velocity, friction: 50 }
    });
  });
  return (
    <animated.div
      {...bind()}
      style={{
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`)
      }}
      className="box"
    >
      Drag & release me!
    </animated.div>
  );
};

export default Gesture;
