// src/components/StarRating.js
import React from 'react';

// maxRating: 총 별 개수, currentRating: 현재 평점, onRate: 평점 변경 시 호출될 함수, readOnly: 읽기 전용 여부
function StarRating({ maxRating = 5, currentRating = 0, onRate, readOnly = false }) {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
        stars.push(
            <span
                key={i}
                // 읽기 전용이면 커서 기본값, 아니면 포인터
                className={`cursor-${readOnly ? 'default' : 'pointer'} text-3xl ${i <= currentRating ? 'text-yellow-400' : 'text-gray-300'}`}
                // 읽기 전용 아닐 때만 클릭 이벤트 연결
                onClick={() => !readOnly && onRate && onRate(i)}
                style={{ userSelect: 'none' }} // 별 모양 드래그 방지
            >
                ★
            </span>
        );
    }
    return <div className="flex">{stars}</div>; // flex로 별들을 가로로 나열
}

export default StarRating;