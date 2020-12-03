export default function Layout({ children, loading }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#181818" }}>
      {children}
      {!loading && <div className="justify-self-end h-4 md:h-16 w-full text-white flex items-center justify-center md:justify-start text-xs py-4 md:py-10 md:pl-12">
        Created by Michael Mangialardi <span className="mx-2">|</span>
        <a href="https://www.buymeacoffee.com/fgn7ts2" target="_blank" rel="noreferrer noopenner">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-8 w-auto" />
        </a>
      </div>}
    </div>
  );
}