import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className="w-full p-6 rounded-xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
				<h1 className='text-3xl font-semibold text-center text-gray-400 mb-6'>
					Login <span className='text-blue-400'>ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className='block text-sm font-medium text-slate-500 mb-1'>Username</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full h-10 rounded-md px-3 text-slate-800 placeholder-slate-400 border bg-white'
							style={{ borderColor: '#64748b' }}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-slate-500 mb-1'>Password</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full h-10 rounded-md px-3 text-slate-800 placeholder-slate-400 border bg-white'
							style={{ borderColor: '#64748b' }}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className="text-sm text-slate-500 mt-2">
						<b>
							<Link to='/signup' className='hover:underline hover:text-slate-600'>
								Don't have an account?
							</Link>
						</b>
					</div>

					<div>
						<button className='btn btn-block btn-sm mt-2' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
