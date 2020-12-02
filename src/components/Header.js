import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { Pace, WindupChildren } from "windups";

import Button from './Button.js';
import Navbar from './Navbar.js';

export default function Hero({ author, children, image }) {
  return (
    <div className="w-full header p-4 sm:p-10 sm:pl-12 pt-4" style={{ "--header-background": `url('${image}')`}}>
      <div className="h-full w-full flex flex-col">
        <Navbar />
        <div className="w-full h-full flex flex-col items-center justify-end">
          <WindupChildren>
            <Pace getPace={(char) => (char === " " ? 40 : 20)}>
              <div className="text-white text-4xl mt-4 mb-2">{children}</div>
              <div className="text-white text-sm mb-2"><span className="font-bold">Written By:</span> {author}</div>
              <div className="flex mt-5">
                <Button>
                  Share
                  <FontAwesomeIcon className="ml-2" icon={faShare} />
                </Button>
              </div>
            </Pace>
          </WindupChildren>
        </div>
      </div>
    </div>
  );
}
