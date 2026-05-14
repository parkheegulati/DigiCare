import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ user, onLogout }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
      <Link 
        to="/profile" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
      >
        My Profile
      </Link>
      <button
        onClick={onLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

ProfileDropdown.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default ProfileDropdown;