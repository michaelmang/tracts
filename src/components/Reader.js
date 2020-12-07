import * as timeago from 'timeago.js';

export default function Reader({ content, reviews }) {
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <div
        className="text-white p-10 md:p-12 max-w-4xl text-justify text-sm md:text-md"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {reviews.length > 0 && (
        <div className="flex w-full px-12">
          <div className="flex flex-col w-1/3">
            <div className="text-white text-md md:text-xl mb-4">
              Ratings & Reviews
            </div>
            {reviews.filter(({ review }) => !!review).map(({ created_at, id, review, reviewer, review_title }) => (
              <div key={id} className="flex flex-col border-red-700 border-2 border-solid px-8 py-6 text-white">
                <div className="flex text-gray-400 mb-2 text-sm justify-between">
                  <span>{reviewer}</span>
                  <span>{timeago.format(created_at)}</span>
                </div>
                <div className="flex text-base font-bold mb-1 text-red-500">{review_title}</div>
                <div className="flex text-base">{review}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
