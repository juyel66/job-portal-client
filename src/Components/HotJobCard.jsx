import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

const HotJobCard = ({ job }) => {
    const { title, description, company, company_logo, requirements,salaryRange,_id } = job;
  
    return (
      <div>
        <div className="card bg-base-100 h-[530px] shadow-sm border-2 border-base-300 hover:bg-base-300 hover:border-2 hover:border-blue-300">
          <figure>
            <img className=" h-[200px]  "
              src={company_logo}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            {/* Title & Company আলাদা রাখার জন্য flex ব্যবহার */}
            <div className="flex justify-between items-center w-full ">
              <h2 className="card-title font-bold">{title}</h2>
              <p className="text-gray-600 ml-4">{company}</p>
            </div>
            <p>{description}</p>
            
            <div className="flex gap-2 ">
                
                {
                   requirements.map((skill , index) => <p  className=" rounded-2xl bg-gray-200 text-center " key={skill._job} >{skill}</p>)
                }
            </div>
           <div className="flex items-center">
           Salary: 
           <BsCurrencyDollar />
           <p>  {salaryRange.min}-{salaryRange.max} {salaryRange.currency} </p>
           </div>
            <div className="card-actions justify-end">
             
             <Link to={`/jobs/${_id}`} className="btn btn-primary w-full">
             <button >Apply</button>
             </Link>
            </div>
          </div>
        </div>

        
      </div>
    );
  };
  
  export default HotJobCard;
  