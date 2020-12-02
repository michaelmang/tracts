export default function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#181818" }}>
      {children}
      <div className="h-4 sm:h-16 w-full text-white flex items-center justify-center sm:justify-start text-xs sm:pl-4 py-4 sm:p-12 py-10">
        Created by Michael Mangialardi <span className="mx-2">|</span>
        <a href="https://www.buymeacoffee.com/fgn7ts2" target="_blank">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-8 w-auto" />
        </a>
      </div>
    </div>
  );
}