export default function Section({ children, title }) {
  return (
    <div className="w-full flex flex-col pl-4 md:pl-12">
      <div className="capitalize flex text-white text-sm md:text-lg pt-6 md:pt-8 text-opacity-80">
        {title}
      </div>
      <div className="flex flex-wrap justify-center md:justify-start mt-4">
        {children}
      </div>
    </div>
  );
}