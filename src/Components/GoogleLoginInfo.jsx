import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";


const PersonalInfoForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // District and Upazila data
  const districts = {
    Thakurgaon: ["Baliadangi", "Haripur", "Pirganj", "Ranishankoil", "Thakurgaon Sadar", "Debiganj", "Panchagarh"],
    Dinajpur: ["Birampur", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Kaharol", "Khansama", "Nawabganj", "Parbatipur", "Phulbari", "Shaghata", "Hakimpur"],
  };

  const [upazilas, setUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setValue("upazila", ""); // Reset upazila
    setUpazilas(districts[selectedDistrict] || []);
  };

  

  const handleRegister = (data) => {
    const { name, email, bloodgroup, district, upazila } = data;

    const personalInfo = {
      name,
      email,
      bloodgroup,
      district,
      upazila,
      status: "Active",
      role: "donor",
      loginSystem: "Google"
    };

    console.log("✅ Personal Info:", personalInfo);

    fetch("http://localhost:5000/donor-application", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(personalInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({ title: "Information Submitted Successfully", icon: "success", draggable: true });
          navigate("/");
        }
      });
  };

  return (
    <div className="mt-10">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-4">Submit Your Personal Information</h1>
            <div className="card-body">
              <form onSubmit={handleSubmit(handleRegister)}>
                {/* Name */}
                <label className="block font-semibold">Name</label>
                <input {...register("name", { required: "Name is required" })} type="text" className="input input-bordered w-full" placeholder="Enter your name" />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                {/* Email */}
                <label className="block font-semibold mt-3">Email</label>
                <input {...register("email", { required: "Email is required" })} type="email" className="input input-bordered w-full" placeholder="Email" />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                {/* Blood Group */}
                <label className="block font-semibold mt-3">Blood Group</label>
                <select {...register("bloodgroup", { required: "Blood group is required" })} className="input input-bordered w-full">
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                {errors.bloodgroup && <span className="text-red-500">{errors.bloodgroup.message}</span>}

                {/* District */}
                <label className="block font-semibold mt-3">District</label>
                <select {...register("district", { required: "District is required" })} className="input input-bordered w-full" onChange={handleDistrictChange}>
                  <option value="">Select District</option>
                  {Object.keys(districts).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                {errors.district && <span className="text-red-500">{errors.district.message}</span>}

                {/* Upazila */}
                <label className="block font-semibold mt-3">Upazila</label>
                <select {...register("upazila", { required: "Upazila is required" })} className="input input-bordered w-full">
                  <option value="">Select Upazila</option>
                  {upazilas.map((upazila) => (
                    <option key={upazila} value={upazila}>{upazila}</option>
                  ))}
                </select>
                {errors.upazila && <span className="text-red-500">{errors.upazila.message}</span>}

                <button className="btn btn-primary mt-4 w-full">Submit Information</button>
              </form>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
