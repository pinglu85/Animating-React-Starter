import React from 'react';
import clamp from 'lodash-es/clamp';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const Gesture = () => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(({ down, movement, velocity }) => {
    velocity = clamp(velocity, 1, 8);
    if (down) {
      set({ x: movement[0] });
    } else {
      if (movement[0] > 400) {
        set({ x: 500 });
      } else if (movement[0] < -400) {
        set({ x: -500 });
      } else {
        set({ x: 0 });
      }
    }
    set({
      config: { mass: velocity, tension: 500 * velocity, friction: 50 }
    });
  });
  return (
    <animated.div
      {...bind()}
      style={{
        opacity: x.interpolate({
          // turns negative value to absolute value,
          // so that moving left applies the same output.
          // map: Math.abs,
          range: [-400, 0, 400],
          output: [0, 1, 0]
        }),
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
      }}
      className="box"
    >
      Drag & release me!
    </animated.div>
  );
};

export default Gesture;
