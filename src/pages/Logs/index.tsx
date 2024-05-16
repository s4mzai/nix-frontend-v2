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

  if (stdout === null || stderr === null)
    return (
      <div className="flex flex-col justify-center h-screen w-full items-center">
        <Spinner />
        <div className="mt-2">
          <code>
            exec(`npx pm2 logs --nostream NixBackend --lines 200 --raw --out`)
          </code>
        </div>
      </div>
    );

  return (
    <div className="p-6">
      <h1>Logs</h1>
      <button
        className="absolute top-4 right-4 p-2 bg-red-500 rounded font-semibold border-black border-2"
        onClick={clearLogs}
      >
        Clear logs
      </button>
      <div className="mt-4 self-start xl:flex xl:flex-row">
        <div className="xl:w-[45vw] overflow-x-scroll w-[80vw]">
          <h2 className="text-lg font-bold">Stdout</h2>
          <pre className="text-wrap">{stdout}</pre>
        </div>
        <div className="xl:w-[45vw] overflow-x-scroll w-[80vw]">
          <h2 className="text-lg font-bold">Stderr</h2>
          <pre className="text-wrap">{stderr}</pre>
        </div>
      </div>
    </div>
  );
}
