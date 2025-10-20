import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                {/* 
                  - 기본 글자 크기를 모바일용(text-xl)으로 줄이고,
                  - 화면이 커지면(sm:) 원래 크기(text-2xl)로 돌아오도록 설정했습니다.
                  - truncate를 추가해 아주 좁은 화면에서도 글자가 깨지지 않게 합니다.
                */}
                <Link to="/" className="text-xl sm:text-2xl font-bold text-yellow-500 hover:text-yellow-600 transition-colors truncate">
                   🍳 Recipe App
                </Link>

                {/* 
                  - 버튼 사이 간격을 모바일용(gap-2)으로 살짝 줄이고,
                  - 화면이 커지면(sm:) 원래 간격(gap-3)으로 돌아오도록 설정했습니다.
                */}
                <div className="flex gap-2 sm:gap-3 items-center">
                    {/* 
                      - 모바일에서는 버튼 크기(py-1.5 px-3)와 글자 크기(text-xs)를 줄이고,
                      - 화면이 커지면(sm:) 원래 크기(sm:py-2 sm:px-4, sm:text-sm)로 돌아옵니다.
                    */}
                    <Link
                        to="/login"
                        className="bg-yellow-500 text-white font-semibold py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded-md hover:bg-yellow-600 transition-colors"
                    >
                        로그인
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-green-500 text-white font-semibold py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded-md hover:bg-green-600 transition-colors"
                    >
                        회원가입
                    </Link>
                </div>
            </div>
        </header>
    )
}