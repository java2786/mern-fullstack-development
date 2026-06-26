import {useState} from 'react';
import { AuthUser } from "./../types"

interface AuthProps{
    onLoginSuccess: (token:string,user:AuthUser)=>void; 
}

function Auth({onLoginSuccess}: AuthProps){
    const [isSignup, setIsSignup] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<"admin"|"candidate">("candidate");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e:React.SubmitEvent)=>{
        console.log("in handleSubmit")
        e.preventDefault();

        setError("")
        const endpoint = isSignup?"signup":"login";
        const reqBody = isSignup?{name, email, password, role}:{email, password};
        
        try{
            const api = `http://localhost:3000/api/auth/${endpoint}`
            const res = await fetch(api, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(reqBody)
            })

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || "Something went worng")
            }

            if(isSignup){
                // signup
                setIsSignup(false)
                setError("Signup successful. Please log in.")
            } else {
                // login
                onLoginSuccess(data.token, data.user);
            }
        } catch(err){
            setError((err as Error).message)
        }
    }

    return (
        <div className="auth-form">
            {/* {isSignup && <h2>Create Account</h2>}
            {isSignup==false && <h2>Login</h2>} */}
            <h2>{isSignup?"Create Account":"Login"}</h2>

            <form onSubmit={handleSubmit}>
                {isSignup && <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>}
                <input placeholder="example@abc.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="Pwd@123" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                {isSignup && <select onChange={(e)=>setRole(e.target.value as "admin"|"candidate")}>
                    <option value='candidate'>Candidate</option>
                    <option value='admin'>Admin</option>
                    {/* <option value='user'>User</option> */}
                </select>}
                {/* <input type="submit" value={isSignup?"Sign Up":"Login"}/> */}
                <button type="submit">{isSignup?"Sign Up":"Login"}</button>
            </form>

            {error && <p className="error-text">{error}</p>}
            <button className="link-button" onClick={()=>setIsSignup(!isSignup)}>
                {isSignup?"Already have an account ? Login":"New Here? Create an account"}
            </button>
        </div>
    )

}

export default Auth