// src/pages/HomePage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard'; // RecipeCard 컴포넌트를 사용합니다.

// 오늘의 추천 레시피를 위한 별도 컴포넌트
const RandomRecipe = ({ recipe, onClick }) => {
    if (!recipe) return null;

    return (
        <div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-transform duration-500 hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-500">✨ 오늘의 추천 레시피 ✨</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x300/F7F7F7/CCC?text=Image\\nNot\\nFound' }}
                />
                <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-800">{recipe.recipeName}</h3>
                    <div className="flex items-center gap-4 my-3 text-gray-600 flex-wrap">
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.category}</span>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.cookingMethod}</span>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.calorie} kcal</span>
                    </div>
                    <p className="text-gray-700 mt-2 mb-1 font-semibold">📋 재료</p>
                    <p className="text-gray-600 text-sm mb-4">{recipe.ingredients}</p>
                    <p className="text-gray-700 mt-2 mb-1 font-semibold">💡 Tip!</p>
                    <p className="text-gray-600 text-sm">{recipe.tip}</p>
                </div>
            </div>
        </div>
    );
};


function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetRecipes = async () => {
            setLoading(true);
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(apiUrl);
                setRecipes(response.data);
                if (response.data.length > 0) {
                    setRandomRecipe(response.data[Math.floor(Math.random() * response.data.length)]);
                }
            } catch (error) {
                console.error("레시피 데이터를 불러오는 데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAndSetRecipes();
    }, []);

    const recommendRandomRecipe = useCallback(() => {
        if (recipes.length > 0) {
            const randomIndex = Math.floor(Math.random() * recipes.length);
            setRandomRecipe(recipes[randomIndex]);
        }
    }, [recipes]);

    const handleCardClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl font-semibold text-gray-600">
                    🍳 맛있는 레시피를 불러오는 중...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <header className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">오늘 뭐 먹지?</h1>
                <p className="text-gray-500 mt-2">버튼을 눌러 오늘의 특별한 레시피를 추천받아보세요!</p>
            </header>

            {randomRecipe && <RandomRecipe recipe={randomRecipe} onClick={() => handleCardClick(randomRecipe.id)} />}

            <div className="text-center my-8 flex justify-center items-center gap-4">
                <button 
                    onClick={recommendRandomRecipe} 
                    className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:-translate-y-1">
                    다른 레시피 추천받기!
                </button>
                <button 
                    onClick={() => navigate('/add-recipe')} 
                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1">
                    레시피 추가하기
                </button>
            </div>

            <div>
                 <h2 className="text-2xl font-bold text-gray-700 mb-6 border-l-4 border-yellow-400 pl-4">전체 레시피 목록</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleCardClick(recipe.id)} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;