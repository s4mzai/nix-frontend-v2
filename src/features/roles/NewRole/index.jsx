import { useEffect, useState } from "react";
import MyMultiselect from "@/components/MultiSelect";
import API from "../../../services/API";
import { toast } from "react-toastify";

// const permissionsList = [
//   {name: 'read'},
//   {name: 'write'},
//   {name: 'delete'},
//   {name: 'publish'},
// ];

// const rolesList = [
//   {name: 'editor', permissions: [ {name: 'read'}, {name: 'write'}, {name: 'delete'},]},
//   {name: 'superuser', permissions: [ {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'publish'},]},
// ];

export default function NewRole() {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  //get requests for permMap and roles to populate dropdown
  const [permMap, setPermMap] = useState({});
  const [rolesList, setRolesList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //to toggle between update and create mode 
  const handleToggleChange = (e) => {         
    setIsUpdateMode((prevMode) => !prevMode);
    setRoleName("");
    setSelectedPermissions([]);
  }

  const handleRoleNameChange = (e) => {
    const roleData = e[0];
    console.log(e[0]);
    if (isUpdateMode) {
      setRoleName(roleData.name);
      setSelectedPermissions(roleData.permissions.map((index) => ({name: permMap[index], id: index})));  
    } else {
      setRoleName(e.target.value);
    }
  };

  const handlePermissionChange = (selectedItems) => {
    setSelectedPermissions(selectedItems);
    console.log(selectedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      role_name: roleName,
      permissions: selectedPermissions.map(permission => permission.id),
    };

    const updateRoleEndpoint = '/role/update';

    console.log(request, selectedPermissions);
    API.post(updateRoleEndpoint, request)
      .then(toast.success("successfully submitted"))
      .catch(toast.success("failed"));

    //alert("submitted");
  };

  useEffect(() => {
    const rolesEndpoint = '/role';
    const permsEndpoint = '/permissions';

    Promise.all([
      API.get(permsEndpoint),
      API.get(rolesEndpoint),
    ]).then(([permsResponse, rolesResponse]) => {
        setPermMap(permsResponse.data.data);
        setRolesList(rolesResponse.data.data);
        setLoading(false);
    })
      .catch((error) => {
        setError(error);
        setLoading(false);
      })   
    
    console.log(rolesList);
 
    if (isUpdateMode) {
      // const roles = API.get('/role/update');
      // console.log(roles);
    }
    //useEffect runs when value of isUpdateMode changes
  }, [isUpdateMode]);

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <h1 className="text-4xl font-bold mb-4">
        {isUpdateMode ? "Update" : "Create"} Roles</h1>
      <p className="text-lg mb-8">Change current roles in the organization</p>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onClick={handleToggleChange}/>
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 ">Switch Mode</span>
      </label>

      <form className="space-y-6">
        <div className="flex flex-col">
          <label className="text-2xl font-medium leading-none mb-2" htmlFor="name">
            Name
          </label>
          {isUpdateMode ? (
            <MyMultiselect
              options={rolesList.map(role => ({name: role.role_name, id: role.role_id, permissions: role.permissions}))}
              selectedOptions={[{ name: roleName, permissions: selectedPermissions }]}
              onSelectionChange={handleRoleNameChange}
              isSingleSelect={true}
              />
          ) : (
            <input className="name border p-2 rounded " 
            placeholder="Name"
            name="name"
            value={roleName}
            onChange={handleRoleNameChange} 
     />
          )}
         
        </div>
        <fieldset className="flex flex-col">
          <label className="text-2xl text-black font-medium leading-none mb-2">Permissions</label>
          <MyMultiselect
            options={Object.values(permMap).map((perm, index) => ({name: perm, id: index}))}
            selectedOptions={selectedPermissions}
            onSelectionChange={handlePermissionChange}
            isSingleSelect={false}
          />
        </fieldset>

      {isUpdateMode ? (
          <button className="update-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl"
          type="update"
          onClick={handleSubmit}>Update
          </button>
      ) : (
        <button className="create-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl"
                type="create"
                onClick={handleSubmit}>Create
        </button>
      )}

      
        
      </form>
    </div>
  )
}

