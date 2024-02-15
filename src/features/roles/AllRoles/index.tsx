import Collapsible from "@/components/Collapsible";
import { Spinner } from "@/components/Spinner";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import { useContext, useEffect, useState } from "react";

export default function AllRoles() {
  const [rolesList, setRolesList] = useState([]);
  const [permMap, setPermMap] = useState({});
  const [loading, setLoading] = useState(true);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const rolesEndpoint = "/role";
    const permsEndpoint = "/permissions";

    Promise.all([
      API.get(permsEndpoint),
      API.get(rolesEndpoint),
    ])
      .then(([permsResponse, rolesResponse]) => {
        setPermMap(permsResponse.data.data);
        setRolesList(rolesResponse.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-semibold text-center">All Roles</h1>
      <p className="text-lg text-center mt-4 mb-10">
        Everyone has a different role in Times. Hence different usage of the website.
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div >
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
