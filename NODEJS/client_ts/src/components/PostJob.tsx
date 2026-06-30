import {useState} from 'react';

interface PostJobProps{
    token:string;
    onPosted: ()=>void
}

function PostJob({token, onPosted}: PostJobProps){
    const [title, setTitle] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [remote, setRemote] = useState<"yes"|"no">("no");
    const [skills, setSkills] = useState<string>(""); 
    // java,python,node
    const [experienceRequired, setExperienceRequired] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const [error, setError] = useState<string>("");

    // POST http://localhost:3000/api/jobs

    const handleSubmit = async (e:React.SubmitEvent)=>{
        console.log("in handleSubmit")
        e.preventDefault();

        setError("")
        const api = 'http://localhost:3000/api/jobs';
        const reqBody = {
            title, 
            company, 
            location, 
            remote: remote==='yes'?true:false, 
            skillsRequired: skills.split(",").map((skill)=>skill.trim()),
            
            experienceRequired, 
            description};

            try{
                const res = await fetch(api, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer '+token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(reqBody)
                })

                const data = await res.json()
                if(!res.ok){
                    throw new Error(data.error || "Could not post job.")
                }
                onPosted()
            } catch(err){
                setError((err as Error).message)
            }
        }


        return (
                    <div className="post-job">
            <h2>Post a new Job</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <input placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
                <input placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
                <select onChange={(e)=>setRemote(e.target.value as "yes"|"no")}>
                    <option value='no'>No</option>
                    <option value='yes'>Remote Job</option>
                </select>
                <input placeholder="Skills" value={skills} onChange={(e)=>setSkills(e.target.value)}/>
                <input placeholder="Experience Required" value={experienceRequired} onChange={(e)=>setExperienceRequired(Number(e.target.value))} type="number"/>
                <textarea placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>

                <button type="submit">Post Job</button>
            </form>

            {error && <p className="error-text">{error}</p>}
        </div>
        )
}

export default PostJob;