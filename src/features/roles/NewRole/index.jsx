
export default function NewRole() {
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <h1 className="text-4xl font-bold mb-4">Create New Roles</h1>
      <p className="text-lg mb-8">Create a new role in the organization</p>
      <form className="space-y-6">
        <div className="flex flex-col">
          <label className="text-2xl font-medium leading-none mb-2" htmlFor="name">
            Name
          </label>
          <input className="name border p-2 rounded " placeholder="Name" />
        </div>
        <fieldset className="flex flex-col">
          <legend className="text-2xl font-medium leading-none mb-2">Permissions</legend>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input className="form-checkbox" name="permissions" type="checkbox" value="read" />
              <span className="ml-2">Read</span>
            </label>
            <label className="inline-flex items-center">
              <input className="form-checkbox" name="permissions" type="checkbox" value="write" />
              <span className="ml-2">Connect to api for perms</span>
            </label>
          </div>
        </fieldset>
        <button className="create-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl">Create</button>
      </form>
    </div>
  )
}

