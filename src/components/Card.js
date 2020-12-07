import kebabcase from 'lodash.kebabcase';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

import RatingStars from './RatingStars.js';
import { fadeIn } from '../animations.js';

export default function Card({ author, children, description, image, tag, reviews }) {
  const [isHovered, setIsHovered] = useState(false);

  const updateHovered = (val) => async () => {
    await sleep(400);
    setIsHovered(val);
  };

  const step1 = useSpring(fadeIn({ delay: 150 }));
  const step2 = useSpring(fadeIn({ delay: 250 }));
  const step3 = useSpring(fadeIn({ delay: 350 }));

  const history = useHistory();

  const handleClick = () => {
    history.push(`/tracts/${kebabcase(children)}`);
  };

  return (
    <animated.div
      className="card cursor-pointer w-11/12 md:w-1/5 mb-8 md:mb-1 mr-3 md:mr-1 rounded-lg bg-overlay flex flex-col justify-end items-start text-white p-4"
      onClick={handleClick}
      onMouseEnter={updateHovered(true)}
      onMouseLeave={updateHovered(false)}
      style={{
        '--card-background': `url('${image}')`,
        height: 450,
        ...step1,
      }}
    >
      <div className="flex flex-col">
        {tag && !isHovered && (
          <div className="flex">
            <div
              key={tag.id}
              className="uppercase text-xs bg-red-700 p-1 md:p-2 rounded-sm mb-2 mr-1"
            >
              {tag.type}
            </div>
          </div>
        )}
        <RatingStars className="mb-2" reviews={reviews} />
        <animated.div style={step2} className="text-sm md:text-2xl font-bold mb-2">
          {children}
        </animated.div>
        <animated.div
          style={step3}
          className="flex flex-col md:flex-row text-white text-xs"
        >
          <span className="font-bold text-gray-400 mr-1">Written By:</span> {author}
        </animated.div>
        {isHovered && (
          <div className="card_description text-xs nmd:text-sm my-6">{description}</div>
        )}
      </div>
    </animated.div>
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
