// src/pages/EditRecipePage.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function EditRecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
                reset(response.data);
            } catch (error) {
                console.error("레시피 정보를 불러오는 데 실패했습니다.", error);
            }
        };
        fetchRecipe();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/${id}`, data);
            alert('레시피가 성공적으로 수정되었습니다.');
            navigate(`/recipe/${id}`);
        } catch (error) {
            console.error("레시피 수정에 실패했습니다.", error);
            alert('레시피 수정에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">레시피 수정</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div>
                    <input
                        type="text"
                        placeholder="레시피 이름"
                        className={`w-full p-3 border rounded-md ${errors.recipeName ? 'border-red-500' : ''}`}
                        {...register("recipeName", { required: "레시피 이름은 필수입니다." })}
                    />
                    {errors.recipeName && <p className="text-red-500 text-xs mt-1">{errors.recipeName.message}</p>}
                </div>

                <input type="text" placeholder="간단한 설명 (Tip)" className="w-full p-3 border rounded-md" {...register("tip")} />

                <div>
                    <input
                        type="text"
                        placeholder="카테고리 (예: 한식)"
                        className={`w-full p-3 border rounded-md ${errors.category ? 'border-red-500' : ''}`}
                        {...register("category", { required: "카테고리는 필수입니다." })}
                    />
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                </div>

                <input type="text" placeholder="요리 방법 (예: 볶음)" className="w-full p-3 border rounded-md" {...register("cookingMethod")} />
                
                <input type="text" placeholder="칼로리 (예: 300kcal)" className="w-full p-3 border rounded-md" {...register("calorie")} />

                <div>
                    <textarea
                        placeholder="재료 (쉼표로 구분)"
                        className={`w-full p-3 border rounded-md ${errors.ingredients ? 'border-red-500' : ''}`}
                        rows="3"
                        {...register("ingredients", { required: "재료는 필수입니다." })}
                    ></textarea>
                    {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients.message}</p>}
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="레시피 이미지 URL"
                        className={`w-full p-3 border rounded-md ${errors.recipeImage ? 'border-red-500' : ''}`}
                        {...register("recipeImage", { 
                            required: "이미지 URL은 필수입니다.",
                            pattern: {
                                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))(?:[?#].*)?$/i,
                                message: "올바른 이미지 URL 형식이 아닙니다."
                            }
                        })}
                    />
                    {errors.recipeImage && <p className="text-red-500 text-xs mt-1">{errors.recipeImage.message}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition-colors">수정 완료</button>
            </form>
        </div>
    );
}

export default EditRecipePage;