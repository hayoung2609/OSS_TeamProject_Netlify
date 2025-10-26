// src/components/RandomRecipe.js
import React from 'react';

const RandomRecipe = ({ recipe, onClick }) => {
    if (!recipe) return null;

    return (
        <div
            className="p-8 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-xl text-white cursor-pointer transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
            onClick={onClick}
        >
            <span className="absolute -top-4 -right-4 text-8xl opacity-10 transform rotate-12">🍳</span>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2">오늘의 추천 레시피!</h2>
            <p className="text-3xl font-extrabold">{recipe.recipeName}</p>
            {recipe.tip && <p className="mt-3 text-amber-100 bg-black bg-opacity-10 p-3 rounded-lg text-sm">💡 {recipe.tip}</p>}
        </div>
    );
};

export default RandomRecipe;