import { useEffect, useState } from "react";  
import candidate from "../data/candidate";  
import { Candidate } from "../types";

interface CandidateProfileProps{
  token: string;
}
function CandidateProfile({token}: CandidateProfileProps) {  
  const [profile, setProfile] = useState<Candidate|null>(null);  
  
    // constructor
    useEffect(() => {
      fetch(`http://localhost:3000/api/candidate/me`, {
        // method: 'get',
        headers: {
          'Authorization': 'Bearer '+token
          // 'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data: Candidate) => {
          setProfile(data);
        });
    }, [token]);


    if(!profile) return (<p>Loading Profile....</p>)

  return (  
    <div className="candidate-profile">  
      <h2>{profile.name}</h2>  
      <p>{profile.email}</p>  
      <h4>Applications</h4>  
      {profile.applications.length==0 && 
        <p>You have not applied to any job yet.</p>
      } 
<ul>
      {
        profile.applications.map(
          (app, index)=> {return <li key={index}>
          JobId: {app.jobId} - Status: {app.status} - MatchScore: {app.matchScore??"Not yet evaluated"}
        </li>
          }
        )
      } 
      </ul>

      
      <p className="note">This text will be analyzed by AI in Module 8 to extract your skills automatically.</p>  
    </div>  
  );  
}  
  
export default CandidateProfile;  