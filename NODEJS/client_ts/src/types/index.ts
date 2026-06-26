export interface Application {  
  jobId: string;  
  matchScore: number | null;  
  aiFeedback: string | null;  
  status: string;  
}  
  
export interface Job {  
  id: string;  
  title: string;  
  company: string;  
  location: string;  
  remote: boolean;  
  skillsRequired: string[];  
  experienceRequired: number;  
  description: string;  
  createdAt: string;  
}  
  
export interface Candidate {  
  id: string;  
  name: string;  
  email: string;  
  role: "admin" | "candidate";  
  resumeText: string;  
  parsedSkills: string[];  
  applications: Application[];  
}  

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "candidate"; 
}

