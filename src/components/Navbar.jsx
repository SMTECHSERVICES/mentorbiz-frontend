


// import { useState } from "react";
// import { Link } from "react-router-dom";

// const MenuLink = ({ to, children, onClick }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="relative font-medium text-gray-700 group py-2 md:p-0"
//   >
//     {children}
//     <span
//       className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left
//                  scale-x-0 bg-[#465ADA] transition-transform duration-300
//                  group-hover:scale-x-100"
//     />
//   </Link>
// );

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [carrierDropdown, setCarrierDropdown] = useState(false);

//   const handleCarrierToggle = () => setCarrierDropdown(!carrierDropdown);
//   const closeAll = () => {
//     setOpen(false);
//     setCarrierDropdown(false);
//   };

//   const navItems = (
//     <>
//       <li><MenuLink to="/" onClick={closeAll}>Home</MenuLink></li>
//       <li><MenuLink to="/about" onClick={closeAll}>About</MenuLink></li>
//       <li><MenuLink to="/services" onClick={closeAll}>Services</MenuLink></li>
//        <li><MenuLink to="/current-event" onClick={closeAll}>Current Event</MenuLink></li>

//       {/* Carrier Dropdown */}
//       <li className="relative group">
//         <button
//           onClick={handleCarrierToggle}
//           className="relative font-medium text-gray-700 group py-2 md:p-0 flex items-center"
//         >
//           Career
//           <svg
//             className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${
//               carrierDropdown ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         {/* Dropdown - Desktop */}
//         {carrierDropdown && (
//           <ul className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:block hidden transition-all duration-300">
//             <li>
//               <Link
//                 to="/internship"
//                 onClick={closeAll}
//                 className="block px-4 py-2 hover:bg-[#F3F4F6] text-sm text-gray-700"
//               >
//                 Internship
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/job"
//                 onClick={closeAll}
//                 className="block px-4 py-2 hover:bg-[#F3F4F6] text-sm text-gray-700"
//               >
//                 Job
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/live-project"
//                 onClick={closeAll}
//                 className="block px-4 py-2 hover:bg-[#F3F4F6] text-sm text-gray-700"
//               >
//                 Live Project
//               </Link>
//             </li>
//           </ul>
//         )}
//       </li>

//       <li><MenuLink to="/contact" onClick={closeAll}>Contact</MenuLink></li>
//       <li><MenuLink to="/login" onClick={closeAll}>Login</MenuLink></li>
//     </>
//   );

//   const mobileDropdown = (
//     carrierDropdown && (
//       <ul className="ml-4 mt-2 space-y-1 rounded-md bg-gray-50 p-2 border border-gray-200">
//         <li>
//           <Link
//             to="/internship"
//             onClick={closeAll}
//             className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
//           >
//             Internship
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/job"
//             onClick={closeAll}
//             className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
//           >
//             Job
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/live-project"
//             onClick={closeAll}
//             className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
//           >
//             Live Project
//           </Link>
//         </li>
//       </ul>
//     )
//   );

//   return (
//     <nav className="bg-white shadow-md fixed inset-x-0 top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center text-2xl font-bold" style={{ color: "#465ADA" }}>
//           <img src="/images/fav_icon.png" alt="logo" className="h-12 w-12 mr-2" />
//           MentorConnect
//         </Link>

//         {/* Hamburger Menu (Mobile) */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#465ADA]"
//           aria-label="Toggle navigation"
//         >
//           {open ? (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           ) : (
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           )}
//         </button>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex gap-8 text-sm">{navItems}</ul>
//       </div>

//       {/* Mobile Nav */}
//       {open && (
//         <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
//           <ul className="flex flex-col px-6 py-4 space-y-2">
//             <li><MenuLink to="/" onClick={closeAll}>Home</MenuLink></li>
//             <li><MenuLink to="/about" onClick={closeAll}>About</MenuLink></li>
//             <li><MenuLink to="/services" onClick={closeAll}>Services</MenuLink></li>
//             <li><MenuLink to="/current-event" onClick={closeAll}>Current Event</MenuLink></li>
//             <li>
//               <button onClick={handleCarrierToggle} className="text-gray-700 font-medium flex items-center">
//                 Career
//                 <svg
//                   className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${
//                     carrierDropdown ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               {mobileDropdown}
//             </li>
//             <li><MenuLink to="/contact" onClick={closeAll}>Contact</MenuLink></li>
//             <li><MenuLink to="/login" onClick={closeAll}>Login</MenuLink></li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import { useState } from "react";
import { Link } from "react-router-dom";

const MenuLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative font-medium text-gray-700 group py-2 md:p-0"
  >
    {children}
    <span
      className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left
                 scale-x-0 bg-[#465ADA] transition-transform duration-300
                 group-hover:scale-x-100"
    />
  </Link>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [carrierDropdown, setCarrierDropdown] = useState(false);

  const handleCarrierToggle = () => setCarrierDropdown(!carrierDropdown);
  const closeAll = () => {
    setOpen(false);
    setCarrierDropdown(false);
  };

  const navItems = (
    <>
      <li><MenuLink to="/" onClick={closeAll}>Home</MenuLink></li>
      <li><MenuLink to="/about" onClick={closeAll}>About</MenuLink></li>
      <li><MenuLink to="/services" onClick={closeAll}>Services</MenuLink></li>
      <li><MenuLink to="/current-event" onClick={closeAll}>Current Event</MenuLink></li>
       <li><MenuLink to="/career" onClick={closeAll}>Career</MenuLink></li>

      {/* Career Dropdown */}
      {/* <li className="relative group"> */}
        {/* <button
          onClick={handleCarrierToggle}
          className="relative font-medium text-gray-700 group py-2 md:p-0 flex items-center"
        >
          Career */}
          {/* <svg
            className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${carrierDropdown ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg> */}
        {/* </button> */}

        {/* Dropdown - Desktop */}
        {/* {carrierDropdown && (
          <ul className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 md:block hidden transition-all duration-300">
            <li>
              <Link to="/internship" onClick={closeAll} className="block px-4 py-2 hover:bg-[#F3F4F6] text-sm text-gray-700">
                Internship
              </Link>
            </li>
            <li>
              <Link to="/job" onClick={closeAll} className="block px-4 py-2 hover:bg-[#F3F4F6] text-sm text-gray-700">
                Job
              </Link>
            </li>
            <li>
              <Link to="/live-project" onClick={closeAll} className="block px-4 py-2 hover:bg-[#F3F4F6] text-sm text-gray-700">
                Live Project
              </Link>
            </li>
          </ul>
        )} */}
      {/* </li> */}

      <li><MenuLink to="/contact" onClick={closeAll}>Contact</MenuLink></li>
      <li><MenuLink to="/login" onClick={closeAll}>Login</MenuLink></li>
    </>
  );

  const mobileDropdown = (
    carrierDropdown && (
      <ul className="ml-4 mt-2 space-y-1 rounded-md bg-gray-50 p-2 border border-gray-200">
        <li>
          <Link to="/internship" onClick={closeAll} className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            Internship
          </Link>
        </li>
        <li>
          <Link to="/job" onClick={closeAll} className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            Job
          </Link>
        </li>
        <li>
          <Link to="/live-project" onClick={closeAll} className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            Live Project
          </Link>
        </li>
      </ul>
    )
  );

  return (
    <nav className="bg-white shadow-md fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and Sponsor Section */}
        <div className="flex flex-col items-start">
          <Link to="/" className="flex items-center text-2xl font-bold" style={{ color: "#465ADA" }}>
            <img src="/images/fav_icon.png" alt="logo" className="h-12 w-12 mr-2" />
            MentorConnect
          </Link>
          <div className="flex items-center mt-1 ml-15 space-x-2 text-xs text-gray-500">
            <span>Sponsored by:</span>
          <a href="https://www.iamr.ac.in" target="_blank">  <img src="/images/logo2.jpg" alt="Sponsor 1" className="h-6 w-auto object-contain" /></a>
           <a href="https://vrindustries.org.in" target="_blank"> <img src="/images/logo1.png" alt="Sponsor 2" className="h-6 w-auto object-contain" /></a>
          </div>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#465ADA]"
          aria-label="Toggle navigation"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-sm">{navItems}</ul>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col px-6 py-4 space-y-2">
            <li><MenuLink to="/" onClick={closeAll}>Home</MenuLink></li>
            <li><MenuLink to="/about" onClick={closeAll}>About</MenuLink></li>
            <li><MenuLink to="/services" onClick={closeAll}>Services</MenuLink></li>
            <li><MenuLink to="/current-event" onClick={closeAll}>Current Event</MenuLink></li>
            <li>
              <MenuLink to="/career" onClick={closeAll}>Career</MenuLink>
              {/* <button onClick={handleCarrierToggle} className="text-gray-700 font-medium flex items-center">
                Career
                <svg
                  className={`ml-1 w-4 h-4 transform transition-transform duration-200 ${carrierDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileDropdown} */}
            </li>
            <li><MenuLink to="/contact" onClick={closeAll}>Contact</MenuLink></li>
            <li><MenuLink to="/login" onClick={closeAll}>Login</MenuLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
