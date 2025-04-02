import { Spinner } from "@/components/Spinner";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import React from "react";
import { toast } from "react-toastify";
import Papa from 'papaparse';
import { FaTimes } from 'react-icons/fa';


const roleMap: { [key: string]: string } = {
  "Superhuman": "64b1f0d8e4a0c12345678901",
  "Npc": "64b1f0d8e4a0c12345678902",
  "Coordinator": "64b1f0d8e4a0c12345678903",
  "Columnist": "64b1f0d8e4a0c12345678904",
  "Developer": "64b1f0d8e4a0c12345678905",
  "Designer": "64b1f0d8e4a0c12345678906",
  "Illustrator": "64b1f0d8e4a0c12345678907",
  "Alumni": "64b1f0d8e4a0c12345678908",
  "Photographer": "64b1f0d8e4a0c12345678909",
  "Editor": "64b1f0d8e4a0c12345678910",
};

export default function AddMember() {
  const { setError } = React.useContext(ErrorContext);
  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = React.useState<string>("");
  const [csvFiles, setCsvFiles] = React.useState<File[]>([]);
  const [isMultiMember, setIsMultiMember] = React.useState(false);

  const roles = Object.keys(roleMap);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (isMultiMember) {
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

    if (!teamRole) {
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
    if (csvFiles.length === 0) {
      toast.error("Please select at least one CSV file");
      setLoading(false);
      return;
    }

    let processedCount = 0;
    const totalFiles = csvFiles.length;
    const errors: string[] = [];

    csvFiles.forEach((file, fileIndex) => {
      Papa.parse(file, {
        complete: async (results) => {
          const data = results.data as Record<string, string>[];
          const skippedRows: number[] = [];

          for (let i = 0; i < data.length; i++) {
            const { name, email, role } = data[i];
            if (!name || !email || !role) {
              skippedRows.push(i + 1); 
              continue;
            }

            const teamRole = roleMap[role];

            if (!teamRole) {
              errors.push(`Invalid role for ${name}: ${role} in file ${file.name}`);
              continue;
            }

            try {
              await API.post("/auth/signup", { name, username: email, teamRole });
              toast.success(`Added ${name} successfully from ${file.name}`);
            } catch (e) {
              if (e instanceof Error) {
                errors.push(`Error adding ${name} from ${file.name}: ${e.message}`);
              } else {
                errors.push(`Error adding ${name} from ${file.name}: Unknown error occurred.`);
              }
            }
          }

          if (skippedRows.length > 0) {
            toast.warning(`The following rows were skipped in ${file.name} due to missing fields: ${skippedRows.join(", ")}`);
          }

          processedCount++;
          if (processedCount === totalFiles) {
            if (errors.length > 0) {
              toast.error(errors.join("\n"));
            }
            setLoading(false);
            setCsvFiles([]);
          }
        },
        header: true,
      });
    });
  };

  const downloadSampleCsv = () => {
    const sampleData = [
      ["name", "email", "role"],
      ["John Doe", "john.doe@example.com", "Developer"],
      ["Jane Smith", "jane.smith@example.com", "Designer"],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      sampleData.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample.csv");
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  };

  const handleFileDelete = (indexToDelete: number) => {
    setCsvFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToDelete));
    // Reset the file input
    const fileInput = document.getElementById('csv') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setCsvFiles(prevFiles => [...prevFiles, ...newFiles]);
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

      {/* Toggle Section */}
      <div className="flex items-center mb-6">
        <label className="mr-3 text-xl font-medium">Mode:</label>
        <button
          type="button"
          onClick={() => setIsMultiMember(false)}
          className={`px-4 py-2 rounded-l ${
            !isMultiMember ? 'bg-indigo-500 text-white' : 'bg-gray-200'
          }`}
        >
         Create Single Member
        </button>
        <button
          type="button"
          onClick={() => setIsMultiMember(true)}
          className={`px-4 py-2 rounded-r ${
            isMultiMember ? 'bg-indigo-500 text-white' : 'bg-gray-200'
          }`}
        >
         Create Multi Members (CSV)
        </button>
      </div>

      {/* Form Section */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {!isMultiMember ? (
          // Single Member Form
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
          </div>
        ) : (
          // Multi-Member CSV Upload Form
          <div className="flex flex-col">
            <label className="text-2xl font-medium leading-none mb-2" htmlFor="csv">Upload CSV Files</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="csv"
                accept=".csv"
                multiple
                onChange={handleFileChange}
                className="border p-2 rounded flex-grow"
              />
            </div>
            {csvFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">Uploaded Files:</h3>
                <div className="space-y-2">
                  {csvFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <span className="text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => handleFileDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={downloadSampleCsv}
              className="bg-blue-500 text-white hover:bg-blue-700 border p-3 rounded text-xl mt-4"
            >
              Download Sample CSV
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          className={`update-button bg-gray-50 text-black hover:bg-indigo-500 border p-3 rounded text-xl mt-4`}
          type="submit"
        >
          {isMultiMember ? 'Upload CSV' : 'Register'}
        </button>
      </form>
    </div>
  );
}
