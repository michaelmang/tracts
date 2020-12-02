export default function Section({ children, title }) {
  return (
    <div className="w-full flex flex-col pl-12">
      <div className="capitalize flex text-white text-lg pt-8 text-opacity-80">
        {title}
      </div>
      <div className="flex flex-wrap mt-4">
        {children}
      </div>
    </div>
  );
}