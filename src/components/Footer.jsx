// // import React from "react";

// // export default function Footer() {
// //   return (
// //     <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
// //       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
// //         <div className="mb-4 md:mb-0 text-center md:text-left">
// //           <h3 className="text-xl font-bold text-white">Mentors India</h3>
// //           <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
// //         </div>
// //         <nav className="flex space-x-6 text-sm">
// //           <a href="/" className="hover:text-white">Home</a>
// //           <a href="/about" className="hover:text-white">About</a>
// //           <a href="/services" className="hover:text-white">Services</a>
// //           <a href="/become-mentor" className="hover:text-white">Join as Mentor</a>
// //           <a href="/contact" className="hover:text-white">Contact</a>
// //         </nav>
// //         <div className="flex space-x-4 mt-4 md:mt-0">
// //           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
// //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.018 3.676 9.167 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.167 22 17.018 22 12z" /></svg>
// //           </a>
// //           <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
// //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.07 9.07 0 01-2.88 1.1A4.52 4.52 0 0016.5 2a4.48 4.48 0 00-4.48 4.48c0 .35.04.69.11 1.02A12.75 12.75 0 013 3.15a4.48 4.48 0 001.38 6 4.48 4.48 0 01-2.03-.56v.06a4.48 4.48 0 003.6 4.4 4.52 4.52 0 01-2.02.08 4.48 4.48 0 004.18 3.12 9.06 9.06 0 01-5.6 1.94A9.32 9.32 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.85 12.78-12.78 0-.19 0-.37-.01-.56A9.18 9.18 0 0023 3z" /></svg>
// //           </a>
// //           <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
// //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.11 2.48 2.5zM.22 7h5.55v17H.22V7zM8.78 7h5.33v2.56h.08c.74-1.4 2.55-2.88 5.25-2.88 5.62 0 6.66 3.7 6.66 8.5V24H19v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.06-3.03 4.18V24h-5.34V7z" /></svg>
// //           </a>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }
// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
//         {/* ब्रांड, पता, कॉपीराइट, डिज़ाइन क्रेडिट */}
//         <div className="mb-4 md:mb-0 text-center md:text-left">
//           <h3 className="text-xl font-bold text-white">Mentors India</h3>

//           {/* पता */}
//           <address className="not-italic text-sm leading-relaxed mt-1">
//             Plot No. 46, Harfala Road, Opp. Petrol Pump,<br />
//             Sikari, Ballabgarh, Haryana&nbsp;-&nbsp;121004
//           </address>

//           {/* कॉपीराइट + डिज़ाइन बाय */}
//           <p className="text-xs mt-2">
//             © {new Date().getFullYear()} All rights reserved. &nbsp;|&nbsp;
//             Powered by:{" "}
//             <a
//               href="https://www.smservice.co.in/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-400 hover:underline"
//             >
//               SM Services
//             </a>
//           </p>
//         </div>

//         {/* Social ICON*/}
//         <div className="flex space-x-4">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Facebook"
//             className="hover:text-white"
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.018 3.676 9.167 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.167 22 17.018 22 12z" />
//             </svg>
//           </a>

//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Twitter"
//             className="hover:text-white"
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.07 9.07 0 01-2.88 1.1A4.52 4.52 0 0016.5 2a4.48 4.48 0 00-4.48 4.48c0 .35.04.69.11 1.02A12.75 12.75 0 013 3.15a4.48 4.48 0 001.38 6 4.48 4.48 0 01-2.03-.56v.06a4.48 4.48 0 003.6 4.4 4.52 4.52 0 01-2.02.08 4.48 4.48 0 004.18 3.12 9.06 9.06 0 01-5.6 1.94A9.32 9.32 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.85 12.78-12.78 0-.19 0-.37-.01-.56A9.18 9.18 0 0023 3z" />
//             </svg>
//           </a>

//           <a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="LinkedIn"
//             className="hover:text-white"
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.11 2.48 2.5zM.22 7h5.55v17H.22V7zM8.78 7h5.33v2.56h.08c.74-1.4 2.55-2.88 5.25-2.88 5.62 0 6.66 3.7 6.66 8.5V24H19v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.06-3.03 4.18V24h-5.34V7z" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }



import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        {/* Left Section: Brand Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold text-white">Mentors India</h3>

          <address className="not-italic text-sm leading-relaxed mt-1">
            Plot No. 46, Harfala Road, Opp. Petrol Pump,<br />
            Sikari, Ballabgarh, Haryana&nbsp;-&nbsp;121004
          </address>

          <p className="text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved. &nbsp;|&nbsp;
            Powered by:{" "}
           <a
  href="https://www.smservice.co.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block"
>
  <img
    src="/images/smlogo2.png"
    alt="SM Services"
    className="h-5 bg-white inline-block object-contain"
  />
</a>

          </p>
        </div>

        {/* Middle Section: Sponsors */}
        <div className="mb-6 md:mb-0 text-center">
          <p className="text-sm mb-2 text-gray-400">Sponsored by:</p>
          <div className="flex items-center justify-center space-x-4">
          <a href="https://www.iamr.ac.in" target="_blank">
              <img
              src="/images/logo2.jpg"
              alt="Sponsor 1"
              className="h-8 cursor-pointer w-auto object-contain"
            />
          </a>
            <a href="https://vrindustries.org.in" target="_blank">
              <img
              src="/images/logo1.png"
              alt="Sponsor 2"
              className="h-8 cursor-pointer w-auto object-contain"
            />
            </a>
          </div>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.018 3.676 9.167 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.167 22 17.018 22 12z" />
            </svg>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.07 9.07 0 01-2.88 1.1A4.52 4.52 0 0016.5 2a4.48 4.48 0 00-4.48 4.48c0 .35.04.69.11 1.02A12.75 12.75 0 013 3.15a4.48 4.48 0 001.38 6 4.48 4.48 0 01-2.03-.56v.06a4.48 4.48 0 003.6 4.4 4.52 4.52 0 01-2.02.08 4.48 4.48 0 004.18 3.12 9.06 9.06 0 01-5.6 1.94A9.32 9.32 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.85 12.78-12.78 0-.19 0-.37-.01-.56A9.18 9.18 0 0023 3z" />
            </svg>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.11 2.48 2.5zM.22 7h5.55v17H.22V7zM8.78 7h5.33v2.56h.08c.74-1.4 2.55-2.88 5.25-2.88 5.62 0 6.66 3.7 6.66 8.5V24H19v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.06-3.03 4.18V24h-5.34V7z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
