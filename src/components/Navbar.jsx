// import { Link } from 'react-router-dom';

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-blue-600">MentorConnectIndia</Link>
//         <div className="space-x-4">
//           <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
//           <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
//           <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
//           <Link to="/find-mentor" className="text-gray-700 hover:text-blue-600">Find a Mentor</Link>
//           <Link to="/become-mentor" className="text-gray-700 hover:text-blue-600">Become a Mentor</Link>
//           <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Mentors India
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
          <Link to="/find-mentor" className="text-gray-700 hover:text-blue-600">Find a Mentor</Link>
          <Link to="/become-mentor" className="text-gray-700 hover:text-blue-600">Become a Mentor</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/services" className="block py-2 text-gray-700 hover:text-blue-600">Services</Link>
          <Link to="/find-mentor" className="block py-2 text-gray-700 hover:text-blue-600">Find a Mentor</Link>
          <Link to="/become-mentor" className="block py-2 text-gray-700 hover:text-blue-600">Become a Mentor</Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</Link>
        </div>
      )}
    </nav>
  );
}
