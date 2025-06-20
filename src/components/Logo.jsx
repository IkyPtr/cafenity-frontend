import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="flex flex-col leading-tight select-none">
      <h1 className="text-3xl font-bold font-serif">Cafenity
        <span className="text-blue-500">.</span>
      </h1>
      <span className="text-xs font-medium text-gray-400">Cita Rasa Masa Kini</span>
    </Link>
  );
}
