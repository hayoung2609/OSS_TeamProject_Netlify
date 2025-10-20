// src/pages/DetailPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import StarRating from '../components/StarRating';

function DetailPage() {
    // ... 모든 기존 로직(useState, useEffect, 핸들러 함수 등)은 그대로 유지 ...
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);

    const updateRecipeData = useCallback(async (updatedFields) => {
        if (!recipe) return;
        try {
            const dataToSend = { ...recipe, ...updatedFields };
            await axios.put(`${process.env.REACT_APP_API_URL}/${id}`, dataToSend);
        } catch (error) {
            console.error("MockAPI 업데이트 실패:", error);
        }
    }, [id, recipe]);

    useEffect(() => {
        let isMounted = true;
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
                if (isMounted) {
                    const fetchedRecipe = response.data;
                    setRecipe(fetchedRecipe);
                    setComments(fetchedRecipe.comments || []);
                    setAverageRating(fetchedRecipe.averageRating || 0);
                    setRatingCount(fetchedRecipe.ratingCount || 0);

                    const newViews = (Number(fetchedRecipe.views) || 0) + 1;
                    updateRecipeData({ views: newViews });
                    setRecipe(prev => prev ? { ...prev, views: newViews } : null);
                }
            } catch (error) {
                if (isMounted) setRecipe(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchRecipe();
        return () => { isMounted = false; };
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleDelete = () => { /* ... */ };
    const handleAddComment = (newComment) => { /* ... */ };
    const handleDeleteComment = (indexToDelete) => { /* ... */ };
    const handleEditStart = (index, content) => { /* ... */ };
    const handleEditChange = (e) => { /* ... */ };
    const handleEditSave = (index) => { /* ... */ };
    const handleEditCancel = () => { /* ... */ };
    const handleRate = async (rating) => { /* ... */ };

    if (loading && !recipe) {
        return <div className="text-center py-20 text-brand-dark font-semibold">🍳 레시피를 불러오는 중...</div>;
    }
    if (!recipe) {
        return <div className="text-center py-20 text-text-secondary">레시피를 찾을 수 없습니다.</div>;
    }

    return (
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="bg-surface p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl">
                {/* --- 헤더 섹션 --- */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">{recipe.recipeName}</h1>
                        <div className="flex items-center gap-4 flex-wrap text-text-secondary text-sm">
                            <p>조회수: {recipe.views || 0}</p>
                            <span className="bg-orange-100 text-orange-800 font-medium px-2.5 py-0.5 rounded-full">{recipe.category}</span>
                            <span className="bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded-full">{recipe.cookingMethod}</span>
                            <span className="bg-blue-100 text-blue-800 font-medium px-2.5 py-0.5 rounded-full">{recipe.calorie} kcal</span>
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span>{averageRating.toFixed(1)}</span>
                                <span>({ratingCount}명)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0 mt-4 sm:mt-0">
                        <button onClick={() => navigate(`/recipe/${id}/edit`)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">수정</button>
                        <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm">삭제</button>
                    </div>
                </div>

                {/* --- 메인 콘텐츠 (반응형 그리드) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
                    {/* --- 왼쪽 컬럼: 이미지, 재료, 팁 --- */}
                    <div className="lg:col-span-1 space-y-8">
                        <img src={recipe.recipeImage} alt={recipe.recipeName} className="w-full h-auto object-cover rounded-xl shadow-lg" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/FFF7ED/CCC?text=Image\nNot\nFound' }}/>
                        <section>
                            <h2 className="text-2xl font-bold text-text-primary mb-4">📋 재료</h2>
                            <p className="text-text-secondary whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-lg">{recipe.ingredients}</p>
                        </section>
                        {recipe.tip && (
                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-3">💡 Tip!</h2>
                                <p className="text-amber-800 bg-amber-100 p-4 rounded-lg leading-relaxed">{recipe.tip}</p>
                            </section>
                        )}
                    </div>

                    {/* --- 오른쪽 컬럼: 요리 순서 --- */}
                    <div className="lg:col-span-2">
                        {recipe.manual && recipe.manual.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-text-primary mb-6">📖 요리 순서</h2>
                                <div className="space-y-6">
                                    {recipe.manual.map((step, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <span className="flex-shrink-0 bg-brand-dark text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">{step.step || index + 1}</span>
                                            <div className="flex-grow">
                                                <p className="text-text-secondary leading-relaxed">{step.text}</p>
                                                {step.image && (
                                                    <img src={step.image} alt={`Step ${step.step || index + 1}`} className="mt-3 w-full max-w-xs object-cover rounded-lg shadow-sm" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                <hr className="my-12 border-gray-200" />

                {/* --- 평점 및 댓글 섹션 --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <section>
                         <h2 className="text-2xl font-bold text-gray-800 mb-4">⭐ 이 레시피 평가하기</h2>
                         <StarRating maxRating={5} currentRating={userRating} onRate={handleRate} />
                         {userRating > 0 && <p className="text-sm text-text-secondary mt-2">{userRating}점을 선택하셨습니다. 감사합니다!</p>}
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 댓글</h2>
                        <CommentForm onSubmit={handleAddComment} />
                        <CommentList comments={comments} onDelete={handleDeleteComment} onEditStart={handleEditStart} onEditSave={handleEditSave} onEditCancel={handleEditCancel} onEditChange={handleEditChange} editingIndex={editingIndex} editText={editText} />
                    </section>
                </div>
            </div>
        </main>
    );
}

export default DetailPage;