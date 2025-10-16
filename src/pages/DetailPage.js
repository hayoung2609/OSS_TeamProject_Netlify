import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { processData } from '../api/data';
import axios from 'axios';

function DetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const apiUrl = `${process.env.REACT_APP_MOCK_API_URL}/${id}`;
                const response = await axios.get(apiUrl);
                const processed = processData(response.data);
                
                setRecipe(processed);

            } catch (error) {
                console.error("레시피 상세 정보를 불러오는 데 실패했습니다.", error);
                setRecipe(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl font-semibold text-gray-600">
                    🍳 레시피를 불러오는 중...
                </div>
            </div>
        );
    }
    
    if (!recipe) {
        return <div className="text-center text-xl text-gray-600">레시피를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">{recipe.recipeName}</h1>
            <div className="flex items-center gap-4 my-3 text-gray-600 flex-wrap">
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.category}</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.cookingMethod}</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.calorie} kcal</span>
            </div>
            <img 
                src={recipe.recipeImage} 
                alt={recipe.recipeName} 
                className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md my-6"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x400/F7F7F7/CCC?text=Image\nNot\nFound' }}
            />
            
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2 border-l-4 border-yellow-400 pl-4">📋 재료</h2>
                    <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2 border-l-4 border-yellow-400 pl-4">💡 저염 조리법 Tip!</h2>
                    <p className="text-gray-700">{recipe.tip}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;