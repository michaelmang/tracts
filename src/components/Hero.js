import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import kebabcase from 'lodash.kebabcase';
import { Link } from 'react-router-dom';
import { Pace, WindupChildren } from "windups";

import Button from './Button.js';
import Navbar from './Navbar.js';

const defaultImage = "https://images.unsplash.com/photo-1505072276982-d6c55de5d5d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"; 

export default function Hero({ author, children, description, image = defaultImage, loading, tag }) {
  return (
    <div className="w-full hero p-4 md:p-10 md:pl-12 pt-4" style={{ "--hero-background": `url('${image}')`}}>
      <div className="h-full w-full flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-start justify-end pt-6">
          {!loading && (
            <WindupChildren>
              <Pace getPace={(char) => (char === " " ? 40 : 20)}>
                {tag && (
                  <div className="flex text-white">
                    <div key={tag.id} className="uppercase text-xs md:text-xs bg-red-700 p-1 md:p-2 rounded-sm mb-4 mr-1">{tag.type}</div>
                  </div>
                )}
                <div className="text-white text-md md:text-3xl mb-2">{children}</div>
                <div className="text-white text-xs md:text-sm mb-4"><span className="font-bold text-gray-400">Written By:</span> {author}</div>
                <div className="text-white text-xs md:text-sm w-3/4 md:w-1/2 ">
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
