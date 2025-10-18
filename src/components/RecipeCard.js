// src/components/RecipeCard.js
import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={onClick}
        >
            <img 
                src={recipe.recipeImage} 
                alt={recipe.recipeName} 
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/F7F7F7/CCC?text=Image\\nNot\\nFound' }}
            />
            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-gray-800">{recipe.recipeName}</h3>
                <p className="text-sm text-gray-500 mt-1">{recipe.category} | {recipe.cookingMethod}</p>
            </div>
        </div>
    );
};

export default RecipeCard;