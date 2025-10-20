import React, { useState, useEffect } from 'react';
import { 
    Aperture, Code, Server, Zap, Compass, Link2, Mail, Linkedin,
    Users, ArrowRight, Instagram, GitBranch, Menu, X, Send
} from 'lucide-react';

// 1. --- IMAGE IMPORT (Ensure your file path is correct) ---
// Using the image from your assets folder.
import developerImage from './assets/jules4.png'; 

// --- Custom GitHub SVG Component (Unchanged) ---
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
        <path d="M15 22v-4a4.8 4.8 0 0 0-4-1.3c-1.5 0-3-.6-4-1.8v-1.2C7 13.5 7.5 13 9 13h6c1.5 0 2.5.5 3.5 1.5v1.2a4.8 4.8 0 0 0-4 1.3v4"/><path d="M9 19c-4 1.5-6.5-2.2-6.5-6.5C2.5 7.5 7 2 12 2s9.5 5.5 9.5 10.5c0 4.3-2.5 8-6.5 6.5"/><path d="M12 22s-2.5-3.5-2.5-5.5c0-1.5.5-2.5 2.5-2.5s2.5 1 2.5 2.5c0 2-2.5 5.5-2.5 5.5"/>
    </svg>
);


// --- Custom WhatsApp SVG Component (Unchanged) ---
const RealWhatsAppIcon = (props) => (
    <svg 
        {...props} 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
    >
        {/* Background Circle (WhatsApp Green) */}
        <path 
            d="M12 0C5.373 0 0 5.373 0 12c0 2.213.585 4.316 1.704 6.136L0 24l6.195-1.693c1.782.978 3.824 1.564 5.8 1.564 6.627 0 12-5.373 12-12S18.627 0 12 0z"
            fill="#25D366" 
        />
        {/* Inner White Chat Content */}
        <path 
            fill="white"
            d="M17.5 14.3c-.3-.1-1.8-.9-2.1-.9s-.7.1-.9.4-1 .8-1.2.9-.4.2-.8.1c-.4-.1-1.7-.6-3.2-2s-2.6-2.4-2.8-2.7c-.2-.4 0-.6.1-.7s.3-.4.4-.5c.1-.1.2-.3.3-.4s.2-.3.1-.6c-.1-.3-.6-1.5-.8-2s-.4-.8-.8-.8c-.3 0-.6-.1-.9-.1s-.8-.1-1.2.4c-.4.5-1.5 1.5-1.5 3.5s1.6 3.9 1.8 4.2c.2.3 3.3 5.1 8 7s5.9 1.9 6.9 1.7c1-.2 1.8-.7 2.1-1.3s.4-1.2.4-1.2c.2-.5.1-.9-.1-1.2s-.3-.5-.7-.7z"
            transform="translate(1, -0.5) scale(0.9)" 
        />
    </svg>
);


// Define constants
const developerName = "HIRWA Jules Maurice";
const developerEmail = "hirwajules2000@gmail.com";
const developerPhone = "+250786931313";
const developerGithub = "https://github.com/Hirwa24";
const WhatsAppIcon = RealWhatsAppIcon; 
const currentYear = new Date().getFullYear();
const LOADER_DURATION_MS = 2500; 
const LOADER_TEXT = "HIRWA"; 
const WHATSAPP_MESSAGE = "Hello Maurice, I saw your Full-Stack Developer portfolio and would like to discuss a potential project or collaboration!";
const FORM_ENDPOINT = `https://formspree.io/f/xldpvqna`; 

// --- Data Structure (Unchanged) --- 
const skillsData = {
    frontend: [
        { name: 'React', icon: 'Code' },
        { name: 'Vue.js', icon: 'Code' },
        { name: 'HTML5/CSS3', icon: 'Code' },
        { name: 'Tailwind CSS', icon: 'Zap' },
    ],
    backend: [
        { name: 'Node.js', icon: 'Server' },
        { name: 'PHP', icon: 'Server' },
        { name: 'Express', icon: 'Server' },
        { name: 'MongoDB', icon: 'Server' },
        { name: 'MySQL', icon: 'Server' },
    ],
    systemDev: [
        { name: 'Full-Stack Dev', icon: 'Aperture' },
        { name: 'Blockchain Dev', icon: 'Zap' },
        { name: 'Database Optimization', icon: 'Aperture' },
    ]
};

const projectData = [
    {
        title: "Barber System Frontend",
        description: "A comprehensive, responsive frontend for a barber shop management system, showcasing modern state management and UI/UX best practices. ",
        link: "https://github.com/Hirwa24/Barber_system_frontend.io",
    },
    {
        title: "Salon Advertising Website",
        description: "A sleek, marketing-focused website for a salon, built for high conversion and responsive performance.",
        link: "https://github.com/Hirwa24/papa_shema",
    },
    {
        title: "Portfolio Website (This one!)",
        description: "Built with React and Tailwind CSS, featuring custom animations and a modern, high-contrast dark theme.",
        link: "#",
    },
];

const IconMap = {
    Aperture,
    Code,
    Server,
    Zap,
    Compass,
    Link2,
    Mail,
    Linkedin,
    Users,
    ArrowRight,
    Instagram,
    Send,
    Github: GithubIcon, 
    WhatsApp: RealWhatsAppIcon,
    Menu, 
    X 
};

// --- Custom Styles with BOUNCING LOADER KEYFRAMES ---
const customStyles = `
    /* Primary Fuchsia Neon Glow */
    @keyframes neon-glow {
        0% { text-shadow: 0 0 5px rgba(232, 121, 249, 0.5), 0 0 10px rgba(232, 121, 249, 0.3); } 
        50% { text-shadow: 0 0 15px rgba(232, 121, 249, 0.8), 0 0 25px rgba(232, 121, 249, 0.5); } 
        100% { text-shadow: 0 0 5px rgba(232, 121, 249, 0.5), 0 0 10px rgba(232, 121, 249, 0.3); }
    }
    
    /* WhatsApp button grow animation */
    @keyframes whatsapp-grow {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); } 
    }

    .neon-text {
        animation: neon-glow 3s ease-in-out infinite alternate;
    }
    .whatsapp-btn {
        animation: whatsapp-grow 1.5s ease-in-out infinite;
    }

    /* Ensure smooth scrolling for navigation */
    html {
        scroll-behavior: smooth;
    }

    /* --- Blurry Blob CSS (Unchanged) --- */
    .blurry-blob {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        filter: blur(150px);
        opacity: 0.5; 
        z-index: 0; 
        animation: blob-move 20s infinite alternate-reverse;
        pointer-events: none;
    }
    .blob-1 { background-color: #a855f7; top: 5%; left: 5%; transform: translate(-50%, -50%); }
    .blob-2 { background-color: #06b6d4; bottom: 10%; right: 5%; transform: translate(50%, 50%); animation-delay: -10s; width: 300px; height: 300px; }
    .blob-3 { background-color: #f472b6; top: 70%; left: 20%; transform: translate(-50%, -50%); animation-delay: -5s; width: 500px; height: 500px; opacity: 0.3; }
    @keyframes blob-move {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(20vw, -10vh) scale(1.1); }
        66% { transform: translate(-10vw, 15vh) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
    }
    
    /* --- BOUNCING LOADER STYLES: Text Wave Effect --- */
    @keyframes text-wave {
        0%, 100% { 
            transform: translateY(0); 
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.6); /* Subtle glow at rest */
        }
        50% { 
            transform: translateY(-20px); /* Bounces up 20px */
            text-shadow: 0 0 20px #06b6d4, 0 0 40px rgba(6, 182, 212, 0.8); /* Stronger glow at peak */
        }
    }
    
    .loader-container {
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.5rem; 
    }

    .loader-letter {
        font-size: 4rem; 
        font-weight: 900; 
        color: #06b6d4; /* Tailwind cyan-400 equivalent */
        animation: text-wave 1.2s infinite ease-in-out; /* Continuous bounce */
    }

    /* Apply staggered animation delay for the wave effect */
    .loader-letter:nth-child(1) { animation-delay: 0s; }
    .loader-letter:nth-child(2) { animation-delay: 0.1s; } 
    .loader-letter:nth-child(3) { animation-delay: 0.2s; }
    .loader-letter:nth-child(4) { animation-delay: 0.3s; }
    .loader-letter:nth-child(5) { animation-delay: 0.4s; }

    /* --- HERO IMAGE STYLE (Round and Fitting) --- */
    .hero-image {
        width: 250px; 
        height: 250px; 
        border-radius: 50%; 
        object-fit: cover; 
        box-shadow: 
            0 5px 15px rgba(0, 0, 0, 0.5), 
            0 0 10px rgba(232, 121, 249, 0.6), 
            0 0 25px rgba(232, 121, 249, 0.4); 
        transition: transform 0.5s ease-in-out; 
    }
`;

// --- Skill Card Component (Unchanged) ---
const SkillCard = ({ name, iconName }) => {
    const Icon = IconMap[iconName] || Code;
    return (
        <div className="flex items-center space-x-3 p-4 bg-gray-900 border border-gray-800 rounded-xl shadow-xl hover:bg-slate-800 transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:shadow-fuchsia-500/20">
            <Icon className="w-6 h-6 text-fuchsia-400 flex-shrink-0" />
            <span className="text-gray-100 font-medium whitespace-nowrap">{name}</span>
        </div>
    );
};

// --- Project Placeholder Component (Unchanged) ---
const ProjectCard = ({ title, description, link = '#' }) => (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-2xl border-t-4 border-fuchsia-500 transition duration-500 hover:shadow-fuchsia-500/50 transform hover:scale-[1.02] cursor-pointer"> 
        <h3 className="text-xl sm:text-2xl font-bold text-gray-50 mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 text-base line-clamp-3">{description}</p> 
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition duration-300 group"> 
            View Project
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
    </div>
);

// --- Fixed WhatsApp Button (Unchanged) ---
const WhatsAppFixedButton = ({ phoneNumber }) => {
    const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');
    const whatsappLink = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    
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

// --- Custom Loader Component (UPDATED for Bouncing) ---
const CustomLoader = () => {
    const letters = LOADER_TEXT.split(''); 
    
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[9999] space-y-12">
            
            {/* The bouncing letter-based loader structure */}
            <div className="loader-container">
                {letters.map((letter, index) => (
                    <span 
                        key={index} 
                        className="loader-letter"
                    >
                        {letter}
                    </span>
                ))}
            </div>

            <div className="text-sm sm:text-xl font-extrabold text-gray-400 opacity-70 tracking-widest">
                LOADING DIGITAL PORTFOLIO...
            </div>
        </div>
    );
};

// --- Mobile Navigation Component (Unchanged) ---
const MobileNav = ({ isOpen, toggleMenu, setActiveSection, navItems }) => (
    <div className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
        <div className="absolute top-0 right-0 p-4">
            <button onClick={toggleMenu} className="text-fuchsia-400 p-2 focus:outline-none">
                <X className="w-8 h-8" />
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map(item => (
                <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => { setActiveSection(item.toLowerCase()); toggleMenu(); }}
                    className="text-4xl font-extrabold text-gray-100 hover:text-fuchsia-400 transition duration-300 neon-text"
                >
                    {item}
                </a>
            ))}
        </nav>
    </div>
);

// --- Contact Form Component (Unchanged, using Formspree) ---
const ContactForm = ({ formEndpoint }) => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        if (formEndpoint.includes('YOUR_FORM_ID')) {
            setStatus('setup_error');
            setTimeout(() => setStatus(''), 8000);
            return; 
        }

        try {
            const response = await fetch(formEndpoint, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        } finally {
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="mt-10 p-6 sm:p-8 bg-slate-900 rounded-xl shadow-2xl border border-fuchsia-800/50"
        >
            <div className="space-y-6">
                
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="name" 
                        id="name"
                        required
                        placeholder="John Doe"
                        className="w-full p-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-300"
                    />
                </div>

                {/* Email Field with Icon */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <div className="relative"> 
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fuchsia-400 z-10" /> 
                        <input
                            type="email"
                            name="_replyto" 
                            id="email"
                            required
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-3 py-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-300"
                        />
                    </div>
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message / Project Brief</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="4"
                        required
                        placeholder="Tell me about your project and how I can help..."
                        className="w-full p-3 bg-slate-800 text-gray-100 border border-slate-700 rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-300 resize-none"
                    ></textarea>
                </div>
                

                {/* Submission Status */}
                {status === 'success' && (
                    <p className="p-3 text-sm font-semibold text-center rounded-lg bg-green-900 text-green-300 transition duration-300">
                        <Send className="w-4 h-4 inline mr-2" /> Message Sent Successfully! I'll get back to you ASAP.
                    </p>
                )}
                {status === 'setup_error' && (
                    <p className="p-3 text-sm font-semibold text-center rounded-lg bg-yellow-900 text-yellow-300 transition duration-300">
                        ⚠️ **Configuration Error:** The Formspree endpoint seems generic. Check your code.
                    </p>
                )}
                {status === 'error' && (
                    <p className="p-3 text-sm font-semibold text-center rounded-lg bg-red-900 text-red-300 transition duration-300">
                        🚨 Error sending message. Please use the direct **Email** or **WhatsApp** links below!
                    </p>
                )}


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-50 transition duration-300 shadow-xl shadow-cyan-500/50 transform hover:translate-y-[-2px] tracking-wider disabled:opacity-50"
                    disabled={status === 'success'}
                >
                    <Send className="w-5 h-5 mr-2" /> Send Message
                </button>
            </div>
        </form>
    );
};


const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const cleanedPhone = developerPhone.replace(/[^\d]/g, ''); 
    const whatsappHref = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    const navItems = ['Home', 'Skills', 'Projects', 'Contact'];

    const socialLinks = [
        { Icon: IconMap.Mail, href: `mailto:${developerEmail}`, label: 'Email', color: 'text-fuchsia-400', hover: 'hover:text-fuchsia-300' }, 
        { Icon: IconMap.WhatsApp, href: whatsappHref, label: 'WhatsApp', color: 'text-green-400', hover: 'hover:text-green-300' },
        { Icon: IconMap.Linkedin, href: "https://www.linkedin.com/in/maurice-hirwa-jules-b51688267/", label: 'LinkedIn', color: 'text-sky-400', hover: 'hover:text-sky-300' },
        { Icon: IconMap.Github, href: developerGithub, label: 'GitHub', color: 'text-cyan-400', hover: 'hover:text-cyan-300' }, 
        { Icon: IconMap.Instagram, href: "https://www.instagram.com/_ma_ur_ice/", label: 'Instagram', color: 'text-rose-400', hover: 'hover:text-rose-300' },
    ];

    // Handle loading
    useEffect(() => {
        // Since the loader is continuous, we use a fixed timeout to display it 
        // before showing the main portfolio content.
        const timer = setTimeout(() => setIsLoading(false), LOADER_DURATION_MS);
        return () => clearTimeout(timer);
    }, []);

    // Scroll Spy (Unchanged)
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, 
            }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    if (isLoading) {
        return <CustomLoader />;
    }
    
    return (
        <div className="min-h-screen font-['Inter'] relative moving-background bg-slate-950 overflow-x-hidden">
            
            {/* Inject custom styles */}
            <style>{customStyles}</style>

            {/* --- Blurry Blobs (Ambient lighting) --- */}
            <div className="blurry-blob blob-1"></div>
            <div className="blurry-blob blob-2"></div>
            <div className="blurry-blob blob-3 hidden md:block"></div>

            {/* Main content container */}
            <div className="relative z-10"> 
                
                {/* --- Header/Navigation --- */}
                <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md shadow-2xl shadow-slate-900/50 border-b border-fuchsia-900/50">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        
                        {/* Logo uses Fuchsia Neon glow */}
                        <div className="text-2xl font-extrabold text-fuchsia-400 neon-text">
                            &lt; {developerName.split(' ').slice(-1)} /&gt;
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="space-x-6 hidden md:flex">
                            {navItems.map(item => (
                                <a 
                                    key={item} 
                                    href={`#${item.toLowerCase()}`} 
                                    onClick={() => setActiveSection(item.toLowerCase())}
                                    className={`text-lg font-medium transition duration-300 py-1 border-b-2 ${
                                        activeSection === item.toLowerCase() 
                                            ? 'text-fuchsia-400 border-fuchsia-400'
                                            : 'text-gray-400 border-transparent hover:text-cyan-400 hover:border-cyan-400'
                                    }`}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className="md:hidden text-fuchsia-400 p-2 focus:outline-none">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </nav>
                </header>

                {/* Mobile Menu Overlay */}
                <MobileNav isOpen={isMenuOpen} toggleMenu={toggleMenu} setActiveSection={setActiveSection} navItems={navItems} />


                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- 1. Hero Section (Image Integrated) --- */}
                    <section id="home" className="min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-16 text-center text-gray-100 relative">
                        
                        <h2 className="text-lg sm:text-xl font-light mb-4 tracking-widest text-cyan-400 uppercase">
                            Full-Stack Developer
                        </h2>

                        {/* Image Container with Custom CSS class */}
                        <div className="relative mb-8 transform transition duration-500 hover:scale-[1.05]">
                            <img 
                                src={developerImage} 
                                alt={developerName} 
                                className="hero-image" 
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/250x250/1e293b/fff?text=${developerName.split(' ').map(n=>n[0]).join('')}`; e.target.className = "w-64 h-64 object-cover bg-slate-800 flex items-center justify-center text-5xl rounded-full"; }}
                            />
                        </div>
                        
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
                            I <span className="text-fuchsia-400 neon-text">BUILD</span> DIGITAL WORLDS.
                        </h1>
                        <p className="text-base sm:text-xl text-gray-300 max-w-4xl mb-10 font-light italic px-4">
                            Leading robust digital experiences from React and  Tailwind frontends to scalable Node/PHP backends, with expertise in modern Database Development and decentralized Blockchain solutions.
                        </p>
                        <a href="#contact" className="px-8 py-3 text-base sm:text-lg font-semibold rounded-full bg-fuchsia-600 hover:bg-fuchsia-500 text-slate-50 transition duration-300 shadow-xl shadow-fuchsia-500/50 transform hover:translate-y-[-2px] tracking-wider">
                            Let's Talk <Mail className="w-5 h-5 ml-2 inline" />
                        </a>
                    </section>
                    
                    {/* --- 2. Skills Section (Unchanged) --- */}
                    <section id="skills" className="py-20 sm:py-24 border-t border-fuchsia-900/50">
                        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 neon-text">
                            THE <span className="text-cyan-400">STACK</span> I COMMAND
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            
                            {/* Frontend */}
                            <div className="p-6 bg-gray-900 rounded-2xl shadow-2xl transition duration-500 hover:shadow-cyan-500/30 border-2 border-transparent hover:border-cyan-500/50">
                                <div className="flex items-center mb-6">
                                    <Code className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 mr-3" />
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">Frontend Design</h3>
                                </div>
                                <p className="text-gray-400 mb-6 border-l-4 border-cyan-400 pl-4 italic text-sm sm:text-base">
                                    Crafting pixel-perfect, highly responsive interfaces with modern tools.
                                </p>
                                <div className="grid grid-cols-2 gap-4"> 
                                    {skillsData.frontend.map(skill => (
                                        <SkillCard key={skill.name} name={skill.name} iconName={skill.icon} />
                                    ))}
                                </div>
                            </div>

                            {/* Backend */}
                            <div className="p-6 bg-gray-900 rounded-2xl shadow-2xl transition duration-500 hover:shadow-fuchsia-500/30 border-2 border-transparent hover:border-fuchsia-500/50">
                                <div className="flex items-center mb-6">
                                    <Server className="w-7 h-7 sm:w-8 sm:h-8 text-fuchsia-400 mr-3" />
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">Backend Core</h3>
                                </div>
                                <p className="text-gray-400 mb-6 border-l-4 border-fuchsia-400 pl-4 italic text-sm sm:text-base">
                                    Building scalable, secure, and high-performance server-side systems.
                                </p>
                                <div className="grid grid-cols-2 gap-4"> 
                                    {skillsData.backend.map(skill => (
                                        <SkillCard key={skill.name} name={skill.name} iconName={skill.icon} />
                                    ))}
                                </div>
                            </div>

                            {/* System Dev */}
                            <div className="p-6 bg-gray-900 rounded-2xl shadow-2xl transition duration-500 hover:shadow-yellow-500/30 border-2 border-transparent hover:border-yellow-500/50">
                                <div className="flex items-center mb-6">
                                    <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 mr-3" />
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-50">System Dev</h3>
                                </div>
                                <p className="text-gray-400 mb-6 border-l-4 border-yellow-400 pl-4 italic text-sm sm:text-base">
                                Designing comprehensive systems and leading decentralized solutions.
                                </p>
                                <div className="grid grid-cols-2 gap-4"> 
                                    {skillsData.systemDev.map(skill => (
                                        <SkillCard key={skill.name} name={skill.name} iconName={skill.icon} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- 3. Projects Section (Unchanged) --- */}
                    <section id="projects" className="py-20 sm:py-24 border-t border-fuchsia-900/50">
                        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-16 neon-text">
                            PROJECTS <span className="text-fuchsia-400">I BUILT</span>
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
                                Ready to see the code? **All my public code is hosted on my GitHub:** <a href={developerGithub} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline font-medium transition duration-300">View GitHub Profile <GitBranch className="w-4 h-4 inline ml-1" /></a> 
                            </p>
                        </div>
                    </section>

                    {/* --- 4. Contact Section (Unchanged) --- */}
                    <section id="contact" className="py-20 sm:py-24 border-t border-fuchsia-900/50">
                        <div className="max-w-3xl mx-auto">
                            <div className="text-center">
                                <h2 className="text-3xl sm:text-5xl font-bold mb-4 neon-text">
                                    LET'S <span className="text-cyan-400">CONNECT</span> AND BUILD
                                </h2>
                                <p className="text-base sm:text-xl text-gray-300 mb-10">
                                    I'm currently open for challenging roles and innovative collaborations. Use the form below or a direct link to reach out.
                                </p>
                            </div>
                            
                            <ContactForm formEndpoint={FORM_ENDPOINT} />

                            <div className="text-center mt-12">
                                <p className="text-lg font-semibold text-gray-300 mb-4">Or use these direct methods:</p>
                                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                                    {socialLinks.map(({ Icon, href, label, color, hover }) => (
                                        <a 
                                            key={label} 
                                            href={href} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`flex items-center space-x-2 text-base sm:text-lg font-medium transition duration-300 ${color} ${hover}`}
                                            title={`Connect via ${label}`}
                                        >
                                            <Icon className="w-6 h-6" />
                                            <span className="hidden sm:inline">{label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                {/* --- Footer --- */}
                <footer className="mt-16 py-8 bg-slate-900 border-t border-fuchsia-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
                        <p className="mb-2">
                            &copy; {currentYear} {developerName}. All Rights Reserved.
                        </p>
                        <p className="text-xs">
                            Powered by<span className="text-fuchsia-400"></span> Maurice
                        </p>
                    </div>
                </footer>

                {/* Fixed WhatsApp Button */}
                <WhatsAppFixedButton phoneNumber={developerPhone} />

            </div>
        </div>
    );
};

export default App;