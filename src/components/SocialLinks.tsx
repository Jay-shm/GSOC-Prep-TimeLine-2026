import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/jay_.rane',
    color: 'hover:text-pink-600',
    bgColor: 'hover:bg-pink-50',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/jayr-shm/',
    color: 'hover:text-blue-600',
    bgColor: 'hover:bg-blue-50',
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://x.com/Jay_Rane__',
    color: 'hover:text-sky-500',
    bgColor: 'hover:bg-sky-50',
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/Jay-shm',
    color: 'hover:text-gray-800',
    bgColor: 'hover:bg-gray-50',
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    url: 'https://discord.gg/wq5RQgg2',
    color: 'hover:text-indigo-600',
    bgColor: 'hover:bg-indigo-50',
  },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 flex-wrap gap-2">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${social.color} ${social.bgColor} text-gray-600`}
          aria-label={social.name}
        >
          <social.icon size={16} className="sm:w-5 sm:h-5" />
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;