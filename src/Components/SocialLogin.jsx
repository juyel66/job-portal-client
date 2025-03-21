import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {signInWIthGoogle} = useContext(AuthContext);
    const navigate = useNavigate()

    const handleGoogleSignIn = ()=>{
        signInWIthGoogle()
        .then(result=>{
            console.log(result.user)
            navigate("/")
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn w-full font-bold">Google</button>
            
        </div>
    );
};

export default SocialLogin;