import { useState, useEffect } from "react";
import candidate from "../data/candidate";
import { Job } from "../types";

interface JobDetailProps {
  jobId: string | null;
  onBack: () => void;
  token: string;
}

function JobDetail({ jobId, onBack, token }: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [applyStatus, setApplyStatus] = useState<string>("");

  // constructor
  useEffect(() => {
    fetch(`http://localhost:3000/api/jobs/${jobId}`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }

    })
      .then((res) => res.json())
      .then((data: Job) => {
        setJob(data);
        setLoading(false);
      });
  }, [jobId]);

  // const application = candidate.applications.find((a) => a.jobId === jobId);  

  // if (loading) return <p>Loading job details...</p>;  
  // if (!job) return <p>Job not found.</p>;  

  // http://localhost:3000/api/candidate/apply
  const handleApply = async () => {
    const api = 'http://localhost:3000/api/candidate/apply';
    try {
      const res = await fetch(api, {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'jobId': jobId })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Could not post job.")
      }
      setApplyStatus("Applied! Your AI feedback score will come here.")
    } catch (err) {
      setApplyStatus((err as Error).message)
    }
  }


  return (
    <div className="job-detail">
      <button onClick={onBack}>Back to Job List</button>
      <h2>{job && job.title}</h2>
      <p className="company-name">{job && job.company} — {job && job.location}</p>
      <p>{job && job.description}</p>
      <h4>Skills Required</h4>
      <ul>
        {(job && job.skillsRequired) && job.skillsRequired.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
      <h4>Your Match Score</h4>
      {/* <p>{application?.matchScore ?? "Not yet evaluated"}</p> */}
      {applyStatus && <p>{applyStatus}</p>}
    </div>
  );
}

export default JobDetail;  