import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import useMutationAuth from "@/hooks/auth/useMutationAuth";

interface FormProps {
  method: "login" | "register";
  route: string;
}

function Form({ method }: FormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { useMutationLogin, useMutationRegister } = useMutationAuth();
  const loginMutation = useMutationLogin();
  const registerMutation = useMutationRegister();
  const mutation = method === "login" ? loginMutation : registerMutation;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mutation.isPending) return;

    if (method === "register" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          toast.success(method === "login" ? "Login successful!" : "Registration successful!");
          navigate(method === "login" ? "/" : "/login");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src="./NOTA.png" alt="logo" className="scale-50 mt-[-17rem] mb-[-10rem]" />

      <form onSubmit={handleSubmit} className="flex flex-col bg-white text-center p-6 space-y-7 rounded-xl shadow-lg mt-10 w-80">
        <h1 className="text-3xl font-bold">{method === "login" ? "LOGIN" : "REGISTER"}</h1>

        <div className="w-full">
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

        <Button type="submit" className="w-full bg-gray-400 text-white p-2 rounded hover:scale-110 transition-transform duration-300" disabled={mutation.isPending}>
          {mutation.isPending ? "Processing..." : method.toUpperCase()}
        </Button>

        <p>
          <a className="capitalize hover:underline text-black" href={`/${method === "login" ? "register" : "login"}`}>
            {method === "login" ? "Register Here" : "Login Here"}
          </a>
        </p>
      </form>
    </div>
  );
}

export default Form;
