import { useEffect, useState } from "react";
import useAuth from "./useAuth";



const MyApplication = () => {
    const {user} = useAuth();
    const [jobs, setJobs] = useState([])
 
    
    useEffect(()=>{
        fetch(`http://localhost:5000/job-application?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
            setJobs(data)
        })
        console.log(jobs);
    },[user.email])


    return (
        <div>

<div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Salary Range</th>
      </tr>
    </thead>
    <tbody>


   {
    jobs.map((job, index) =>(
        <tr key={(job)._id}>
        <th>{index+1}</th>
        <td>{user.displayName}</td>
        <td>{job.applicant_email}</td>
        <td>{job.salaryRange.min}-{job.salaryRange.max}  </td>
      </tr>
    ) )
   }



   
    </tbody>
  </table>
</div>
          
            
        </div>
    );
};

export default MyApplication;