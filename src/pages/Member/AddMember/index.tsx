import { Spinner } from "@/components/Spinner";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import React from "react";
import { toast } from "react-toastify";
import Papa from 'papaparse';

const roleMap: { [key: string]: number } = {
  "Superhuman": 0,
  "Npc": 1,
  "Coordinator": 2,
  "Columnist": 3,
  "Developer": 7,
  "Designer": 4,
  "Illustrator": 6,
  "Alumni": 8,
  "Photographer": 5,
  "Editor": 9, 
};

export default function AddMember() {
  const { setError } = React.useContext(ErrorContext);
  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = React.useState<string>("");
  const [csvFile, setCsvFile] = React.useState<File | null>(null);

  const roles = [
    "Superhuman", "Npc", "Coordinator", "Columnist", "Developer", "Designer",
    "Illustrator", "Alumni", "Photographer", "Editor"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (csvFile) {
      handleCsvUpload();
    } else {
      handleSingleMemberAdd(e);
    }
  };

  const handleSingleMemberAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    if (!role) {
      toast.error("Please select a role");
      setLoading(false);
      return;
    }

    const teamRole = roleMap[role];

    if (teamRole === undefined) {
      toast.error("Invalid role selected");
      setLoading(false);
      return;
    }

    try {
      await API.post("/auth/signup", { name, username: email, teamRole });
      toast.success("Member added successfully");
      setRole(""); 
      e.currentTarget.reset();
    } catch (e) {
      setError(e);
      toast.error("Error adding member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCsvUpload = () => {
    if (!csvFile) {
      toast.error("Please select a CSV file");
      setLoading(false);
      return;
    }

    Papa.parse(csvFile, {
      complete: async (results) => {
        const data = results.data as string[][];
        for (let i = 0; i < data.length-1; i++) {
          const {name, email, role} = data[i];
          const teamRole = roleMap[role];

          if (teamRole === undefined) {
            toast.error(`Invalid role for ${name}: ${role}`);
            continue;
          }

          try {
            await API.post("/auth/signup", { name, username: email, teamRole });
            toast.success(`Added ${name} successfully`);
          } catch (e) {
            setError(e);
            toast.error(`Error adding ${name}. Please try again.`);
          }
        }
        setLoading(false);
        setCsvFile(null);
      },
      header: true,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <h1>Create Member</h1>
      <p className="text-lg mt-4 mb-10">Welcome a new member to the DTU Times team.</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-2xl font-medium leading-none mb-2" htmlFor="name">Name</label>
          <input
            className="name border p-2 rounded"
            type="text"
            id="name"
            placeholder="Enter name"
            name="name"
            pattern="[A-Za-z/s]+" 
            title="Only alphabetical names are allowed"
          />
          <label className="text-2xl font-medium leading-none mb-2 mt-6" htmlFor="email">Email</label>
          <input
            className="name border p-2 rounded"
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
          />
          <label className="text-2xl font-medium leading-none mb-2 mt-6" htmlFor="role">Declare Role</label>
          <select
            className="name border p-2 rounded"
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>Select Role</option>
            {roles.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </select>

          <label className="text-2xl font-medium leading-none mb-2 mt-6" htmlFor="csv">Or Upload CSV</label>
          <input
            type="file"
            id="csv"
            accept=".csv"
            onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            className="border p-2 rounded"
          />

          <button
            className="update-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-1xl mt-4"
            type="submit"
          >
            {csvFile ? "Upload CSV" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
