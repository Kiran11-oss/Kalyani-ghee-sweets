import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-7xl font-display font-black text-gold mb-2">404</p>
      <h1 className="text-xl font-bold text-gray-700 mb-4">Page Not Found</h1>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}
