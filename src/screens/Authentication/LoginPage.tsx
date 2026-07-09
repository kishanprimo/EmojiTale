import LeftSection from "./LeftSection";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left */}
      <div className="hidden lg:flex lg:w-[38%] xl:w-[36%] border-r border-gray-100">
        <LeftSection />
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center px-8 lg:px-10 xl:px-14">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;