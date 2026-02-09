import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 font-(family-name:--font-poppins) border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h2 className="font-(family-name:--font-outfit) text-3xl font-bold text-white flex items-center gap-1">
              Savora<span className="text-rose-500">.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering happiness to your doorstep. We are dedicated to
              providing the best food experience with hygiene, speed, and love.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={20} />} href="#" />
              <SocialLink icon={<Twitter size={20} />} href="#" />
              <SocialLink icon={<Instagram size={20} />} href="#" />
              <SocialLink icon={<Linkedin size={20} />} href="#" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold font-(family-name:--font-outfit) mb-6 text-rose-500">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink to="/careers">Careers</FooterLink>
              </li>
              <li>
                <FooterLink to="/team">Our Team</FooterLink>
              </li>
              <li>
                <FooterLink to="/blog">Savora Blog</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-(family-name:--font-outfit) mb-6 text-rose-500">
              Contact
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-rose-500 shrink-0 mt-0.5" />
                <span>
                  123 Food Street, Mall Road,
                  <br />
                  Nainital, Uttarakhand
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-rose-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-rose-500 shrink-0" />
                <span>support@savora.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold font-(family-name:--font-outfit) mb-6 text-rose-500">
              Legal
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <FooterLink to="/terms">Terms & Conditions</FooterLink>
              </li>
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/cookie">Cookie Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/refund">Refund Policy</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Savora Technologies Pvt. Ltd. All
            rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with
            <Heart size={12} className="text-rose-500 fill-rose-500" /> By
            Junaid Khan
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
  >
    {children}
  </Link>
);

const SocialLink = ({ icon, href }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-rose-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default Footer;
