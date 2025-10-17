import React from 'react';

const RandomRecipe = ({ recipe, onClick }) => {
    if (!recipe) return null;

    return (
        <div 
            className="mb-8 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl text-white cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={onClick}
        >
            <h2 className="text-3xl font-bold mb-2">오늘의 추천 레시피!</h2>
            <p className="text-xl">{recipe.recipeName}</p>
            <p className="mt-2 text-yellow-200">{recipe.tip}</p>
        </div>
    );
};

export default RandomRecipe;