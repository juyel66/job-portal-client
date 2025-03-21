import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";


const Register = () => {
  
  const {createUser} = useContext(AuthContext);
  const navigate = useNavigate();
    const handleRegister = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)



        createUser(email, password) 
        .then(result =>{
          console.log(result.user)
          navigate("/")

        })
        .catch(error =>{
          console.log(error.message)
        })

    }


    return (
        <div>
          <div className="hero  mt-28  ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-2">
    <h1 className="text-5xl font-bold">Register now</h1>
      <div className="card-body">
        <form onSubmit={handleRegister}  >
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <input type="text" name="" className="input" placeholder="Enter your name" />
          <label className="fieldset-label">Email</label>
          <input type="email" name="email" className="input" placeholder="Email" />
          <label className="fieldset-label">Password</label>
          <input type="password" name="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
          <div>
            <SocialLogin></SocialLogin>
          </div>
        </fieldset>
        </form>
    
      </div>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Register;