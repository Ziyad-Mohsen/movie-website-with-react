import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Routes } from "../../constants/enums";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebook size={24} />,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: <FaTwitter size={24} />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <FaInstagram size={24} />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: <FaYoutube size={24} />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedin size={24} />,
  },
];

const quickLinks = [
  { name: "Home", href: Routes.ROOT },
  { name: "Movies", href: Routes.MOVIES },
  { name: "TV Series", href: Routes.SERIES },
  { name: "Collections", href: Routes.COLLECTION },
  { name: "Pricing", href: Routes.PRICING },
  { name: "FAQ", href: Routes.FAQ },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-tr from-secondary-shade-3 from-0% to-bg to-20% border-t border-primary-shade-3/20">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              className="font-bold text-2xl text-primary mb-4 inline-block"
              to={Routes.ROOT}
            >
              Cinema
            </Link>
            <p className="text-neutral-gray text-sm leading-relaxed mb-6">
              Your ultimate destination for movies and TV series. Discover,
              watch, and enjoy the best entertainment content from around the
              world.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-gray hover:text-primary transition-colors duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-gray hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-white mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-gray hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-white mb-4">
              Stay Updated
            </h3>
            <p className="text-neutral-gray text-sm mb-4">
              Subscribe to our newsletter for the latest movies and series
              updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-bg-tent-1 border border-primary-shade-3 rounded-l-md text-neutral-white placeholder-neutral-gray text-sm focus:outline-none focus:border-primary"
              />
              <button className="px-4 py-2 bg-primary hover:bg-primary-tent-1 text-neutral-white rounded-r-md transition-colors duration-300 text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center border-t border-primary-shade-3/20 pt-8">
          <p className="text-neutral-gray text-sm">
            © {currentYear} Cinema. All rights reserved. Made with{" "}
            <FaHeart className="inline text-semantic-red" size={12} /> for movie
            lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
