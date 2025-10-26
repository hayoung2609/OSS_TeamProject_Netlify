/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // --- 우리만의 디자인 시스템을 여기에 정의합니다 ---
      colors: {
        // 브랜드 색상 (따뜻한 주황색 계열)
        brand: {
          light: '#fed7aa', // 옅은 주황
          DEFAULT: '#fb923c', // 기본 주황
          dark: '#f97316',  // 진한 주황
        },
        // 배경 및 표면 색상
        background: '#fff7ed', // 아주 연한 베이지/오렌지
        surface: '#ffffff',    // 카드 등 콘텐츠 배경 (흰색)
        // 텍스트 색상
        "text-primary": '#1f2937', // 기본 텍스트 (진한 회색)
        "text-secondary": '#6b7280',// 보조 텍스트 (중간 회색)
      },
      fontFamily: {
        // Pretendard 폰트를 기본 sans 폰트로 지정
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};