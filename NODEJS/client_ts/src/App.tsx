import { useState } from "react";  
import JobList from "./pages/JobList";  
import JobDetail from "./components/JobDetail";  
import CandidateProfile from "./components/CandidateProfile";  
import "./App.css";  
import { AuthUser } from "./types";
import Auth from "./components/Auth";
import PostJob from "./components/PostJob";

type View = "jobs" | "detail" | "profile" | "postJob";  

function App() {  
  const [token, setToken] = useState<string|null>(localStorage.getItem("token"));
  const [user, setUser] = useState<AuthUser | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!):null
  )
  const [view, setView] = useState<View>("jobs");  
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);  
   

  const handleLoginSuccess = (newToken:string, newUser:AuthUser)=>{
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))

    setToken(newToken)
    setUser(newUser)
  }
  
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)
  }

  if(!token || !user){
    return (<Auth onLoginSuccess={handleLoginSuccess}/>)
  }
  
  const handleSelectJob = (jobId: string) => {  
    setSelectedJobId(jobId);  
    setView("detail");  
  };  
  
  return (  
    <div className="app-container">  
      <nav className="navbar">  
        <h1>JobFify App</h1>  
        <button onClick={() => setView("jobs")}>Jobs</button>  
        {user.role==='candidate' && <button onClick={() => setView("profile")}>My Profile</button>}  
        {user.role==='admin' && <button onClick={() => setView("postJob")}>Post New Jobs</button> }
      </nav>  
  
      {view === "jobs" && <JobList token={token} onSelectJob={handleSelectJob} />}  
      {view === "detail" && (  
        <JobDetail token={token} jobId={selectedJobId} onBack={() => setView("jobs")} />  
      )}  
      {view === "profile" && <CandidateProfile token={token} />}  
      {view === "postJob" && <PostJob token={token} onPosted={()=>{setView('jobs')}}/>}  
    </div>  
  );  
}  
  
export default App;  