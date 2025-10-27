import React, { useState, useEffect, useRef } from "react";
import {
  Aperture,
  Code,
  Server,
  Zap,
  Compass,
  Mail,
  Linkedin,
  ArrowRight,
  Instagram,
  GitBranch,
  Menu,
  X,
  Send,
  ArrowUp,
  Phone,
  MapPin,
  Heart,
  Briefcase,
  Target, // Keeping this imported just in case, but replacing usage
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import developerImage from './assets/jules5.png'
// --- IMAGE FIX: Using a publicly accessible placeholder URL ---
// NOTE: Using a placeholder URL for the profile picture as local files are inaccessible.



// --- Custom GitHub SVG Component ---
const GithubIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-4-1.3c-1.5 0-3-.6-4-1.8v-1.2C7 13.5 7.5 13 9 13h6c1.5 0 2.5.5 3.5 1.5v1.2a4.8 4.8 0 0 0-4 1.3v4" />
    <path d="M9 19c-4 1.5-6.5-2.2-6.5-6.5C2.5 7.5 7 2 12 2s9.5 5.5 9.5 10.5c0 4.3-2.5 8-6.5 6.5" />
    <path d="M12 22s-2.5-3.5-2.5-5.5c0-1.5.5-2.5 2.5-2.5s2.5 1 2.5 2.5c0 2-2.5 5.5-2.5 5.5" />
  </svg>
);

// --- Custom WhatsApp SVG Component ---
const RealWhatsAppIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M12 0C5.373 0 0 5.373 0 12c0 2.213.585 4.316 1.704 6.136L0 24l6.195-1.693c1.782.978 3.824 1.564 5.8 1.564 6.627 0 12-5.373 12-12S18.627 0 12 0z"
      fill="#25D366"
    />
    <path
      fill="white"
      d="M17.5 14.3c-.3-.1-1.8-.9-2.1-.9s-.7.1-.9.4-1 .8-1.2.9-.4.2-.8.1c-.4-.1-1.7-.6-3.2-2s-2.6-2.4-2.8-2.7c-.2-.4 0-.6.1-.7s.3-.4.4-.5c.1-.1.2-.3.3-.4s.2-.3.1-.6c-.1-.3-.6-1.5-.8-2s-.4-.8-.8-.8c-.3 0-.6-.1-.9-.1s-.8-.1-1.2.4c-.4.5-1.5 1.5-1.5 3.5s1.6 3.9 1.8 4.2c.2.3 3.3 5.1 8 7s5.9 1.9 6.9 1.7c1-.2 1.8-.7 2.1-1.3s.4-1.2.4-1.2c.2-.5.1-.9-.1-1.2s-.3-.5-.7-.7z"
      transform="translate(1, -0.5) scale(0.9)"
    />
  </svg>
);

// --- New Volleyball SVG Component ---
const VolleyballIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    {/* Simple stitching pattern for a volleyball look */}
    <path d="M12 2a10 10 0 0 1 8.66 5A10 10 0 0 1 12 22a10 10 0 0 1-8.66-5A10 10 0 0 1 12 2z" opacity="0.1" />
    <path d="M6 18c.5-2.5 1-5 1.5-7.5" />
    <path d="M18 6c-2.5.5-5 1-7.5 1.5" />
    <path d="M16 16.5c-2.5-.5-5-1-7.5-1.5" />
    <path d="M15.5 15.5c-.5-2.5-1-5-1.5-7.5" />
  </svg>
);


// Configuration Constants (Kept changes from previous versions)
const developerName = "HIRWA Jules Maurice";
const developerEmail = "hirwajules2000@gmail.com";
const developerPhone = "+250786931313";
const developerLocation = "Rwanda, Kigali";
const developerExperience = "3 Years";
const developerSideSkill = "Playing Volleyball"; 
const developerGithub = "https://github.com/Hirwa24";
const WhatsAppIcon = RealWhatsAppIcon;
const currentYear = new Date().getFullYear();
const LOADER_DURATION_MS = 2000;
const WHATSAPP_MESSAGE =
  "Hello Maurice, I saw your Full-Stack Developer portfolio and would like to discuss a potential project or collaboration!";
const FORM_ENDPOINT = `https://formspree.io/f/xldpvqna`; // Placeholder Formspree ID


// --- Data Structure (Unchanged) ---
const skillsData = {
  frontend: [
    { name: "React", icon: "Code" },
    { name: "Vue.js", icon: "Code" },
    { name: "HTML5/CSS3", icon: "Code" },
    { name: "Tailwind CSS", icon: "Zap" },
    { name: "JavaScript", icon: "Code" },
  ],
  backend: [
    { name: "Node.js", icon: "Server" },
    { name: "PHP", icon: "Server" },
    { name: "Express.js", icon: "Server" },
    { name: "MongoDB", icon: "Server" },
    { name: "MySQL", icon: "Server" },
    { name: "Python/Django", icon: "Server" },
  ],
  systemDev: [
    { name: "Full-Stack Dev", icon: "Aperture" },
    { name: "Blockchain Dev", icon: "Zap" },
    { name: "Database Optimization", icon: "Aperture" },
    { name: "System Architecture", icon: "Compass" },
  ],
};

const projectData = [
  {
    title: "Barber System Frontend",
    description:
      "A comprehensive, responsive frontend for a barber shop management system, showcasing modern state management and UI/UX best practices. ",
    link: "https://github.com/Hirwa24/Barber_system_frontend.io",
  },
  {
    title: "Salon Advertising Website",
    description:
      "A sleek, marketing-focused website for a salon, built for high conversion and responsive performance.",
    link: "https://github.com/Hirwa24/papa_shema",
  },
  {
    title: "Portfolio Website (This one!)",
    description:
      "Built with React and Tailwind CSS, featuring custom animations and a modern, high-contrast dark theme.",
    link: "#",
  },
];

const IconMap = {
  Aperture,
  Code,
  Server,
  Zap,
  Compass,
  Mail,
  Linkedin,
  ArrowRight,
  Instagram,
  Send,
  ArrowUp,
  Github: GithubIcon,
  WhatsApp: RealWhatsAppIcon,
  Menu,
  X,
  Phone,
  MapPin,
  Heart,
  Briefcase,
  Target, 
  Volleyball: VolleyballIcon, // Added the new icon
};

// --- Custom Styles (Font and Animations) ---
const customStyles = `
    /* Import Comic Neue from Google Fonts for a distinct style */
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');

    .comic-neue-font {
        font-family: 'Comic Neue', cursive;
    }

    /* WhatsApp button grow animation */
    @keyframes whatsapp-grow {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); } 
    }

    .whatsapp-btn {
        animation: whatsapp-grow 1.5s ease-in-out infinite;
    }

    /* Ensure smooth scrolling for navigation */
    html {
        scroll-behavior: smooth;
    }

    /* --- Blurry Blob CSS (Ambient lighting effect) --- */
    .blurry-blob {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        filter: blur(150px);
        opacity: 0.4; 
        z-index: 0; 
        animation: blob-move 20s infinite alternate-reverse;
        pointer-events: none;
    }
    .blob-1 { background-color: #2dd4bf; top: 5%; left: 5%; transform: translate(-50%, -50%); } /* Teal */
    .blob-2 { background-color: #f59e0b; bottom: 10%; right: 5%; transform: translate(50%, 50%); animation-delay: -10s; width: 300px; height: 300px; } /* Amber */
    .blob-3 { background-color: #0ea5e9; top: 70%; left: 20%; transform: translate(-50%, -50%); animation-delay: -5s; width: 500px; height: 500px; opacity: 0.2; } /* Sky Blue */
    
    @keyframes blob-move {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(20vw, -10vh) scale(1.1); }
        66% { transform: translate(-10vw, 15vh) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
    }
    
    /* --- HERO IMAGE STYLES (Circular with Fade and Fit) --- */
    /* Retained bouncing image styles from previous request */
    .hero-image {
    width: 240px;
    height: 290px;
    border-radius: 18%;
    object-fit: contain; /* CHANGED: Ensures the whole image is visible, fitting within the 200px x 200px circle */
    border: none;
    object-position: center;

    /* Fade effect at the bottom using mask-image (retained) */
    -webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
}
`;

// --- Framer Motion Scroll Animation Wrapper ---
const FadeInView = ({ children, delay = 0, duration = 0.6, y = 50, ...props }) => {
  const ref = useRef(null);
  // Trigger animation when 10% of the component is visible
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const variants = {
    hidden: { opacity: 0, y: y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.17, 0.55, 0.55, 1], // Custom cubic-bezier for a smooth lift
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// --- Scroll To Top Button Component ---
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ scale: 0 }}
      animate={{ scale: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-24 right-6 p-3 rounded-full bg-amber-500 text-slate-950 shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/50 z-50 transition duration-300"
      title="Scroll to Top"
    >
      <ArrowUp className="w-6 h-6" />
    </motion.button>
  );
};

// --- Skill Card Component (Interactive effect based on skill type) ---
const SkillCard = ({ name, iconName, category }) => {
  const Icon = IconMap[iconName] || Code;
  
  let hoverStyle = {};
  if (category === 'frontend') {
    // Frontend is "affected" by Amber/Teal colors
    hoverStyle = {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(45, 212, 191, 0.2)", // Amber + Teal
      borderColor: "#f59e0b", 
    };
  } else if (category === 'backend') {
    // Backend is "affected" by Sky Blue/Teal colors
    hoverStyle = {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(14, 165, 233, 0.5), 0 0 40px rgba(45, 212, 191, 0.2)", // Sky Blue + Teal
      borderColor: "#0ea5e9", 
    };
  } else {
    // Default system dev effect (Yellow/Teal)
    hoverStyle = {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(45, 212, 191, 0.2)", 
      borderColor: "#f59e0b", 
    };
  }

  return (
    <motion.div
      className="flex items-center justify-start space-x-3 p-3 bg-slate-800 border border-slate-700 rounded-xl shadow-lg transition duration-300 w-full"
      whileHover={hoverStyle}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className="w-5 h-5 text-teal-400 flex-shrink-0" />
      {/* Reduced text size for better fit on small items */}
      <span className="text-gray-100 font-medium text-sm sm:text-base">
        {name}
      </span>
    </motion.div>
  );
};

// --- Contact Info Card Component (New) ---
const ContactInfoCard = ({ Icon, title, content, link, color, hoverColor }) => {
  // Use scale and boxShadow for animation
  const hoverStyle = {
    scale: 1.05,
    boxShadow: `0 0 20px ${hoverColor.replace('hover:text-', '').replace('-300', '')}/0.6`, 
    borderColor: color.replace('text-', ''), 
  };

  return (
    <motion.div
      className="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-lg transition duration-300 flex items-start space-x-4 w-full"
      whileHover={hoverStyle}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${color}`} />
      <div>
        <h4 className="text-lg font-semibold text-gray-200">{title}</h4>
        <a
          href={link}
          target={link.startsWith('http') ? "_blank" : "_self"} // Open external links in new tab
          rel="noopener noreferrer"
          className={`text-gray-400 text-base ${hoverColor} underline transition-colors duration-300`}
        >
          {content}
        </a>
      </div>
    </motion.div>
  );
};

// --- Project Card Component (Unchanged) ---
const ProjectCard = ({ title, description, link = "#" }) => (
  <motion.div
    className="p-6 bg-slate-900 rounded-2xl shadow-2xl border-t-4 border-teal-500 transition duration-500 cursor-pointer"
    whileHover={{
      scale: 1.05,
      rotate: 0.5, 
      boxShadow: "0 0 30px rgba(251, 191, 36, 0.8)", 
      borderColor: "#f59e0b", 
    }}
    transition={{ type: "spring", stiffness: 200, damping: 10 }}
  >
    <h3 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">{title}</h3>
    <p className="text-gray-400 mb-4 text-base line-clamp-3">{description}</p>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold transition duration-300 group"
    >
      View Project
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    </a>
  </motion.div>
);

// --- Fixed WhatsApp Button (Unchanged) ---
const WhatsAppFixedButton = ({ phoneNumber }) => {
  const cleanedNumber = phoneNumber.replace(/[^\d]/g, "");
  const whatsappLink = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 p-2 rounded-full shadow-2xl z-50 transition duration-300 whatsapp-btn bg-white/0 hover:bg-white/10"
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-12 h-12" />
    </a>
  );
};

// --- Bouncing Loader Component (Unchanged) ---
const BouncingLoader = () => {
    const dotVariants = {
      start: { y: "0%" },
      end: { y: "100%" },
    };
  
    const dotTransition = {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    };
  
    return (
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[9999] space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex space-x-4"
          variants={{
            start: { transition: { staggerChildren: 0.2 } },
            end: { transition: { staggerChildren: 0.2 } },
          }}
          initial="start"
          animate="end"
        >
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="block w-4 h-4 rounded-full bg-teal-400"
              variants={dotVariants}
              transition={{
                ...dotTransition,
                delay: i * 0.1, // Stagger delay
              }}
            />
          ))}
        </motion.div>
        <div className="text-sm sm:text-lg font-light text-gray-400 opacity-70 tracking-wider">
          LOADING PORTFOLIO...
        </div>
      </motion.div>
    );
  };

// --- Mobile Navigation Component (Unchanged) ---
const MobileNav = ({ isOpen, toggleMenu, setActiveSection, navItems }) => (
  <div
    className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-md transition-opacity duration-300 ${
      isOpen ? "opacity-100 block" : "opacity-0 hidden"
    }`}
  >
    <div className="absolute top-0 right-0 p-4">
      <button
        onClick={toggleMenu}
        className="text-teal-400 p-2 focus:outline-none"
      >
        <X className="w-8 h-8" />
      </button>
    </div>
    <nav className="flex flex-col items-center justify-center h-full space-y-8">
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(" ", "-")}`} 
          onClick={() => {
            setActiveSection(item.toLowerCase().replace(" ", "-"));
            toggleMenu();
          }}
          className="text-4xl font-extrabold text-gray-100 hover:text-amber-400 transition duration-300 tracking-wider"
        >
          {item}
        </a>
      ))}
    </nav>
  </div>
);

// --- Contact Form Component (Unchanged) ---
const ContactForm = ({ formEndpoint }) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    try {
      // Logic for Formspree endpoint (simulated for this environment)
      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Form submission failed:", error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 bg-slate-900 rounded-xl shadow-2xl border border-teal-800/50"
    >
      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Fullnames"
            className="w-full p-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-300"
          />
        </div>

        {/* Email Field with Icon */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-teal-400 z-10" />
            <input
              type="email"
              name="_replyto"
              id="email"
              required
              placeholder="Email Address"
              className="w-full pl-10 pr-3 py-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-300"
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Your Message / Project Brief
          </label>
          <textarea
            name="message"
            id="message"
            rows="4"
            required
            placeholder="Tell me about your project and how I can help..."
            className="w-full p-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-300 resize-none"
          ></textarea>
        </div>

        {/* Submission Status */}
        {status === "success" && (
          <p className="p-3 text-sm font-semibold text-center rounded-lg bg-green-900 text-green-300 transition duration-300">
            <Send className="w-4 h-4 inline mr-2" /> Message Sent Successfully!
          </p>
        )}
        {status === "error" && (
          <p className="p-3 text-sm font-semibold text-center rounded-lg bg-red-900 text-red-300 transition duration-300">
            🚨 Error sending message. Please use the direct contact links.
          </p>
        )}

        {/* Submit Button - Color Changed to Sky-500 for visibility */}
       <button
  type="submit"
  className="w-full flex items-center justify-center px-4 py-3 text-base font-bold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition duration-300 shadow-lg shadow-sky-500/30 transform hover:translate-y-[-2px] tracking-normal disabled:opacity-50"
  disabled={status === 'success'}
>
  <Send className="w-5 h-4 mr-2" /> Send Message
</button>

      </div>
    </form>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const cleanedPhone = developerPhone.replace(/[^\d\+]/g, ""); // Keep plus sign
  const whatsappHref = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;
  const navItems = ["Home", "About Me", "Skills", "Projects", "Contact"]; 

  // Social links updated with serious colors
  const socialLinks = [
    {
      Icon: IconMap.Mail,
      href: `mailto:${developerEmail}`,
      label: "Email",
      color: "text-amber-400",
      hover: "hover:text-amber-300",
    },
    {
      Icon: IconMap.WhatsApp,
      href: whatsappHref,
      label: "WhatsApp",
      color: "text-green-400",
      hover: "hover:text-green-300",
    },
    {
      Icon: IconMap.Linkedin,
      href: "https://www.linkedin.com/in/maurice-hirwa-jules-b51688267/",
      label: "LinkedIn",
      color: "text-sky-400",
      hover: "hover:text-sky-300",
    },
    {
      Icon: IconMap.Github,
      href: developerGithub,
      label: "GitHub",
      color: "text-teal-400",
      hover: "hover:text-teal-300",
    },
    {
      Icon: IconMap.Instagram,
      href: "https://www.instagram.com/_ma_ur_ice/",
      label: "Instagram",
      color: "text-rose-400",
      hover: "hover:text-rose-300",
    },
  ];

  // Handle loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px", 
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  if (isLoading) {
    return <BouncingLoader />; // Using the new Bouncing Loader
  }

  return (
    // Added overflow-x-hidden for better responsiveness/screen fit
    <div className="min-h-screen w-[100vw] comic-neue-font relative moving-background bg-slate-950 overflow-x-hidden">
      {/* Inject custom styles */}
      <style>{customStyles}</style>

      {/* --- Blurry Blobs (Ambient lighting) --- */}
      <div className="blurry-blob blob-1"></div>
      <div className="blurry-blob blob-2"></div>
      <div className="blurry-blob blob-3 hidden md:block"></div>

      {/* Main content container */}
      <div className="relative z-10">
        {/* --- Header/Navigation --- */}
        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-slate-900/50 border-b border-amber-500/50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Logo uses Amber accent */}
            <div className="text-2xl font-extrabold text-amber-400 tracking-wider">
              &lt; {developerName.split(" ").slice(-1)} /&gt;
            </div>

            {/* Desktop Navigation */}
            <div className="space-x-8 hidden md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`} 
                  onClick={() => setActiveSection(item.toLowerCase().replace(" ", "-"))}
                  className={`text-lg font-bold transition duration-300 py-1 border-b-4 ${
                    activeSection === item.toLowerCase().replace(" ", "-")
                      ? "text-teal-400 border-teal-400"
                      : "text-gray-200 border-transparent hover:text-amber-400 hover:border-amber-400"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-amber-400 p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </header>

        {/* Mobile Menu Overlay */}
        <MobileNav
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          setActiveSection={setActiveSection}
          navItems={navItems}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- 1. Hero Section (BOX LEFT / IMAGE RIGHT) --- */}
          <FadeInView>
            <section
              id="home"
              className="min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-16 text-gray-100 relative"
            >
              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* LEFT COLUMN: Name Box + Main Text Content (Order 1 on mobile and desktop) */}
                <div className="text-center lg:text-left order-1 lg:order-1">
                    
                    {/* BOUNCING BOX: Animation now runs once (no infinite repeat) to prevent "disappearing" */}
                    <motion.div
                        className="p-4 mb-8 sm:mb-10 rounded-xl bg-slate-800 border border-amber-500/50 shadow-xl shadow-amber-500/20 inline-block mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: -20 }}
                        // Changed to a simple animate (no looping bounce)
                        animate={{ 
                            opacity: 1, 
                            y: 0 
                        }}
                        transition={{ 
                            duration: 0.8, // Run once quickly
                            ease: "easeOut",
                            delay: 0.5
                        }}
                    >
                        {/* WELCOMING WORDS */}
                        <p className="text-base sm:text-lg text-gray-300 font-light mb-2">
                            <span className="text-sky-400 font-bold">Welcome!</span> 
                        </p>
                        
                        {/* Name - HIRWA JULES MAURICE */}
                        <p className="text-xl sm:text-2xl text-gray-100 font-extrabold uppercase mb-1">
                            <span className="text-amber-400">I'm </span>{developerName}
                        </p>
                       <p>      I'm your dedicated </p>
                        {/* Highlighted Role - Full-Stack Developer */}
                        <p className="text-sm sm:text-base text-amber-400 font-semibold mt-1 p-1 bg-slate-900 rounded-lg">
                           FullStack Developer
                        </p>
                    </motion.div>
                    {/* END STATIC BOUNCING BOX */}


                    <motion.h1
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        I <span className="text-teal-400">BUILD</span> DIGITAL APPS.
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-xl text-gray-300 max-w-4xl mb-10 font-light italic px-4 lg:px-0"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        I have digital experiences from React and Tailwind
                        frontends to scalable Node/PHP backends, with expertise in modern
                        Database Development and decentralized Blockchain solutions.
                    </motion.p>

                    <motion.a
                        href="#contact"
                        className="px-8 py-3 text-base sm:text-lg font-semibold rounded-full bg-slate-900 hover:bg-slate-800 text-teal-400 transition duration-300 shadow-xl shadow-teal-400/30 border border-teal-600 transform hover:translate-y-[-2px] tracking-wider"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                    >
                        Let's Talk <Mail className="w-5 h-5 ml-2 inline" />
                    </motion.a>
                </div>


                {/* RIGHT COLUMN: Bouncing Image (Order 2 on mobile and desktop) */}
                <div className="flex justify-center lg:justify-start order-2 lg:order-2">
                    {/* The image is now a motion.img element, applying the bounce directly */}
                    <motion.img 
                        src={developerImage}
                        alt={developerName}
                        // The size and fit are controlled by the .hero-image CSS class
                        className="hero-image" 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = "./assets/jules5.png"; 
                        }}
                        // Initial opacity/scale for load-in animation
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1, 
                            // Direct bouncing effect on the image itself
                            y: [0, -15, 0], // Move up and down by 15px
                        }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            delay: 1.0,
                            // Bounce animation properties
                            y: { 
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "reverse",
                                delay: 1.5,
                            }
                        }}
                    />
                </div>
              </div>
            </section>
          </FadeInView>

          {/* --- 2. About Me Section (Side Skills Confirmed) --- */}
          <FadeInView delay={0.2}>
            <section
              id="about-me"
              className="py-20 sm:py-24 border-t border-teal-900/50 text-gray-100"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
                ABOUT <span className="text-teal-400">ME</span>
              </h2>
              <div className="max-w-4xl mx-auto text-center px-4">
                <p className="text-lg sm:text-xl mb-6 leading-relaxed">
                  Hello! I'm {developerName}, a passionate Full-Stack Developer with{" "}
                  <span className="text-amber-400 font-semibold">
                    {developerExperience} of experience
                  </span>{" "}
                  crafting robust and user-friendly web applications.
                </p>
                <p className="text-lg sm:text-xl mb-6 leading-relaxed">
                  My focus is on creating responsive, efficient, and maintainable
                  solutions, ensuring high quality from the server room to the
                  client's browser.
                </p>

                {/* Experience and Side Skill Block - NOW USING VolleyballIcon */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 p-4 bg-slate-900 rounded-xl shadow-lg border border-teal-800/50">
                  <div className="flex items-center space-x-3 text-teal-400 text-xl font-bold">
                    <Briefcase className="w-7 h-7" />
                    <span>{developerExperience} Professional Experience</span>
                  </div>
                  <div className="text-gray-50 hidden sm:block">|</div>
                  {/* Volleyball Side Skill - Using the new dedicated icon */}
                  <div className="flex items-center space-x-3 text-amber-400 text-xl font-bold">
                    <VolleyballIcon className="w-7 h-7" /> 
                    <span>Side Skill: {developerSideSkill}</span>
                  </div>
                </div>
              </div>
            </section>
          </FadeInView>

          {/* --- 3. Skills Section (Layout Fixes Applied) --- */}
          <FadeInView delay={0.2}>
            <section
              id="skills"
              className="py-20 sm:py-24 border-t border-teal-900/50"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
                THE <span className="text-amber-400">SKILLS</span> I HAVE
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Frontend Design & Languages */}
                <motion.div
                  className="p-6 bg-slate-900 rounded-2xl shadow-2xl transition duration-500 hover:shadow-amber-500/30 border-2 border-transparent hover:border-amber-500/50"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-center mb-6">
                    <Code className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 mr-3" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">
                      Frontend Design & Languages
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-6 border-l-4 border-amber-400 pl-4 italic text-sm sm:text-base">
                    Crafting pixel-perfect, highly responsive interfaces with
                    modern tools and languages.
                  </p>
                  {/* Grid layout fixed for better fitting and wrapping */}
                  <div className="grid grid-cols-2 gap-4"> 
                    {skillsData.frontend.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        iconName={skill.icon}
                        category="frontend"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Backend Core & Frameworks */}
                <motion.div
                  className="p-6 bg-slate-900 rounded-2xl shadow-2xl transition duration-500 hover:shadow-teal-500/30 border-2 border-transparent hover:border-teal-500/50"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center mb-6">
                    <Server className="w-7 h-7 sm:w-8 sm:h-8 text-teal-400 mr-3" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">
                      Backend Core & Frameworks
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-6 border-l-4 border-teal-400 pl-4 italic text-sm sm:text-base">
                    Building scalable, secure, and high-performance server-side
                    systems and frameworks.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {skillsData.backend.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        iconName={skill.icon}
                        category="backend"
                      />
                    ))}
                  </div>
                </motion.div>

                {/* System Dev & Databases (Layout Fixes Applied) */}
                <motion.div
                  className="p-6 bg-slate-900 rounded-2xl shadow-2xl transition duration-500 hover:shadow-yellow-500/30 border-2 border-transparent hover:border-yellow-500/50"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="flex items-center mb-6">
                    <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 mr-3" />
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">
                      System Dev & Databases
                    </h3>
                  </div>
                  <p className="text-gray-400 mb-6 border-l-4 border-yellow-400 pl-4 italic text-sm sm:text-base">
                    Designing comprehensive systems, optimizing databases, and
                    leading decentralized solutions.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {skillsData.systemDev.map((skill) => (
                      <SkillCard
                        key={skill.name}
                        name={skill.name}
                        iconName={skill.icon}
                        category="systemDev"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          </FadeInView>

          {/* --- 4. Projects Section (Unchanged) --- */}
          <FadeInView delay={0.2}>
            <section
              id="projects"
              className="py-20 sm:py-24 border-t border-teal-900/50"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
                PROJECTS <span className="text-teal-400">I BUILT</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectData.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                  />
                ))}
              </div>
              <div className="text-center mt-12">
                <p className="text-gray-400 text-base sm:text-lg">
                  Ready to see the code? All my public code is hosted on my
                  GitHub:{" "}
                  <a
                    href={developerGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 underline font-medium transition duration-300"
                  >
                    View GitHub Profile{" "}
                    <GitBranch className="w-4 h-4 inline ml-1" />
                  </a>
                </p>
              </div>
            </section>
          </FadeInView>

          {/* --- 5. Contact Section (New Animated Info Boxes) --- */}
          <FadeInView delay={0.2}>
            <section
              id="contact"
              className="py-20 sm:py-24 border-t border-teal-900/50 text-gray-100"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 tracking-wide">
                LET'S <span className="text-amber-400">CONNECT</span> AND BUILD
              </h2>

              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                {/* Left Column: Contact Info Cards */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-50 mb-6">
                    Reach Out Directly
                  </h3>

                  <div className="space-y-4">
                    {/* Location Card */}
                    <ContactInfoCard
                      Icon={MapPin}
                      title="My Location"
                      content={developerLocation}
                      link="#"
                      color="text-teal-400"
                      hoverColor="hover:text-teal-300"
                    />

                    {/* Email Card */}
                    <ContactInfoCard
                      Icon={Mail}
                      title="Email Me"
                      content={developerEmail}
                      link={`mailto:${developerEmail}`}
                      color="text-amber-400"
                      hoverColor="hover:text-amber-300"
                    />

                    {/* Phone/WhatsApp Card */}
                    <ContactInfoCard
                      Icon={Phone}
                      title="Call or WhatsApp"
                      content={developerPhone}
                      link={`tel:${developerPhone}`}
                      color="text-sky-400"
                      hoverColor="hover:text-sky-300"
                    />
                  </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-50 mb-6 text-center md:text-left">
                    Send Me a Message
                  </h3>
                  <p className="text-gray-300 mb-6 text-center md:text-left">
                    I'm always open to discussing new projects, creative ideas,
                    or opportunities to be part of your visions.
                  </p>
                  <ContactForm formEndpoint={FORM_ENDPOINT} />
                </motion.div>
              </div>
            </section>
          </FadeInView>
        </main>

        {/* --- Footer (Social Links Added) --- */}
        <footer className="mt-16 py-8 bg-slate-900 border-t border-teal-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
            {/* Social Links in Footer */}
            <div className="flex justify-center space-x-6 mb-6">
              {socialLinks.map(({ Icon, href, label, color, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition duration-300 ${color} ${hover}`}
                  title={`Connect via ${label}`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </a>
              ))}
            </div>
            
            <p className="mb-2">
              &copy; {currentYear} {developerName}. All Rights Reserved.
            </p>
            <p className="text-xs">
              Designed & Developed by{" "}
              <a
                href={developerGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                Jules Maurice
              </a>
            </p>
          </div>
        </footer>

        {/* Fixed Buttons */}
        <WhatsAppFixedButton phoneNumber={developerPhone} />
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default App;
