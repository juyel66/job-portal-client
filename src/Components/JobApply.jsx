import {  useParams } from "react-router-dom";
import useAuth from "./useAuth";

const JobApply = () => {
    const {id} = useParams()
    console.log(id)
    const {user} = useAuth();
    console.log('user info:',user)

    const submitJObApplication = e =>{
        e.preventDefault()
        const form = e.target;
        const GithubLink = form.GithubLink.value;
        const linkedin = form.linkedin.value;
        const Resume = form.Resume.value;

        console.log(GithubLink, linkedin, Resume)

        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            Name: user.displayName,
            Photo: user.photoURL,
            GithubLink,
            linkedin,
            Resume
        }

        fetch('http://localhost:3000/job-application',{
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data)
        })

        
        console.log('jobApplication details:', jobApplication)

    }
    return (
      <div className="max-w-lg mx-auto bg-white shadow-xl p-6 rounded-xl mt-10 border-2 border-gray-400">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
          Apply for Job
        </h2>
        <form onSubmit={submitJObApplication}> 
          <fieldset className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="url"
                name="GithubLink"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Github url"
              />
            </div>
  
        
  
            {/* LinkedIn URL Field */}
            <div>
              <label className="block text-gray-700 font-medium">LinkedIn Profile URL</label>
              <input
                type="url"
                name="linkedin"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your LinkedIn profile URL"
              />
            </div>
  
            {/* Google Drive URL Field */}
            <div>
              <label className="block text-gray-700 font-medium">Google Drive URL</label>
              <input
                type="url"
                name="Resume"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Resume URL"
              />
            </div>
  
            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mt-4"
            >
              Apply Now
            </button>
          </fieldset>
        </form>
      </div>
    );
  };
  
  export default JobApply;
  