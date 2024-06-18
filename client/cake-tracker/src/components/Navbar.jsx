import { Link } from 'react-router-dom';
import { FaBirthdayCake } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className="text-white hover:text-gray-300 flex items-center"
          >
            <FaBirthdayCake className="mr-2" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/add-member" className="text-white hover:text-gray-300">
            Add Member
          </Link>
        </li>
        <li>
          <Link to="/calendar" className="text-white hover:text-gray-300">
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/report" className="text-white hover:text-gray-300">
            Report
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
