


// import { Link } from "react-router-dom";

// const MenuLink = ({ to, children }) => (
//   <Link
//     to={to}
//     className="relative font-medium text-gray-700 group"
//   >
//     {children}
//     {/* animated underline */}
//     <span
//       className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left
//                  scale-x-0 bg-[#465ADA] transition-transform duration-300
//                  group-hover:scale-x-100"
//     />
//   </Link>
// );

// const Navbar = () => (
//   <nav className="bg-white shadow-md fixed w-full z-50">
//     <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
//       <Link
//         to="/"
//         className="flex items-center text-2xl font-bold"
//         style={{ color: "#465ADA" }}
//       >
//         <img src="/images/fav_icon.png" alt="" className="h-12 w-15 mr-2" />
//         MentorConnect
//       </Link>

//       <ul className="hidden md:flex gap-8 text-sm">
//         <li><MenuLink to="/">Home</MenuLink></li>
//          <li><MenuLink to="/about">About</MenuLink></li>
//         <li><MenuLink to="/services">Services</MenuLink></li>
//         <li><MenuLink to="/mentee-registraion">Mentee Registraion</MenuLink></li>
       
//         <li><MenuLink to="/mentor-registration">Mentor Registration</MenuLink></li>
//         {/* <li><MenuLink to="/find-mentors">Find Mentors</MenuLink></li> */}
//         <li><MenuLink to="/contact">Contact</MenuLink></li>
//         <li><MenuLink to="/login">Login</MenuLink></li>
//       </ul>
//     </div>
//   </nav>
// );

// export default Navbar;
import { useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────────── Re-usable link with underline ─────────────────── */
const MenuLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}              /* close mobile drawer after click   */
    className="relative font-medium text-gray-700 group py-2 md:p-0"
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

/* ───────────────────────────── Navbar ──────────────────────────────── */
const Navbar = () => {
  const [open, setOpen] = useState(false);

  /* list once so we don’t repeat it for mobile + desktop */
  const navItems = (
    <>
      <li><MenuLink to="/"                  onClick={() => setOpen(false)}>Home</MenuLink></li>
      <li><MenuLink to="/about"             onClick={() => setOpen(false)}>About</MenuLink></li>
      <li><MenuLink to="/services"          onClick={() => setOpen(false)}>Services</MenuLink></li>
      {/* <li><MenuLink to="/mentee-registraion" onClick={() => setOpen(false)}>Mentee Registration</MenuLink></li>
      <li><MenuLink to="/mentor-registration" onClick={() => setOpen(false)}>Mentor Registration</MenuLink></li> */}
      {/* <li><MenuLink to="/find-mentors"   onClick={() => setOpen(false)}>Find Mentors</MenuLink></li> */}
      <li><MenuLink to="/current-jobs" onClick={() => setOpen(false)}>Current Jobs</MenuLink></li>
      <li><MenuLink to="/contact" onClick={() => setOpen(false)}>Contact</MenuLink></li>
      <li><MenuLink to="/login" onClick={() => setOpen(false)}>Login</MenuLink></li>
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* logo / brand */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold"
          style={{ color: "#465ADA" }}
        >
          <img src="/images/fav_icon.png" alt="" className="h-12 w-12 mr-2" />
          MentorConnect
        </Link>

        {/* hamburger (hidden ≥ md) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#465ADA]"
          aria-label="Toggle navigation"
        >
          {/* simple SVG icons to avoid extra deps */}
          {open ? (
            /* X icon */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* hamburger bars */
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* desktop menu */}
        <ul className="hidden md:flex gap-8 text-sm">{navItems}</ul>
      </div>

      {/* mobile slide-down menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col px-6 py-4 space-y-2">{navItems}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
