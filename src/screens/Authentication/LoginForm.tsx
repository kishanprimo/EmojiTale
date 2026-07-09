"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginAdmin } from "@/store/slices/AuthSlice/loginThunk";
import type { LoginPayload } from "@/types/AuthTypes/loginTypes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    EyeIcon,
    EyeSlashIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";

import Image from "next/image";
const LoginForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const loading = useAppSelector((state) => state.auth.loading);

    const error = useAppSelector((state) => state.auth.error);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        console.log("Login clicked");
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        let hasError = false;

        if (!email.trim()) {
            setEmailError("Email is required");
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError("Password is required");
            hasError = true;
        }

        if (hasError) return;

        const payload: LoginPayload = {
            email,
            password,
        };

        const result = await dispatch(loginAdmin(payload));

        if (loginAdmin.fulfilled.match(result)) {
            router.replace("/dashboard");
        } else {
            toast.error(result.payload as string);
        }
    };

    return (
        <div className="w-full max-w-[620px] xl:max-w-[660px]">
            <Card className="p-10 xl:p-12">
                {/* Header */}
                <div className="mb-8 flex flex-col items-center">
                    <Image
                        src="/Login/login_logo.png"
                        alt="Emotale Logo"
                        width={200}
                        height={300}
                        className="mb-4"
                    />

                    <h1 className="mt-4 text-[52px]
                                                leading-tight font-bold text-gray-900">
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-center text-gray-600">
                        Sign in with your credentials to continue
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">
                            Email
                        </label>

                        <Input
                            error={!!emailError}
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<EnvelopeIcon className="h-5 w-5" />}
                        />
                        {emailError && (
                            <p className="mt-2 text-sm text-red-500">
                                {emailError}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-900">
                            Password
                        </label>

                        <Input
                            error={!!passwordError}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={<LockClosedIcon className="h-5 w-5" />}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 transition hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            }
                        />
                        {passwordError && (
                            <p className="mt-2 text-sm text-red-500">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="mt-2"
                        disabled={loading}
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />

                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;