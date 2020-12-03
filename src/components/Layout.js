import AlertBar from "./AlertBar.js";
import ProgressBar from "./ProgressBar.js";

export default function Layout({ children, error, loading }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#181818" }}>
      {loading && <ProgressBar />}
      {error && <AlertBar error={error} />}
      {children}
      {!loading && <div className="justify-self-end h-4 md:h-16 w-full text-white flex items-center justify-center text-xs py-4 md:py-10 md:pl-12">
        Created by Michael Mangialardi <span className="mx-2">|</span>
        <a href="https://www.buymeacoffee.com/fgn7ts2" target="_blank" rel="noreferrer noopenner">
          <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="h-8 w-auto" />
        </a>
      </div>}
    </div>
  );
}