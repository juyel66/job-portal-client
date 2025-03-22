import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {signInWIthGoogle} = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state || "/"
    console.log('this is from', from)

    const handleGoogleSignIn = ()=>{
        signInWIthGoogle()
        .then(result=>{
            console.log(result.user)
            navigate(from)
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