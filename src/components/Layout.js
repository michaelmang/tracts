export default function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#181818" }}>
      {children}
      <div className="h-16 w-full"></div>
    </div>
  );
}