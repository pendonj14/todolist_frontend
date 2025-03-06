import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../api/services/Constants";
import { Button } from "../ui/button";
import NoteModal from "./NoteModal";


interface FormProps {
  route: string;
  method: "login" | "register";
}

function Form({ route, method }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const name = method === "login" ? "LOGIN" : "REGISTER";
  const inverse = method === "login" ? "register" : "login";

  const showModalMessage = (message: string): void => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (method === "register" && password !== confirmPassword) {
      showModalMessage("Passwords do not match");
      return;
    }

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          showModalMessage("Username already taken");
        } else if (error.response.status === 401) {
          showModalMessage("Invalid username or password");
        } else {
          showModalMessage("An error occurred");
        }
      } else {
        showModalMessage("An error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      
      <img src="./src/assets/NOTA.png" alt="logo" className="scale-50 mt-[-17rem] mb-[-10rem]" />
      
      <form onSubmit={handleSubmit} className="flex flex-col bg-white text-center p-6 space-y-7 rounded-xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold">{name}</h1>

        <div className="w-64">
          <input
            className="border border-gray-600 rounded-md p-2 w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="border border-gray-600 rounded-md p-2 w-full mt-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {method === "register" && (
            <input
              className="border border-gray-600 rounded-md p-2 w-full mt-4"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          )}
        </div>

        <Button variant="default" className="bg-gray-400 hover:scale-110 transition-transform" type="submit">
          {name}
        </Button>

        <p>
          <a className="capitalize hover:underline" href={`/${inverse}`}>
            {`${inverse} Here`}
          </a>
        </p>
      </form>
      {showModal && <NoteModal message={modalMessage} setShowModal={setShowModal} />}
    </div>
  );
}

export default Form;