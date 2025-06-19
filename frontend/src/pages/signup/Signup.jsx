import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-2xl p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
        <h1 className="text-3xl font-semibold text-center text-slate-400 mb-6">
          Sign Up <span className="text-blue-400">LetsChat</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-md bg-white/30 text-slate-800 placeholder-slate-500 border"
                style={{ borderColor: "#A2B9E7" }}
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Username</label>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full px-4 py-2.5 rounded-md bg-white/30 text-slate-800 placeholder-slate-500 border"
                style={{ borderColor: "#A2B9E7" }}
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2.5 rounded-md bg-white/30 text-slate-800 placeholder-slate-500 border"
                style={{ borderColor: "#A2B9E7" }}
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 rounded-md bg-white/30 text-slate-800 placeholder-slate-500 border"
                style={{ borderColor: "#A2B9E7" }}
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <div className="text-sm text-slate-500 pt-2">
            Already have an account?{" "}
            <b><Link to="/login" className="text-slate-700 hover:underline">
              Login
            </Link></b>
          </div>

          <button
            className="w-full py-3 mt-4 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;