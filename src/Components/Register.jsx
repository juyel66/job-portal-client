import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import React Hook Form
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm(); // Initialize React Hook Form

  // Watch password to validate confirm_password
  const password = watch("password");

  // District and Upazila data (Rangpur Division -> Thakurgaon and Dinajpur Districts)
  const districts = {
    Thakurgaon: [
      "Baliadangi",
      "Haripur",
      "Pirganj",
      "Ranishankoil",
      "Thakurgaon Sadar",
      "Debiganj",
      "Panchagarh"
    ],
    Dinajpur: [
      "Birampur",
      "Bochaganj",
      "Chirirbandar",
      "Dinajpur Sadar",
      "Kaharol",
      "Khansama",
      "Nawabganj",
      "Parbatipur",
      "Phulbari",
      "Shaghata",
      "Hakimpur",
    ],
  };

  // State to hold the upazilas for the selected district
  const [upazilas, setUpazilas] = useState([]);

  // Handle district change
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setValue("upazila", ""); // Reset upazila when district changes
    setUpazilas(districts[selectedDistrict] || []); // Set upazilas based on district
  };

  const handleRegister = (data) => {
    const { name, email, password, bloodgroup, district, upazila, confirm_password } = data;

    // Check if password and confirm password match
    if (password !== confirm_password) {
      console.log("Passwords do not match");
      return;
    }

    const donorInfo = {
      name,
      email,
      password,
      bloodgroup,
      district,
      upazila,
      status: "Active",
      role: "donor",
      loginSystem: "Email-password"
      
    };


    fetch('http://localhost:5000/donor-application',{
      method: 'POST',
      headers: {
          'content-type' : 'application/json'
      },
      body: JSON.stringify(donorInfo)
  })

       .then(res =>res.json())
          .then(data =>{
              if(data.insertedId){
                  Swal.fire({
                      title: "Registration Successful",
                      icon: "success",
                      draggable: true
                    });
                    
  
              }
          })







    console.log("donate info is", donorInfo);
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="hero mt-28">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-2">
            <h1 className="text-5xl font-bold">Register now</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                  {/* Name */}
                  <label className="fieldset-label">Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    className="input"
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                  {/* Email */}
                  <label className="fieldset-label">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                  {/* Blood Group */}
                  <label className="fieldset-label">Blood Group</label>
                  <select
                    {...register("bloodgroup", { required: "Blood group is required" })}
                    className="input"
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                  {errors.bloodgroup && <span className="text-red-500">{errors.bloodgroup.message}</span>}

                  {/* District */}
                  <label className="fieldset-label">District</label>
                  <select
                    {...register("district", { required: "District is required" })}
                    className="input"
                    onChange={handleDistrictChange} // Handle district change
                  >
                    <option value="">Select District</option>
                    <option value="Thakurgaon">Thakurgaon</option>
                    <option value="Dinajpur">Dinajpur</option>
                  </select>
                  {errors.district && <span className="text-red-500">{errors.district.message}</span>}

                  {/* Upazila */}
                  <label className="fieldset-label">Upazila</label>
                  <select
                    {...register("upazila", { required: "Upazila is required" })}
                    className="input"
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map(upazila => (
                      <option key={upazila} value={upazila}>{upazila}</option>
                    ))}
                  </select>
                  {errors.upazila && <span className="text-red-500">{errors.upazila.message}</span>}

                  {/* Password */}
                  <label className="fieldset-label">Password</label>
                  <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                  {/* Confirm Password */}
                  <label className="fieldset-label">Confirm Password</label>
                  <input
                    {...register("confirm_password", {
                      required: "Confirm password is required",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                  />
                  {errors.confirm_password && <span className="text-red-500">{errors.confirm_password.message}</span>}

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
