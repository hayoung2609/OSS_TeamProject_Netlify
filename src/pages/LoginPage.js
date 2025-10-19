// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 임포트 추가

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
        alert('로그인 되었습니다! (실제 인증 없음)');
        navigate('/');
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">로그인</h1>
            <form onSubmit={handleLogin} className="space-y-6">
                {/* ... (이메일, 비밀번호 입력 필드) ... */}
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        이메일 주소
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                        placeholder="********"
                    />
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
            {/* --- 회원가입 링크 추가 --- */}
            <p className="mt-6 text-center text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
                    회원가입
                </Link>
            </p>
            {/* --- --- --- --- --- */}
        </div>
    );
}

export default LoginPage;