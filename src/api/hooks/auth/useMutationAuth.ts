    import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/api/Constants";
    import { login, register } from "@/api/services/authServices";
    import { useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
    import { toast } from "sonner";

    interface iAuthData {
    username: string;
    password: string;
    }

    const useMutationAuth = () => {
    const queryClient = useQueryClient();

    // Centralized error handler
    const handleAuthError = (error: any) => {
        if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
            toast.error(data?.detail || "Username already taken");
        } else if (status === 401) {
            toast.error("Invalid username or password");
        } else {
            toast.error("An error occurred. Please try again.");
        }
        } else {
        toast.error("Network error. Please try again.");
        }
    };

    // Mutation for logging in
    const useMutationLogin = (): UseMutationResult<any, any, iAuthData, unknown> =>
        useMutation<any, any, iAuthData>({
        mutationFn: (data: iAuthData) => login(data.username, data.password),
        onSuccess: (res) => {
            localStorage.setItem(ACCESS_TOKEN, res.access);
            localStorage.setItem(REFRESH_TOKEN, res.refresh);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            toast.success("Login successful");
        },
        onError: handleAuthError,
        retry: false,
        });

    // Mutation for registering
    const useMutationRegister = (): UseMutationResult<any, any, iAuthData, unknown> =>
        useMutation<any, any, iAuthData>({
        mutationFn: (data: iAuthData) => register(data.username, data.password),
        onSuccess: () => {
            toast.success("Registration successful! Please log in.");
        },
        onError: handleAuthError,
        retry: false,
        });


    return { useMutationLogin, useMutationRegister };
    };

export default useMutationAuth;
