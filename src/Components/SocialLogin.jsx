
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const SocialLogin = () => {
    const {signInWIthGoogle,user} = useAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state || "/"
    console.log('this is from', from)

    const handleGoogleSignIn = ()=>{
        signInWIthGoogle()
        .then(result=>{
            console.log(result.user)

            const googleLoginUserInfo = {
                name: user.displayName,
                email: user.email,
                avatar: user.PhotoURL,

                

            }
            


            navigate(from)
        })
        .catch(error=>{
            console.log(error.message);
        })
    }


    return (
        <div>
            <Link to ="/googleLoginUser-personalInfo"><button onClick={handleGoogleSignIn} className="btn w-full font-bold">Google</button></Link>
            
        </div>
    );
};

export default SocialLogin;