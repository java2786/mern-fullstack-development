import { useState, useEffect } from "react";  
import candidate from "../data/candidate";  
import { Job } from "../types";  
  
interface JobDetailProps {  
  jobId: string | null;  
  onBack: () => void;  
}  
  
function JobDetail({ jobId, onBack }: JobDetailProps) {  
  const [job, setJob] = useState<Job | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);  
  
  useEffect(() => {  
    fetch(`http://localhost:3000/api/jobs/${jobId}`)  
      .then((res) => res.json())  
      .then((data: Job) => {  
        setJob(data);  
        setLoading(false);  
      });  
  }, [jobId]);  
  
  const application = candidate.applications.find((a) => a.jobId === jobId);  
  
  if (loading) return <p>Loading job details...</p>;  
  if (!job) return <p>Job not found.</p>;  
  
  return (  
    <div className="job-detail">  
      <button onClick={onBack}>Back to Job List</button>  
      <h2>{job.title}</h2>  
      <p className="company-name">{job.company} — {job.location}</p>  
      <p>{job.description}</p>  
      <h4>Skills Required</h4>  
      <ul>  
        {job.skillsRequired.map((skill) => <li key={skill}>{skill}</li>)}  
      </ul>  
      <h4>Your Match Score</h4>  
      <p>{application?.matchScore ?? "Not yet evaluated"}</p>  
    </div>  
  );  
}  
  
export default JobDetail;  