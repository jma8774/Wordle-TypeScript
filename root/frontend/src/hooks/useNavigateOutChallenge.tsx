import { useNavigate, useSearchParams } from "react-router-dom";

const useNavigateOnChallenge = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigateToRoot = () => {
    if (searchParams.get("word")) navigate("/Wordle-TypeScript");
  };

  return { navigateToRoot };
};

export default useNavigateOnChallenge;
