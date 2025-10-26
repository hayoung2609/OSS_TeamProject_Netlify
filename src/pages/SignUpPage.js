// src/pages/SignUpPage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function SignUpPage() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        
        console.log('Sign up attempt with:', data);
        alert('회원가입 되었습니다! (실제 등록 없음)');
        navigate('/login');
    };

    const getErrorClass = (fieldName) => {
        return errors[fieldName]
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500';
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">회원가입</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        사용자 이름
                    </label>
                    <input
                        type="text"
                        id="username"

                        {...register("username", { required: "사용자 이름은 필수입니다." })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${getErrorClass('username')}`}
                        placeholder="사용할 이름을 입력하세요"
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        이메일 주소
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { 
                            required: "이메일 주소는 필수입니다.",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "올바른 이메일 형식이 아닙니다."
                            }
                        })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${getErrorClass('email')}`}
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", { 
                            required: "비밀번호는 필수입니다.",
                            minLength: { value: 6, message: "비밀번호는 6자 이상이어야 합니다." }
                        })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${getErrorClass('password')}`}
                        placeholder="6자 이상 입력하세요"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        비밀번호 확인
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword", { 
                            required: "비밀번호 확인은 필수입니다.",
                            // 8. validate 함수로 비밀번호 일치 여부 확인
                            validate: (value) =>
                                value === getValues("password") || "비밀번호가 일치하지 않습니다."
                        })}
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${getErrorClass('confirmPassword')}`}
                        placeholder="비밀번호를 다시 입력하세요"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    >
                        가입하기
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
                    로그인
                </Link>
            </p>
        </div>
    );
}

export default SignUpPage;