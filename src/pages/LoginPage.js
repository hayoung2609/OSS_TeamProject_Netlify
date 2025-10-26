// src/pages/LoginPage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Login attempt with:', data);
        alert('로그인 되었습니다! (실제 인증 없음)');
        navigate('/');
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">로그인</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        이메일 주소
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: "이메일 주소는 필수입니다." })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                            errors.email
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        }`}
                        placeholder="you@example.com"
                    />
                    {/* 7. 에러 메시지 표시 */}
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        
                        {...register("password", { required: "비밀번호는 필수입니다." })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                            errors.password
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                        }`}
                        placeholder="********"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                    >
                        로그인
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                    회원가입
                </Link>
            </p>
        </div>
    );
}

export default LoginPage;