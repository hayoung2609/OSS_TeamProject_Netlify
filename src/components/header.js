import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const changeLanguage = (langCode) => {
    let attempts = 0;
    const intervalId = setInterval(() => {
      const googleTranslateSelect = document.querySelector('.goog-te-combo');
      attempts++;

      if (googleTranslateSelect) {
        clearInterval(intervalId);
        googleTranslateSelect.value = langCode;
        googleTranslateSelect.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (attempts > 20) { // 최대 2초 동안 시도
        clearInterval(intervalId);
        console.error("2초 동안 구글 번역 위젯을 찾지 못했습니다.");
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-yellow-500 hover:text-yellow-600 transition-colors truncate">
          🍳 Recipe App
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex gap-2 sm:gap-3 items-center">
            <Link to="/login" className="bg-yellow-500 text-white font-semibold py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded-md hover:bg-yellow-600 transition-colors">
              로그인
            </Link>
            <Link to="/signup" className="bg-green-500 text-white font-semibold py-1.5 px-3 text-xs sm:py-2 sm:px-4 sm:text-sm rounded-md hover:bg-green-600 transition-colors">
              회원가입
            </Link>
          </div>
          <div className="flex items-center gap-2 border-l border-gray-300 pl-4 sm:pl-6">
            <button onClick={() => changeLanguage('')} className="text-sm font-semibold text-gray-500 hover:text-yellow-600 transition-colors" title="Switch to Korean">
              KO
            </button>
            <button onClick={() => changeLanguage('en')} className="text-sm font-semibold text-gray-500 hover:text-yellow-600 transition-colors" title="Switch to English">
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}