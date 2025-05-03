import { Button } from "antd";
import { useAuth } from "../features/auth/hooks";
import { useNavigate } from "react-router";


const Home = () => {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();
  return <Button onClick={() => {
    clearAuth();
    navigate('/auth')
  }} >Выход</Button>;
};

export default Home;
