export default function Reader({ content }) {
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <div
        className="text-white p-10 md:p-12 max-w-4xl text-justify text-sm md:text-md"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
