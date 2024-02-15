
import { Spinner } from "@/components/Spinner";
import { getTokenFromStorage } from "@/services/localStorageParser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getTokenFromStorage();
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Spinner />
    </div>
  );
};

export default HomePage;
