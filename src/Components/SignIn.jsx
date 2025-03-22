import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import SocialLogin from "./SocialLogin";
import { useLocation, useNavigate } from "react-router-dom";


const SignIn = () => {

  const location = useLocation()
  console.log('in signIn page', location)
  const from = location.state || "/"

  

  const {signInUser} = useContext(AuthContext)
  const navigate = useNavigate();


  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;  
    const password = form.password.value;  
    
    console.log(email, password);



    signInUser(email,password)
    .then(result=>{
      console.log(result.user)
      navigate(from)

    })
    .catch(error=>{
      console.error(error.message)
    })
  };





    return (
        <div>
                 <div>
          <div className="hero  mt-28  ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-2">
    <h1 className="text-5xl font-bold">Login now</h1>
      <div className="card-body">
        <form  onSubmit={handleLogin}>
        <fieldset className="fieldset">
          <label className="fieldset-label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="fieldset-label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
          <SocialLogin></SocialLogin>
        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
            
        </div>
            
        </div>
    );
};

export default SignIn;