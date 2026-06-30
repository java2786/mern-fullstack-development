import { useState, useEffect } from "react";  
import JobCard from "../components/JobCard";  
import { Job } from "../types";  
  
interface JobListProps {  
  onSelectJob: (jobId: string) => void;  
  token:string;
}  
  
function JobList({ token, onSelectJob }: JobListProps) {  
  const [jobs, setJobs] = useState<Job[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  
  useEffect(() => {  
    fetch("http://localhost:3000/api/jobs", {
      // method: 'get',
      headers: {
          'Authorization': 'Bearer '+token
          // 'Content-Type': 'application/json'
      }
    })  
      .then((res) => {  
        if (!res.ok) throw new Error("Failed to load jobs");  
        return res.json();  
      })  
      .then((data: Job[]) => {  
        setJobs(data);  
        setLoading(false);  
      })  
      .catch((err) => {  
        setError(err.message);  
        setLoading(false);  
      });  
  }, []);  
  
  if (loading) return <p>Loading jobs...</p>;  
  if (error) return <p>Error: {error}</p>;  
  
  return (  
    <div className="job-list">  
      <h2>Open Positions ({jobs.length})</h2>  
      {jobs.map((job) => (  
        <JobCard key={job.id} job={job} onSelect={onSelectJob} />  
      ))}  
    </div>  
  );  
}  
  
export default JobList;  