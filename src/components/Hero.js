import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import kebabcase from 'lodash.kebabcase';
import { Link } from 'react-router-dom';
import { Pace, WindupChildren } from "windups";

import Button from './Button.js';
import Navbar from './Navbar.js';

const defaultImage = "https://images.unsplash.com/photo-1528222354212-a29573cdb844?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"; 

export default function Hero({ author, children, description, image = defaultImage, loading, tags }) {
  return (
    <div className="w-full hero p-4 sm:p-10 sm:pl-12 pt-4" style={{ "--hero-background": `url('${image}')`}}>
      <div className="h-full w-3/4 sm:w-1/2 flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-start justify-end pt-6">
          {!loading && (
            <WindupChildren>
              <Pace getPace={(char) => (char === " " ? 40 : 20)}>
                {tags && (
                  <div className="flex text-white">
                    <div key={tags.id} className="uppercase text-xs sm:text-xs bg-red-700 p-1 sm:p-2 rounded-sm mb-4 mr-1">{tags.type}</div>
                  </div>
                )}
                <div className="text-white text-md sm:text-3xl mb-2">{children}</div>
                <div className="text-white text-xs sm:text-sm mb-4"><span className="font-bold text-gray-400">Written By:</span> {author}</div>
                <div className="text-white text-xs sm:text-sm">
                  {description}
                </div>
                <div className="flex my-5">
                  <Link to={`/tracts/${kebabcase(children)}`}>
                    <Button>
                      <FontAwesomeIcon className="mr-2" icon={faBookOpen} />
                      Read
                    </Button>
                  </Link>
                </div>
              </Pace>
            </WindupChildren>
          )}
        </div>
      </div>
    </div>
  );
}
