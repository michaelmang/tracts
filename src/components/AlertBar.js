import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export default function AlertBar({ error }) {
  return (
    <div className="flex flex-col items-between w-full p-4 md:pl-12 bg-red-700 text-white">
      {error.graphQLErrors &&
        error.graphQLErrors.map(({ message }, i) => (
          <div className="flex justify-between">
            <span key={i}>
              <FontAwesomeIcon
                className="mr-2"
                icon={faExclamationCircle}
              />
              Error: {message}
            </span>
            <span>Please try again</span>
          </div>
        ))}
    </div>
  );
}