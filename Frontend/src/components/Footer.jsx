const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* DigiCare Section */}
          <div>
            <h4 className="text-lg font-semibold">DigiCare</h4>
            <div className="w-10 border-b-2 border-white my-2"></div>
            <div className="flex flex-col space-y-1">
              <a href="#" className="hover:text-gray-400 transition">Facebook</a>
              <a href="#" className="hover:text-gray-400 transition">Twitter</a>
              <a href="#" className="hover:text-gray-400 transition">Instagram</a>
            </div>
          </div>
  
          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="w-10 border-b-2 border-white my-2"></div>
            <div className="flex flex-col space-y-1">
              <a href="/" className="hover:text-gray-400 transition">Home</a>
              <a href="/explore" className="hover:text-gray-400 transition">Features</a>
              <a href="/about" className="hover:text-gray-400 transition">About us</a>
              <a href="/" className="hover:text-gray-400 transition">Appointment</a>
            </div>
          </div>
  
          {/* Our Services Section */}
          <div>
            <h4 className="text-lg font-semibold">Our Services</h4>
            <div className="w-10 border-b-2 border-white my-2"></div>
            <div className="flex flex-col space-y-1">
              <a href="/image-analysis" className="hover:text-gray-400 transition">AI Image Analysis</a>
              <a href="/image-analysis" className="hover:text-gray-400 transition">Smart History Scan</a>
              <a href="/portal" className="hover:text-gray-400 transition">Patient & Doctor Portal</a>
              <a href="/explore" className="hover:text-gray-400 transition">ChatBots</a>
            </div>
          </div>
  
          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="w-10 border-b-2 border-white my-2"></div>
            <p className="text-gray-300">Phone: 999999999</p>
            <p className="text-gray-300">Email: <a href="mailto:singlamehak2005@gmail.com" className="text-blue-400 hover:underline">singlamehak2005@gmail.com</a></p>
          </div>
        </div>
  
        {/* Bottom Copyright Section */}
        <div className="mt-6 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} DigiCare. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  