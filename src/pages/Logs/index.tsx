import { Spinner } from "@/components/Spinner";
import API from "@/services/API";
import { useEffect, useState } from "react";

export default function Logs() {
  const [stdout, setStdout] = useState<string>(null);
  const [stderr, setStderr] = useState<string>(null);

  useEffect(() => {
    API.get("/logs").then((res) => {
      const data = res.data;
      setStdout(data.stdout);
      setStderr(data.stderr);
    });
  }, []);

  const clearLogs = () => {
    API.get("/logs/clear").then((res) => {
      const data = res.data;
      setStdout(data.stdout);
      setStderr(data.stderr);
    });
  };

  if (!stdout || !stderr) return <Spinner />;

  return (
    <div className="p-6">
      <h1>Logs</h1>
      <button
        className="absolute top-4 right-4 p-2 bg-red-500 rounded font-semibold border-black border-2"
        onClick={clearLogs}
      >
        Clear logs
      </button>
      <h2>Stdout</h2>
      <pre>{stdout}</pre>
      <hr className="m-4" />
      <h2>Stderr</h2>
      <pre>{stderr}</pre>
    </div>
  );
}
