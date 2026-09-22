const Footer = () => {
    return (
      <footer className="bg-[#f7f6f3] dark:bg-[#191919] text-[#37352f] dark:text-[#e3e3e3] border-t border-[#e9e9e7] dark:border-[#2f2f2f] py-12 px-6 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          
          {/* DigiCare Section */}
          <div>
            <h4 className="text-base font-semibold text-[#37352f] dark:text-[#e3e3e3]">DigiCare</h4>
            <div className="w-8 border-b border-[#37352f] dark:border-[#e3e3e3] my-2 opacity-30"></div>
            <div className="flex flex-col space-y-1 text-[#787774] dark:text-[#9b9b9b]">
              <a href="#" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Facebook</a>
              <a href="#" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Twitter</a>
              <a href="#" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Instagram</a>
            </div>
          </div>
  
          {/* Quick Links Section */}
          <div>
            <h4 className="text-base font-semibold text-[#37352f] dark:text-[#e3e3e3]">Quick Links</h4>
            <div className="w-8 border-b border-[#37352f] dark:border-[#e3e3e3] my-2 opacity-30"></div>
            <div className="flex flex-col space-y-1 text-[#787774] dark:text-[#9b9b9b]">
              <a href="/" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Home</a>
              <a href="/explore" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Features</a>
              <a href="/about" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">About us</a>
              <a href="/" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Appointment</a>
            </div>
          </div>
  
          {/* Our Services Section */}
          <div>
            <h4 className="text-base font-semibold text-[#37352f] dark:text-[#e3e3e3]">Our Services</h4>
            <div className="w-8 border-b border-[#37352f] dark:border-[#e3e3e3] my-2 opacity-30"></div>
            <div className="flex flex-col space-y-1 text-[#787774] dark:text-[#9b9b9b]">
              <a href="/image-analysis" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">AI Image Analysis</a>
              <a href="/image-analysis" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Smart History Scan</a>
              <a href="/portal" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">Patient & Doctor Portal</a>
              <a href="/explore" className="hover:text-[#37352f] dark:hover:text-[#e3e3e3] transition">ChatBots</a>
            </div>
          </div>
  
          {/* Contact Section */}
          <div>
            <h4 className="text-base font-semibold text-[#37352f] dark:text-[#e3e3e3]">Contact Us</h4>
            <div className="w-8 border-b border-[#37352f] dark:border-[#e3e3e3] my-2 opacity-30"></div>
            <p className="text-[#787774] dark:text-[#9b9b9b]">Phone: 999999999</p>
            <p className="text-[#787774] dark:text-[#9b9b9b]">Email: <a href="mailto:singlamehak2005@gmail.com" className="text-[#2383e2] hover:underline">singlamehak2005@gmail.com</a></p>
          </div>
        </div>
  
        {/* Bottom Copyright Section */}
        <div className="mt-8 pt-6 border-t border-[#e9e9e7] dark:border-[#2f2f2f] text-center text-[#787774] dark:text-[#9b9b9b] text-xs">
          © {new Date().getFullYear()} DigiCare. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  