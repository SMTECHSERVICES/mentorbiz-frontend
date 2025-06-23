
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold flex justify-center items-center" style={{ color: "#465ADA" }}>
//          <img src="/images/fav_icon.png" alt="" className="h-12 w-15 " /> MentorConnect
//         </Link>
//         <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-sm">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/signup">Student Sign Up</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/services">Services</Link></li>
//           <li><Link to="/become-mentor">Become a Mentor</Link></li>
//           <li><Link to="/find-mentors">Find Mentors</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";

const MenuLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative font-medium text-gray-700 group"
  >
    {children}
    {/* animated underline */}
    <span
      className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left
                 scale-x-0 bg-[#465ADA] transition-transform duration-300
                 group-hover:scale-x-100"
    />
  </Link>
);

const Navbar = () => (
  <nav className="bg-white shadow-md fixed w-full z-50">
    <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
      <Link
        to="/"
        className="flex items-center text-2xl font-bold"
        style={{ color: "#465ADA" }}
      >
        <img src="/images/fav_icon.png" alt="" className="h-12 w-15 mr-2" />
        MentorConnect
      </Link>

      <ul className="hidden md:flex gap-8 text-sm">
        <li><MenuLink to="/">Home</MenuLink></li>
         <li><MenuLink to="/about">About</MenuLink></li>
        <li><MenuLink to="/services">Services</MenuLink></li>
        <li><MenuLink to="/mentee-registraion">Mentee Registraion</MenuLink></li>
       
        <li><MenuLink to="/mentor-registration">Mentor Registration</MenuLink></li>
        {/* <li><MenuLink to="/find-mentors">Find Mentors</MenuLink></li> */}
        <li><MenuLink to="/contact">Contact</MenuLink></li>
        <li><MenuLink to="/login">Login</MenuLink></li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
