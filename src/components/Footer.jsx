import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-50 to-gray-100/80 backdrop-blur-sm border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ascendo
              </span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md leading-relaxed">
              Empowering individuals and businesses with AI-driven content creation and deep analytics to make smarter decisions and scale faster.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 hover:bg-pink-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  AI Content Creation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Automated Post Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Trend & Sentiment Insights
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Data-Driven Strategy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@ascendo.ai" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-indigo-100 group-hover:bg-indigo-200 rounded-lg flex items-center justify-center transition-colors">
                    <Mail size={16} className="text-indigo-600" />
                  </div>
                  support@ascendo.ai
                </a>
              </li>
              <li>
                <a href="tel:+1800123456" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                    <Phone size={16} className="text-green-600" />
                  </div>
                  +1 (800) 123-456
                </a>
              </li>
              <li>
                <div className="text-slate-600 flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-red-600" />
                  </div>
                  <span>San Francisco, CA 94105</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500 mb-4 md:mb-0">
            ©️ {new Date().getFullYear()} Ascendo. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
