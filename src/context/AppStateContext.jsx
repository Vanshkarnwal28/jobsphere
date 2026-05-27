import React, { createContext, useContext, useState, useEffect } from 'react';
import { JOBS, OPPORTUNITIES, FEED_POSTS, CANDIDATES } from '../data/mockData';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  // Authentication & Role
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'candidate');
  const [currentUser, setCurrentUser] = useState({
    name: 'Vansh Karnwal',
    title: 'Fullstack Software Architect',
    email: 'vansh.karnwal@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    resumeUploaded: false,
    resumeDetails: null
  });

  // DB States
  const [jobs, setJobs] = useState(JOBS);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [opportunities, setOpportunities] = useState(OPPORTUNITIES);
  const [feedPosts, setFeedPosts] = useState(FEED_POSTS);
  const [candidates, setCandidates] = useState(CANDIDATES);
  
  // Scheduled interviews
  const [interviews, setInterviews] = useState([
    { id: 'int-1', candidateName: 'Meera Nair', role: 'AI UI/UX Designer', date: '2026-06-02', time: '10:00 AM', status: 'Upcoming' },
    { id: 'int-2', candidateName: 'Alex Rivera', role: 'Senior React Engineer', date: '2026-06-04', time: '02:30 PM', status: 'Upcoming' }
  ]);

  // Floating AI Chatbot state
  const [chatbotMessages, setChatbotMessages] = useState([
    { id: 'msg-1', sender: 'ai', text: 'Hi! I am SphereAI, your recruiting assistant. How can I help you find your dream opportunity today?' }
  ]);

  // Persist User Role
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  // Actions
  const applyToJob = (jobId) => {
    if (appliedJobIds.includes(jobId)) return false;
    setAppliedJobIds(prev => [...prev, jobId]);

    // Also simulate adding this current user as an applicant for the recruiter's candidate list
    const matchedJob = jobs.find(j => j.id === jobId);
    const newApplicant = {
      id: `cand-user-${Date.now()}`,
      name: currentUser.name,
      title: currentUser.title,
      avatar: currentUser.avatar,
      atsScore: currentUser.resumeDetails ? currentUser.resumeDetails.atsScore : 85,
      skills: currentUser.resumeDetails ? currentUser.resumeDetails.skills : ["React", "TailwindCSS", "JavaScript"],
      appliedFor: matchedJob ? matchedJob.title : "Fullstack Engineer",
      stage: "Applied",
      experience: "3 Years",
      email: currentUser.email,
      resumeUrl: "uploaded_vansh_resume.pdf"
    };

    setCandidates(prev => [newApplicant, ...prev]);
    return true;
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobIds(prev =>
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const addPost = (text, tags = []) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: currentUser.name,
        title: currentUser.title,
        avatar: currentUser.avatar,
        isVerified: true
      },
      content: text,
      likes: 0,
      comments: [],
      shares: 0,
      time: "Just now",
      likesCount: 0,
      userHasLiked: false
    };
    setFeedPosts(prev => [newPost, ...prev]);
  };

  const likePost = (postId) => {
    setFeedPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const liked = !post.userHasLiked;
        return {
          ...post,
          userHasLiked: liked,
          likesCount: liked ? post.likesCount + 1 : post.likesCount - 1
        };
      }
      return post;
    }));
  };

  const addCommentToPost = (postId, text) => {
    setFeedPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `comment-${Date.now()}`,
              author: currentUser.name,
              text,
              time: "Just now"
            }
          ]
        };
      }
      return post;
    }));
  };

  // Recruiter pipeline manager
  const updateCandidateStage = (candidateId, newStage) => {
    setCandidates(prev => prev.map(cand => {
      if (cand.id === candidateId) {
        return { ...cand, stage: newStage };
      }
      return cand;
    }));
  };

  const scheduleInterview = (candidateName, role, date, time) => {
    const newInterview = {
      id: `int-${Date.now()}`,
      candidateName,
      role,
      date,
      time,
      status: 'Upcoming'
    };
    setInterviews(prev => [newInterview, ...prev]);
  };

  // Chatbot message engine
  const sendChatbotMessage = (text) => {
    const userMsg = { id: `chat-user-${Date.now()}`, sender: 'user', text };
    setChatbotMessages(prev => [...prev, userMsg]);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let aiText = "I parsed your query but couldn't find a direct match. You can search jobs in the Jobs page, upload a resume for scanning, or look up hackathons in the Opportunities tab!";
      const query = text.toLowerCase();
      if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        aiText = `Hello ${currentUser.name}! How can JobSphere AI accelerate your career today? Try uploading your resume in the Resume Analyzer, or check out recommended roles.`;
      } else if (query.includes('job') || query.includes('search') || query.includes('hiring')) {
        aiText = "We have outstanding roles at Stripe, Linear, and Google. Visit our Job Listing page to apply directly and review your AI Compatibility Score!";
      } else if (query.includes('resume') || query.includes('ats') || query.includes('scan')) {
        aiText = "Our AI Resume Analyzer is state-of-the-art! Jump over to the 'Resume Analyzer' tab to drop your PDF and check keyword coverage, alignment, and formatting suggestions.";
      } else if (query.includes('hackathon') || query.includes('internship') || query.includes('unstop')) {
        aiText = "Check the 'Opportunities' page to view hackathons, mentorship sessions, and competitive challenges sponsored by Vercel, Stripe, and Google!";
      } else if (query.includes('recruiter') || query.includes('pipeline')) {
        aiText = "Switch your profile to Recruiter using the profile dropdown or login panel to view applicant dashboards, drag-and-drop pipeline pipelines, and scheduling systems.";
      }

      setChatbotMessages(prev => [...prev, { id: `chat-ai-${Date.now()}`, sender: 'ai', text: aiText }]);
    }, 800);
  };

  // Resume scanning update
  const uploadAndAnalyzeResume = (fileName, score = 88) => {
    const resumeDetails = {
      fileName,
      atsScore: score,
      skills: ["React", "TailwindCSS", "JavaScript", "HTML/CSS", "Git", "REST APIs"],
      missingKeywords: ["TypeScript", "CI/CD", "Next.js", "Docker"],
      improvements: [
        "Include quantifiable metrics in experience descriptions (e.g., 'Improved performance by 35%').",
        "Add a direct TypeScript project reference to boost search rating matching Stripe's listings.",
        "Ensure layout uses standard sans-serif font structures for cleaner parsing compatibility."
      ]
    };

    setCurrentUser(prev => ({
      ...prev,
      resumeUploaded: true,
      resumeDetails
    }));
  };

  return (
    <AppStateContext.Provider value={{
      userRole,
      setUserRole,
      currentUser,
      setCurrentUser,
      jobs,
      appliedJobIds,
      savedJobIds,
      opportunities,
      feedPosts,
      candidates,
      interviews,
      chatbotMessages,
      applyToJob,
      toggleSaveJob,
      addPost,
      likePost,
      addCommentToPost,
      updateCandidateStage,
      scheduleInterview,
      sendChatbotMessage,
      uploadAndAnalyzeResume
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
