export default function Button({ children, isSecondary = false, size = 'sm' }) {
  const bg = isSecondary ? 'bg-gray-700' : 'bg-white';
  const text = isSecondary ? 'text-white' : 'text-black';
  const px = size === 'xs' ? 4 : 6; 
  return (
    <button
      className={`${bg} ${text} font-bold text-xs md:text-${size} px-2 md:px-${px} py-1 md:py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 mb-1`}
      type="button"
    >
      {children}
    </button>
  );
}
