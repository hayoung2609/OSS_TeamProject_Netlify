// src/pages/AddRecipePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddRecipePage() {
    const [recipe, setRecipe] = useState({
        recipeName: '',
        tip: '',
        category: '',
        cookingMethod: '',
        calorie: '',
        ingredients: '',
        recipeImage: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_API_URL, recipe);
            alert('레시피가 성공적으로 등록되었습니다.');
            navigate('/');
        } catch (error) {
            console.error("레시피 등록에 실패했습니다.", error);
            alert('레시피 등록에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">새로운 레시피 추가</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="recipeName" value={recipe.recipeName} onChange={handleChange} placeholder="레시피 이름" className="w-full p-3 border rounded-md" required />
                <input type="text" name="tip" value={recipe.tip} onChange={handleChange} placeholder="간단한 설명 (Tip)" className="w-full p-3 border rounded-md" />
                <input type="text" name="category" value={recipe.category} onChange={handleChange} placeholder="카테고리 (예: 한식)" className="w-full p-3 border rounded-md" />
                <input type="text" name="cookingMethod" value={recipe.cookingMethod} onChange={handleChange} placeholder="요리 방법 (예: 볶음)" className="w-full p-3 border rounded-md" />
                <input type="text" name="calorie" value={recipe.calorie} onChange={handleChange} placeholder="칼로리 (예: 300kcal)" className="w-full p-3 border rounded-md" />
                <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="재료 (쉼표로 구분)" className="w-full p-3 border rounded-md" rows="3"></textarea>
                <input type="text" name="recipeImage" value={recipe.recipeImage} onChange={handleChange} placeholder="레시피 이미지 URL" className="w-full p-3 border rounded-md" />
                <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition-colors">레시피 추가</button>
            </form>
        </div>
    );
}

export default AddRecipePage;