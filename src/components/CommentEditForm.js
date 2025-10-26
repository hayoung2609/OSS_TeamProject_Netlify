import React from 'react';
import { useForm } from 'react-hook-form';

function CommentEditForm({ currentContent, onSave, onCancel }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            content: currentContent
        }
    });

    return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-2">
            <div>
                <textarea
                    {...register("content", { 
                        required: "댓글 내용은 필수입니다.",
                        maxLength: { value: 300, message: "댓글은 300자 이내로 입력해주세요." }
                    })}
                    className={`w-full p-2 border rounded-md text-sm ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
                    rows="3"
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
            </div>
            <div className="flex gap-2 justify-end">
                <button
                    type="submit"
                    className="bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded hover:bg-green-600 transition-colors"
                >
                    저장
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-400 text-white text-xs font-semibold py-1 px-3 rounded hover:bg-gray-500 transition-colors"
                >
                    취소
                </button>
            </div>
        </form>
    );
}

export default CommentEditForm;