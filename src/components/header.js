// src/components/header.js
import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return(
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-yellow-500">
                   🍳 Recipe App
                </Link>
                {/* --- 버튼들을 감싸는 div 추가 --- */}
                <div className="flex gap-3 items-center"> {/* gap-3으로 버튼 사이 간격 조절 */}
                    {/* 로그인 버튼 */}
                    <Link
                        to="/login"
                        className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                    >
                        로그인
                    </Link>
                    {/* --- 회원가입 버튼 추가 --- */}
                    <Link
                        to="/signup"
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors text-sm"
                    >
                        회원가입
                    </Link>
                    {/* --- --- --- --- --- */}
                </div>
            </div>
        </header>
    )
}