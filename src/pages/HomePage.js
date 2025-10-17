import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RandomRecipe from '../components/RandomRecipe';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

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
        <>
            {randomRecipe && <RandomRecipe recipe={randomRecipe} onClick={() => handleCardClick(randomRecipe.id)} />}
            
            <div className="text-center mb-12">
                <button 
                    onClick={recommendRandomRecipe} 
                    className="bg-yellow-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:-translate-y-1">
                    다른 레시피 추천받기!
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
        </>
    );
}

export default HomePage;