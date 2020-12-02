export default function Section({ children, title }) {
  return (
    <div className="w-full flex flex-col pl-4 sm:pl-12">
      <div className="capitalize flex text-white text-sm sm:text-lg pt-6 sm:pt-8 text-opacity-80">
        {title}
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start mt-4">
        {children}
      </div>
    </div>
  );
}