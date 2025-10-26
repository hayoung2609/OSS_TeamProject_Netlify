import React from 'react';
import CommentEditForm from './CommentEditForm';

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

function CommentList({ comments, onDelete, onEditStart, onEditSave, onEditCancel, editingIndex }) {
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

                    {editingIndex === index ? (
                        <CommentEditForm
                            currentContent={comment.content}
                            onSave={(data) => onEditSave(index, data)}
                            onCancel={onEditCancel}
                        />
                    ) : (
                        <div>
                            <p className="text-gray-600 text-sm mb-2 whitespace-pre-line">{comment.content}</p>
                            <div className="flex gap-2 justify-end">
                                <button
                                    onClick={() => onEditStart(index)} 
                                    className="text-blue-500 hover:text-blue-700 text-xs font-medium"
                                >
                                    수정
                                </button>
                                <button
                                    onClick={() => onDelete(index)}
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