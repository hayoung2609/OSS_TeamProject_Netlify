// src/pages/DetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const apiUrl = `${process.env.REACT_APP_API_URL}/${id}`;
                const response = await axios.get(apiUrl);
                setRecipe(response.data);
            } catch (error) {
                console.error("레시피 상세 정보를 불러오는 데 실패했습니다.", error);
                setRecipe(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("정말로 이 레시피를 삭제하시겠습니까?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
                alert("레시피가 삭제되었습니다.");
                navigate('/');
            } catch (error) {
                console.error("레시피 삭제에 실패했습니다.", error);
                alert("레시피 삭제에 실패했습니다.");
            }
        }
    };

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
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">{recipe.recipeName}</h1>
                    <div className="flex items-center gap-4 my-3 text-gray-600 flex-wrap">
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.category}</span>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.cookingMethod}</span>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.calorie} kcal</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => navigate(`/recipe/${id}/edit`)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">수정</button>
                    <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors">삭제</button>
                </div>
            </div>
            <img 
                src={recipe.recipeImage} 
                alt={recipe.recipeName} 
                className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md my-6"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x400/F7F7F7/CCC?text=Image\nNot\nFound' }}
            />
            
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-3 border-l-4 border-yellow-400 pl-4">📋 재료</h2>
                    <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
                </div>
                
                {recipe.manual && recipe.manual.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4 border-l-4 border-yellow-400 pl-4">📖 요리 순서</h2>
                        <div className="space-y-6">
                            {recipe.manual.map((step, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start gap-4">
                                    <img src={step.image} alt={`Step ${step.step}`} className="w-full sm:w-48 h-auto rounded-md shadow-sm" />
                                    <p className="text-gray-700">
                                        <span className="font-bold text-lg mr-2">{step.step}.</span>
                                        {step.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {recipe.tip && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-3 border-l-4 border-yellow-400 pl-4">💡 Tip!</h2>
                        <p className="text-gray-700">{recipe.tip}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailPage;