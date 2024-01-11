import Collapsible from "../../../components/Collapsible";

export default function AllRoles() {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-semibold text-center">All Roles</h1>
        <p className="text-lg text-center mt-4 mb-10">
          Everyone has a different role in Times. Hence different usage of the website.
        </p>
        <div className="space-y-4">
            <Collapsible label="I am a role:)">
              <h4> these are my perms </h4>
            </Collapsible>
        </div>
      </div>
    )
}
