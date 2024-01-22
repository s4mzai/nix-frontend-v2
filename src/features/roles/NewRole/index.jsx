import { useEffect, useState } from "react";
import MyMultiselect from "@/components/MultiSelect";

const permissionsList = [
  {name: 'read'},
  {name: 'write'},
  {name: 'delete'},
  {name: 'publish'},
];

const rolesList = [
  {name: 'editor', permissions: [ {name: 'read'}, {name: 'write'}, {name: 'delete'},]},
  {name: 'superuser', permissions: [ {name: 'read'}, {name: 'write'}, {name: 'delete'}, {name: 'publish'},]},
];

export default function NewRole() {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleToggleChange = (e) => {
    setIsUpdateMode((prevMode) => !prevMode);
    setRoleName("");
    setSelectedPermissions([]);
  }

  const handleRoleNameChange = (selectedRole) => {
    if (isUpdateMode) {
      setRoleName(selectedRole?.name);
      setSelectedPermissions(selectedRole?.permissions || []);  
    } else {
      setRoleName(selectedRole.target.value);
    }
  };

  const handlePermissionChange = (selectedOptions) => {
    console.log(selectedOptions);
    if (Array.isArray(selectedOptions)) {
      setSelectedPermissions(selectedOptions.map(option => ({ name: option.name })));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted");
  };

  useEffect(() => {
 
    if (isUpdateMode) {
      // const roles = API.get('/role/update');
      // console.log(roles);
    }
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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-2xl font-medium leading-none mb-2" htmlFor="name">
            Name
          </label>
          {isUpdateMode ? (
            <MyMultiselect
              options={rolesList}
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
            options={permissionsList}
            selectedOptions={selectedPermissions}
            onSelectionChange={handlePermissionChange}
            isSingleSelect={false}
          />
        </fieldset>
        <button className="create-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl"
                type="create"
                onClick={handleSubmit}>Create</button>
      </form>
    </div>
  )
}

