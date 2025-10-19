// src/pages/HomePage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import RandomRecipe from '../components/RandomRecipe'; // RandomRecipe 컴포넌트 임포트 확인

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [sortOrder, setSortOrder] = useState('latest');

    // --- 검색어 상태 추가 ---
    const [searchTerm, setSearchTerm] = useState('');
    // --- --- --- --- ---

    useEffect(() => {
        // ... (fetchAndSetRecipes 로직은 동일) ...
        const fetchAndSetRecipes = async () => {
            setLoading(true);
            try {
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(apiUrl);
                const initialRecipes = response.data.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                setRecipes(initialRecipes);
                if (initialRecipes.length > 0) {
                    setRandomRecipe(initialRecipes[Math.floor(Math.random() * initialRecipes.length)]);
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
    // --- 검색어 변경 핸들러 ---
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    // --- --- --- --- --- ---

    // --- 정렬 및 필터링된 레시피 목록 계산 ---
    const filteredAndSortedRecipes = useMemo(() => {
        // 1. 검색어 필터링
        const filtered = recipes.filter(recipe =>
            recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // 2. 정렬 적용
        let sorted = [...filtered]; // 필터링된 배열 복사
        switch (sortOrder) {
            case 'popularity':
                 // 임시 정렬 (실제 views 필드 필요)
                 sorted.sort((a, b) => parseInt(b.id) * 2 - parseInt(a.id) * 2);
                break;
            case 'rating':
                 // 임시 정렬 (실제 averageRating 필드 필요)
                 sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
                break;
            case 'reviews':
                 // 임시 정렬 (실제 comments 필드 필요)
                 sorted.sort((a, b) => parseInt(a.id) * 2 - parseInt(b.id) * 2);
                break;
            case 'latest':
            default:
                sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                break;
        }
        return sorted;
    }, [recipes, sortOrder, searchTerm]); // searchTerm 추가
    // --- --- --- --- --- --- --- --- --- ---

    if (loading) { /* ... 로딩 UI ... */ }

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
                    다른 레시피 추천!
                </button>
                <button
                    onClick={() => navigate('/add-recipe')}
                    className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1">
                    레시피 추가
                </button>
            </div>

            {/* --- 레시피 목록 섹션 --- */}
            <div>
                 <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-700 border-l-4 border-yellow-400 pl-4">
                        전체 레시피 목록
                    </h2>
                    <div className="flex gap-4 w-full sm:w-auto">
                        {/* --- 검색 입력 필드 추가 --- */}
                        <input
                            type="text"
                            placeholder="레시피 이름 검색..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 flex-grow sm:flex-grow-0"
                        />
                        {/* --- --- --- --- --- --- */}

                        {/* --- 정렬 드롭다운 --- */}
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        >
                            <option value="latest">최신순</option>
                            <option value="popularity">인기순</option>
                            <option value="rating">평점순</option>
                            <option value="reviews">리뷰 많은 순</option>
                        </select>
                         {/* --- --- --- --- --- */}
                    </div>
                 </div>

                 {/* 필터링 및 정렬된 목록 표시 */}
                 {filteredAndSortedRecipes.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedRecipes.map(recipe => (
                            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => handleCardClick(recipe.id)} />
                        ))}
                    </div>
                 ) : (
                     <p className="text-center text-gray-500 mt-8">
                         {searchTerm ? `"${searchTerm}"에 대한 검색 결과가 없습니다.` : "표시할 레시피가 없습니다."}
                     </p>
                 )}
            </div>
            {/* --- --- --- --- --- */}
        </div>
    );
}

export default HomePage;