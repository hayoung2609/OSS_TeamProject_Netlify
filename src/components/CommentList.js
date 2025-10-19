// src/components/CommentList.js
import React from 'react';

// 날짜 포맷 함수 (간단 버전)
const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// props 추가: onDelete, onEditStart, onEditSave, onEditCancel, onEditChange, editingIndex, editText
function CommentList({ comments, onDelete, onEditStart, onEditSave, onEditCancel, onEditChange, editingIndex, editText }) {
    if (!comments || comments.length === 0) {
        return <p className="text-gray-500 text-sm mt-4">아직 댓글이 없습니다.</p>;
    }

    return (
        <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">댓글 목록</h3>
            {comments.map((comment, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-md bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800 text-sm">{comment.author}</span>
                        <span className="text-gray-400 text-xs">{formatDate(comment.timestamp)}</span>
                    </div>

                    {/* 수정 중 상태에 따른 조건부 렌더링 */}
                    {editingIndex === index ? (
                        // --- 수정 중일 때 ---
                        <div>
                            <textarea
                                value={editText}
                                onChange={onEditChange} // 입력 내용 변경 핸들러 연결
                                className="w-full p-2 border rounded-md text-sm mb-2"
                                rows="2"
                                maxLength={300}
                            />
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => onEditSave(index)} // 저장 핸들러 연결
                                    className="bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded hover:bg-green-600 transition-colors"
                                >
                                    저장
                                </button>
                                <button
                                    onClick={onEditCancel} // 취소 핸들러 연결
                                    className="bg-gray-400 text-white text-xs font-semibold py-1 px-3 rounded hover:bg-gray-500 transition-colors"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    ) : (
                        // --- 일반 상태일 때 ---
                        <div>
                            <p className="text-gray-600 text-sm mb-2">{comment.content}</p>
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => onEditStart(index, comment.content)} // 수정 시작 핸들러 연결
                                    className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => onDelete(index)} // 삭제 핸들러 연결
                                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CommentList;