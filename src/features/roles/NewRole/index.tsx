import { useEffect, useReducer } from "react";
import MyMultiselect from "@/components/MultiSelect";
import API from "@/services/API";
import { toast } from "react-toastify";


const initialState = {
  roleName: "",
  selectedPermissions: [],
  roleId: "",
  isUpdateMode: false,
  permMap: {},
  rolesList: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  //console.log(action); (good way to keep track of state)
  const updatedData = { ...state };
  switch (action.type) {
  //underscore convention from react docs
  case "set_role_name":
    //TODO check for role name constraints here
    updatedData.roleName = action.payload;
    break;
  case "set_selected_permissions":
    updatedData.selectedPermissions = action.payload;
    break;
  case "set_role_id":
    updatedData.roleId = action.payload;
    break;
  case "set_is_update_mode":
    updatedData.isUpdateMode = action.payload;
    break;
  case "set_perm_map":
    updatedData.permMap = action.payload;
    break;
  case "set_roles_list":
    updatedData.rolesList = action.payload;
    break;
  case "set_loading":
    updatedData.loading = action.payload;
    break;
  case "set_error":
    updatedData.error = action.payload;
    break;
  default:
    return updatedData;
  }
  return updatedData;
};
export default function NewRole() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    roleName,
    selectedPermissions,
    roleId,
    isUpdateMode,
    permMap,
    rolesList,
    loading,
    error,
  } = state;

  //to toggle between update and create mode 
  const handleToggleChange = (e) => {
    dispatch({ type: "set_is_update_mode", payload: !isUpdateMode });
    dispatch({ type: "set_role_name", payload: "" });
    dispatch({ type: "set_selected_permissions", payload: [] });

    if (!isUpdateMode) {
      //roleIDd needs to be reset when switching back to create mode
      dispatch({ type: "set_role_id", payload: null });
    }
  };

  const handleRoleNameChange = (e) => {
    const roleData = e[0];
    if (isUpdateMode) {
      dispatch({ type: "set_role_name", payload: roleData.name });
      dispatch({
        type: "set_selected_permissions",
        payload: roleData.permissions.map((index) => ({
          name: permMap[index],
          id: index,
        })),
      });
      dispatch({ type: "set_role_id", payload: roleData.id });
    } else {
      dispatch({ type: "set_role_name", payload: e.target.value });
    }
  };

  const handlePermissionChange = (selectedItems) => {
    dispatch({ type: "set_selected_permissions", payload: selectedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdateMode) {
      const updateRequest = {
        role_name: roleName,
        role_id: roleId,
        permissions: selectedPermissions.map(permission => permission.id),
      };

      const updateRoleEndpoint = "/role/update";

      API.post(updateRoleEndpoint, updateRequest)
        .then(() => toast.success("Successfully updated"))
        .catch(() => toast.error("Failed to update role"));

    } else {

      const createRequest = {
        role_name: roleName,
        permissions: selectedPermissions.map(permission => permission.id),
      };

      const createRoleEndpoint = "/role/update";

      API.post(createRoleEndpoint, createRequest)
        .then(() => toast.success("Successfully created"))
        .catch(() => toast.error("Failed to create role"));


    }
  };

  useEffect(() => {
    const rolesEndpoint = "/role";
    const permsEndpoint = "/permissions";

    Promise.all([
      API.get(permsEndpoint),
      API.get(rolesEndpoint),
    ]).then(([permsResponse, rolesResponse]) => {
      dispatch({ type: "set_perm_map", payload: permsResponse.data.data });
      dispatch({ type: "set_roles_list", payload: rolesResponse.data.data });
      dispatch({ type: "set_loading", payload: false });
    })
      .catch((error) => {
        dispatch({ type: "set_error", payload: error });
        dispatch({ type: "set_loading", payload: false });
      });


    //useEffect runs when value of isUpdateMode changes
  }, [isUpdateMode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <h1 className="text-4xl font-bold mb-4">
        {isUpdateMode ? "Update" : "Create"} Roles</h1>
      <p className="text-lg mb-8">Change current roles in the organization</p>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onClick={handleToggleChange} />
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
              options={rolesList.map(role => ({ name: role.role_name, id: role.role_id, permissions: role.permissions }))}
              selectedOptions={[{ name: roleName, permissions: selectedPermissions }]}
              onSelectionChange={handleRoleNameChange}
              isSingleSelect={true}
            />
          ) : (
            <input className="name border p-2 rounded "
              type="text"
              id="roleName"
              placeholder="Enter role name"
              name="name"
              value={roleName}
              onChange={handleRoleNameChange}
              pattern="[A-Za-z]+"
              title="Only alphabetical role names are allowed"
              required
            />
          )}

        </div>
        <fieldset className="flex flex-col">
          <label className="text-2xl text-black font-medium leading-none mb-2">Permissions</label>
          <MyMultiselect
            options={Object.values(permMap).map((perm, index) => ({ name: perm, id: index }))}
            selectedOptions={selectedPermissions}
            onSelectionChange={handlePermissionChange}
            isSingleSelect={false}
          />
        </fieldset>
        {/* todo: what's with this type thing? */}
        {isUpdateMode ? (
          <button className="update-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl"
            // type="update"
            onClick={handleSubmit}>Update
          </button>
        ) : (
          <button className="create-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl"
            // type="create"
            onClick={handleSubmit}>Create
          </button>
        )}
      </form>
    </div>
  );
}
