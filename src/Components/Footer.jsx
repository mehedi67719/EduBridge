import React from "react";
import { Mail, Phone, MapPin, Globe, Sparkles, Heart } from "lucide-react";
import { FaFacebook, FaYoutube } from "react-icons/fa6";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Help Center", href: "/help" },
  ];

  const features = [
    { name: "Class Routine", href: "/routine" },
    { name: "Assignments", href: "/assignment" },
    { name: "Attendance", href: "/attendance" },
    { name: "Results", href: "/results" },
    { name: "Notice Board", href: "/notice" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Education Road, Dhaka, Bangladesh" },
    { icon: Phone, text: "+880 1234 567890" },
    { icon: Mail, text: "support@edubridge.com" },
    { icon: Globe, text: "www.edubridge.com" },
  ];

  const socialIcons = [
    { icon: FaFacebook, href: "#", color: "hover:bg-blue-600" },
    { icon: FaTwitter, href: "#", color: "hover:bg-sky-500" },
    { icon: FaLinkedin, href: "#", color: "hover:bg-blue-700" },
    { icon: FaYoutube, href: "#", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Edu
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Bridge
                </span>
              </h1>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bridging Knowledge, Connecting Minds. A complete digital ecosystem
              for modern education management.
            </p>
            <div className="flex space-x-3">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:scale-110 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Features
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index}>
                  <a
                    href={feature.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    {feature.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-300 text-sm"
                >
                  <info.icon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 EduBridge. All rights reserved. | Smart Campus Management
              System
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
              <span>for better education</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
