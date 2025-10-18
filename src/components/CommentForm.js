// src/components/CommentForm.js
import React, { useState } from 'react';

function CommentForm({ onSubmit }) {
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!author.trim() || !content.trim()) {
            alert('작성자와 내용을 모두 입력해주세요.');
            return;
        }
        onSubmit({ author, content, timestamp: new Date().toISOString() });
        setAuthor(''); // 폼 초기화
        setContent(''); // 폼 초기화
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">댓글 남기기</h3>
            <div className="mb-4">
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="작성자 이름"
                    className="w-full p-2 border rounded-md text-sm"
                    maxLength={20}
                />
            </div>
            <div className="mb-4">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="댓글 내용을 입력하세요..."
                    className="w-full p-2 border rounded-md text-sm"
                    rows="3"
                    maxLength={300}
                />
            </div>
            <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors text-sm"
            >
                댓글 등록
            </button>
        </form>
    );
}

export default CommentForm;