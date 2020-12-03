import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import kebabcase from 'lodash.kebabcase';
import { useState } from "react";
import { Link } from 'react-router-dom';

import Button from "./Button.js";

export default function Card({ author, children, description, image, tags }) {
  const [isHovered, setIsHovered] = useState(false);

  const updateHovered = (val) => async () => {
    await sleep(400);
    setIsHovered(val);
  };

  return (
    <div
      className="card w-11/12 md:w-1/5 mb-8 md:mb-1 mr-3 md:mr-1 rounded-lg bg-overlay flex flex-col justify-end items-start text-white p-4"
      onMouseEnter={updateHovered(true)}
      onMouseLeave={updateHovered(false)}
      style={{
        "--card-background": `url('${image}')`,
        height: 450,
      }}
    >
      <div className="flex flex-col">
        {tags && !isHovered && (
          <div className="flex">
            <div key={tags.id} className="uppercase text-xs bg-red-700 p-1 md:p-2 rounded-sm mb-2 mr-1">{tags.type}</div>
          </div>
        )}
        <div className="text-sm md:text-2xl font-bold mb-2">{children}</div>
        <div className="flex flex-col md:flex-row text-white text-xs"><span className="font-bold text-gray-400 mr-1">Written By:</span> {author}</div>
        {isHovered && <div className="card_description text-xs nmd:text-sm my-6">{description}</div>}
        {isHovered && (
          <div className="flex">
            <Link to={`/tracts/${kebabcase(children)}`}>
              <Button size="xs">
                <FontAwesomeIcon className="mr-2" icon={faBookOpen} />
                Read
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}