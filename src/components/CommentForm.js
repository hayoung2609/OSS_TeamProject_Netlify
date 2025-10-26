import React from 'react';
import { useForm } from 'react-hook-form';

function CommentForm({ onSubmit }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        onSubmit(data); 
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">댓글 남기기</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="작성자 이름"
                    {...register("author", { 
                        required: "작성자 이름은 필수입니다.", 
                        maxLength: { value: 20, message: "이름은 20자 이내로 입력해주세요." }
                    })}
                    className={`w-full p-2 border rounded-md text-sm ${errors.author ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="댓글 내용을 입력하세요..."
                    {...register("content", { 
                        required: "댓글 내용은 필수입니다.",
                        maxLength: { value: 300, message: "댓글은 300자 이내로 입력해주세요." }
                    })}
                    className={`w-full p-2 border rounded-md text-sm ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                    rows="3"
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
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