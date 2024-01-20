import { useEffect, useState } from "react";
import Collapsible from "@/components/Collapsible";
import API from "@/services/API";

export default function AllRoles() {
  const [rolesList, setRolesList] = useState([]);
  const [permMap, setPermMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const rolesEndpoint = '/role';
    const permsEndpoint = '/permissions';

    API.get(permsEndpoint)
      .then((response) => {
        setPermMap(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    API.get(rolesEndpoint)
      .then(response => {
        setRolesList(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-semibold text-center">All Roles</h1>
        <p className="text-lg text-center mt-4 mb-10">
          Everyone has a different role in Times. Hence different usage of the website.
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message} </p>
        ) : (
          <div className="space-y-4">
          {rolesList.map((role) => (
            <div key={role.role_id}>
             <Collapsible label={role.role_name.charAt(0).toUpperCase() + role.role_name.slice(1).toLowerCase()}>
             <h4>
              <ol className="flex flex-wrap gap-2">
              {role.permissions.map((permissionId) => (
                  <li className="text-lg bg-blue-500 rounded-full px-3 py-1" key={permissionId}>{permMap[permissionId]} </li>
                ))}
              </ol>   
             </h4>
           </Collapsible>
           </div>
          ))}
        </div>
        )}    
      </div>
    );
}
