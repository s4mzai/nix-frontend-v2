import { useEffect, useState } from "react";
import Collapsible from "@/components/Collapsible";
import API from "@/services/API";

export default function AllMembers() {
  const [membersList, setMembersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const membersEndpoint = '/user';

    API.get(membersEndpoint)
        .then((membersResponse) => {
        setMembersList(membersResponse.data.data);
        setLoading(false);
    })
      .catch((error) => {
        setError(error);
        setLoading(false);
      })   
  }, []);

  return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-semibold text-center">All Members</h1>
        <p className="text-lg text-center mt-4 mb-10">
          List of all the members of the DTU Times team.
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message} </p>
        ) : (
          <div >
          {membersList.map((member) => (
            <div key={member.id}>
             <Collapsible label={member.name}>
             <h4>
                {member.email}
             </h4>
           </Collapsible>
           </div>
          ))}
        </div>
        )}    
      </div>
    );
}
