import React from 'react';
import { animated as a, useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import clamp from 'lodash-es/clamp';

const boundaries = [-90, 90, 90, -90];

const Boundaries = () => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture({
    onDrag: ({ down, movement }) => {
      const [top, right, bottom, left] = boundaries;
      set({
        xy: down
          ? [clamp(movement[0], left, right), clamp(movement[1], top, bottom)]
          : [0, 0]
      });
    }
  });

  return (
    <div className="boundaries">
      <a.div
        {...bind()}
        style={{
          willChange: 'transform',
          transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`)
        }}
        className="box box--red"
      ></a.div>
    </div>
  );
};

export default Boundaries;
