import React, { createContext, useContext, useState,useEffect } from 'react';

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const [servicesData, setServicesData] = useState([
           {
            id: 13,
            imageUrl: '/images/scm.webp',
            title: 'Supply Chain Management',
            description: 'Supply chain management (SCM) is the oversight of the entire flow of goods and services, from the origin of raw materials to the final delivery to the customer. ',
            ExplorePoints:"	Introduction to Supply Chain,	Procurement & Vendor Management,	Operations & Plant Management,	Inventory & Warehouse Management,Costing & Budgeting in Operations,Logistics & Distribution"

        },
        {
            id: 1,
            imageUrl: '/images/Career Development.jpg',
            title: 'Career Development',
            description: 'Get personalized advice on career paths, industry trends, and professional development from experienced mentors.',
            ExplorePoints: "Understanding different career paths across industries, Setting SMART career goals, Resume building and LinkedIn profile optimization, Networking and personal branding strategies, Industry-specific guidance from experienced mentors, Career transition planning and strategies"
        },
        {
            id: 2,
            imageUrl: '/images/Technical Skills.png',
            title: 'Technical Skills',
            description: 'Enhance your coding, software engineering, and other technical abilities with guidance from industry experts.',
            ExplorePoints: "Basics to advanced coding in Python Java C++, Software engineering principles and SDLC, Web and app development , Data structures and algorithms, Hands-on project assignments with mentor support, Career guidance for tech roles in MNCs and startups"
        },
        {
            id: 3,
            imageUrl: '/images/Leadership Coaching.png',
            title: 'Leadership Coaching',
            description: 'Develop strong leadership qualities, management techniques, and team-building strategies for effective leadership.',
            ExplorePoints: "Developing communication and team management skills, Emotional intelligence and decision-making, Conflict resolution and leadership styles, Vision setting and goal tracking, Time management and delegation techniques, Real-world leadership case studies and simulations"
        },
        {
            id: 4,
            imageUrl: '/images/Interview Preparation.png',
            title: 'Interview Preparation',
            description: 'Master interview techniques, mock interviews, and resume optimization to land your dream job.',
            ExplorePoints: "Common HR and technical interview questions, Personalized mock interviews and feedback ,Resume and cover letter review and refinement,Body language and confidence building techniques,How to handle stress interviews and group discussions,Tips for cracking interviews in top companies"
        },
        {
            id: 5,
            imageUrl: '/images/Resume Review.png',
            title: 'Resume Review',
            description: 'Receive expert feedback on your resume and cover letter to make them stand out to recruiters.',
            ExplorePoints: "Personalized feedback from industry experts, correction of grammar, structure and tone, optimization for ATS (Applicant Tracking System), highlighting achievements and skills effectively, formatting for better readability and appeal, sample resumes and templates for reference"

        },
        {
            id: 6,
            imageUrl: '/images/Entrepreneurship.jpg',
            title: 'Entrepreneurship',
            description: 'Get insights and guidance on starting, funding, and scaling your own business from successful entrepreneurs.',
            ExplorePoints: "how to validate your business idea, creating a basic business plan, funding sources and investor pitching, marketing strategies for startups, legal and registration basics for entrepreneurs, mentorship from successful founders and business owners"
        },
        {
            id: 7,
            imageUrl: '/images/Industry Networking.jpg',
            title: 'Industry Networking',
            description: 'Learn effective networking strategies and connect with professionals in your target industry.',
            ExplorePoints: "how to build professional relationships, LinkedIn optimization and outreach techniques, attending webinars seminars and job fairs effectively, building your personal brand online, approaching mentors and recruiters professionally, industry-specific community access and support"
        },
        {
            id: 8,
            imageUrl: '/images/Academic Guidance.jpg',
            title: 'Academic Guidance',
            description: 'Receive support for academic choices, study strategies, and navigating educational paths for success.',
            ExplorePoints: "stream and subject selection advice, guidance on higher education opportunities, effective study techniques and habits, time management for academic success, planning for competitive exams (CAT GRE etc.), support for switching fields or reorientation"
        },
        {
            id: 9,
            imageUrl: '/images/Project Management.jpg',
            title: 'Project Management',
            description: 'Master the principles of project planning, execution, and closure with guidance from certified project managers.',
            ExplorePoints:"understanding project lifecycle: initiation to closure, tools like Gantt charts Trello JIRA & MS Project, time cost and resource management techniques, risk analysis and mitigation strategies, agile and Scrum methodologies, case studies from real-world projects"

        },
        {
            id: 10,
            imageUrl: '/images/Personal Branding.png',
            title: 'Personal Branding',
            description: 'Build a strong personal brand that highlights your unique skills and value in the professional world.',
            ExplorePoints:"define your unique value proposition, build a powerful LinkedIn and social media profile, content strategy for online presence, communication and self-pitching techniques, improve visibility within your industry, influence building for long-term career growth"

        },
        {
            id: 11,
            imageUrl: '/images/Career Transition.jpg',
            title: 'Career Transition',
            description: 'Navigate career changes smoothly with advice on identifying new opportunities and adapting to new roles.',
            ExplorePoints:"identify transferable skills for a new career, overcoming fears and mindset blocks, resume rewriting and personal pitch for new role, industry-wise entry strategies for career shifters, real stories and mentorship from transition achievers, support for mid-career and post-gap professionals"

        },
        {
            id: 12,
            imageUrl: '/images/Startup Advising.png',
            title: 'Startup Advising',
            description: 'Receive strategic guidance for your startup, from business model development to fundraising and growth.',
            ExplorePoints:"idea validation and market research, business model planning using Lean Canvas, MVP development guidance, fundraising strategies from bootstrap to VC, pitch deck creation and investor communication, scaling strategies from experienced mentors"

        },
    ]);

     const [authToken, setAuthToken] = useState(null);
    const [userRole, setUserRole] = useState(null);

    // 🔁 On App Load: Get Auth from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        if (storedToken && storedRole) {
            setAuthToken(storedToken);
            setUserRole(storedRole);
        }
    }, []);

    // ✅ Login Function
    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuthToken(token);
        setUserRole(role);
    };

    // 🚪 Logout Function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setAuthToken(null);
        setUserRole(null);
    };

    return (
        <ServicesContext.Provider
            value={{
                servicesData,
                setServicesData,
                authToken,
                userRole,
                login,
                logout,
            }}
        >
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => useContext(ServicesContext);