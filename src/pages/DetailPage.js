// src/pages/DetailPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import StarRating from '../components/StarRating'; // StarRating 임포트

function DetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState('');

    // --- 평점 관련 상태 추가 ---
    const [userRating, setUserRating] = useState(0); // 사용자가 선택한 평점 (0은 아직 평가 안 함)
    const [averageRating, setAverageRating] = useState(0); // 평균 평점
    const [ratingCount, setRatingCount] = useState(0); // 평가 참여자 수
    // --- --- --- --- --- ---

    // --- API 데이터 업데이트 함수 ---
    const updateRecipeData = useCallback(async (updatedFields) => {
        // 현재 recipe 상태가 없으면 업데이트 중단
        if (!recipe) {
            console.warn("업데이트할 레시피 데이터가 없습니다.");
            return;
        }

        try {
            // PUT 요청 시 현재 recipe 상태와 업데이트할 필드를 합쳐서 보냄
            const dataToSend = { ...recipe, ...updatedFields };
            await axios.put(`${process.env.REACT_APP_API_URL}/${id}`, dataToSend);
            console.log("MockAPI 데이터 업데이트 성공:", updatedFields);
        } catch (error) {
            console.error("MockAPI 데이터 업데이트 실패:", error);
            alert("데이터 업데이트 중 오류가 발생했습니다.");
            // 오류 발생 시 UI를 이전 상태로 되돌리는 로직 추가 가능 (선택 사항)
        }
    }, [id, recipe]); // id나 recipe 상태가 변경될 때 함수 재생성

    useEffect(() => {
        let isMounted = true; // 컴포넌트 마운트 상태 추적

        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const apiUrl = `${process.env.REACT_APP_API_URL}/${id}`;
                const response = await axios.get(apiUrl);

                if (isMounted) { // 컴포넌트가 마운트된 상태일 때만 상태 업데이트
                    const fetchedRecipe = response.data;
                    setRecipe(fetchedRecipe);
                    setComments(fetchedRecipe.comments || []);
                    setAverageRating(fetchedRecipe.averageRating || 0);
                    setRatingCount(fetchedRecipe.ratingCount || 0);
                    // setUserRating(loadUserRatingForRecipe(id)); // 실제 구현 시 필요

                    // --- 조회수 증가 로직 ---
                    const currentViews = Number(fetchedRecipe.views) || 0; // 숫자로 변환
                    const newViews = currentViews + 1;
                    // MockAPI 업데이트 요청 (비동기)
                    updateRecipeData({ views: newViews });
                    // 로컬 상태에도 반영 (즉시 반영 위함)
                    setRecipe(prev => prev ? { ...prev, views: newViews } : null);
                    // --- --- --- --- --- ---
                }

            } catch (error) {
                if (isMounted) {
                    console.error("레시피 상세 정보를 불러오는 데 실패했습니다.", error);
                    setRecipe(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRecipe();

        // 클린업 함수: 컴포넌트 언마운트 시 isMounted를 false로 설정
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]); // updateRecipeData는 의존성에서 제외

    const handleDelete = async () => { /* ... 기존 코드 ... */ };

    const handleAddComment = (newComment) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        updateRecipeData({ comments: updatedComments }); // API 업데이트
    };

    const handleDeleteComment = (indexToDelete) => {
        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
            const updatedComments = comments.filter((_, index) => index !== indexToDelete);
            setComments(updatedComments);
            updateRecipeData({ comments: updatedComments }); // API 업데이트
            if (editingIndex === indexToDelete) {
                setEditingIndex(null);
                setEditText('');
            }
        }
    };

    const handleEditStart = (indexToEdit, currentContent) => {
         setEditingIndex(indexToEdit);
         setEditText(currentContent);
     };
    const handleEditChange = (event) => {
         setEditText(event.target.value);
     };

    const handleEditSave = (indexToSave) => {
        if (!editText.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        const updatedComments = comments.map((comment, index) =>
            index === indexToSave ? { ...comment, content: editText, timestamp: new Date().toISOString() } : comment
        );
        setComments(updatedComments);
        updateRecipeData({ comments: updatedComments }); // API 업데이트
        setEditingIndex(null);
        setEditText('');
    };

    const handleEditCancel = () => {
         setEditingIndex(null);
         setEditText('');
     };

    // --- 평점 제출 핸들러 수정 ---
    const handleRate = async (rating) => { // async 추가
        // 이미 로딩 중이거나 레시피 정보가 없으면 처리 중단
        if (loading || !recipe) return;

        setUserRating(rating); // 사용자가 선택한 평점 상태 업데이트

        // --- 새 평균 평점 및 참여자 수 계산 ---
        // API에서 최신 데이터를 받아와서 계산하는 것이 더 정확하지만,
        // 여기서는 현재 상태 기준으로 계산하고 업데이트합니다.
        const currentTotalRating = averageRating * ratingCount;
        const newRatingCount = ratingCount + 1; // 새 평가 추가
        const newAverageRating = (currentTotalRating + rating) / newRatingCount;
        // --- --- --- --- --- --- --- --- ---

        // 상태 즉시 업데이트 (사용자 피드백)
        setAverageRating(newAverageRating);
        setRatingCount(newRatingCount);
        // recipe 상태에도 반영 (PUT 요청 시 사용)
        setRecipe(prev => ({
            ...prev,
            averageRating: newAverageRating,
            ratingCount: newRatingCount
        }));

        alert(`${rating}점을 주셨습니다! 평점을 업데이트합니다.`);

        // MockAPI 업데이트 (계산된 새 평균 평점과 참여자 수 전달)
        // updateRecipeData 함수가 recipe 상태를 사용하므로, 상태 업데이트 후 호출
        // 약간의 딜레이를 주어 recipe 상태 업데이트가 반영될 시간을 확보 (더 나은 방법은 상태 업데이트 콜백 사용)
        setTimeout(() => {
            updateRecipeData({
                averageRating: newAverageRating,
                ratingCount: newRatingCount
            });
        }, 0);
    };
    // --- --- --- --- --- ---

    if (loading && !recipe) { // 초기 로딩 상태
        return (
             <div className="flex justify-center items-center h-screen">
                <div className="text-2xl font-semibold text-gray-600">
                    🍳 레시피를 불러오는 중...
                </div>
            </div>
        );
     }
    if (!recipe) { // 로딩 후에도 recipe가 null이면 (에러 발생 등)
         return <div className="text-center text-xl text-gray-600 mt-10">레시피를 찾을 수 없습니다.</div>;
     }

    // 레시피 데이터 로드 성공 시 렌더링
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* --- 레시피 상세 정보 --- */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">{recipe.recipeName}</h1>
                    {/* --- 조회수 표시 --- */}
                    <p className="text-sm text-gray-500 mb-2">조회수: {recipe.views || 0}</p>
                    {/* --- --- --- --- */}
                    <div className="flex items-center gap-4 my-3 text-gray-600 flex-wrap">
                        {/* ... 카테고리, 방법, 칼로리 ... */}
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.category}</span>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.cookingMethod}</span>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">{recipe.calorie} kcal</span>
                        {/* --- 평균 평점 표시 --- */}
                        <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-400">★</span>
                            <span>{averageRating.toFixed(1)}</span> {/* 상태 변수 사용 */}
                            <span className="text-gray-400">({ratingCount}명 참여)</span> {/* 상태 변수 사용 */}
                        </div>
                        {/* --- --- --- --- */}
                    </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={() => navigate(`/recipe/${id}/edit`)}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >수정</button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors text-sm"
                    >삭제</button>
                </div>
            </div>

            {/* ... 이미지, 재료, 요리 순서, Tip ... */}
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
                                <div key={index} className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg bg-gray-50">
                                    {step.image && (
                                        <img src={step.image} alt={`Step ${step.step || index + 1}`} className="w-full sm:w-48 h-auto object-cover rounded-md shadow-sm flex-shrink-0" />
                                    )}
                                    <p className="text-gray-700 flex-grow">
                                        <span className="font-bold text-lg mr-2">{step.step || index + 1}.</span>
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
                        <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg">{recipe.tip}</p>
                    </div>
                )}
            </div>
            {/* --- --- --- --- --- */}

            <hr className="my-10 border-gray-300" />

            {/* --- 평점 남기기 섹션 --- */}
            <div className="mt-10 mb-8">
                 <h2 className="text-2xl font-bold text-gray-700 mb-4">⭐ 이 레시피 평가하기</h2>
                 <StarRating maxRating={5} currentRating={userRating} onRate={handleRate} />
                 {userRating > 0 && <p className="text-sm text-gray-600 mt-2">{userRating}점을 선택하셨습니다.</p>}
             </div>
             {/* --- --- --- --- --- */}


            {/* --- 댓글 섹션 --- */}
            <div className="mt-10">
                <h2 className="text-3xl font-bold text-gray-700 mb-6">💬 댓글</h2>
                <CommentList
                    comments={comments}
                    onDelete={handleDeleteComment}
                    onEditStart={handleEditStart}
                    onEditSave={handleEditSave}
                    onEditCancel={handleEditCancel}
                    onEditChange={handleEditChange}
                    editingIndex={editingIndex}
                    editText={editText}
                />
                {editingIndex === null && <CommentForm onSubmit={handleAddComment} />}
            </div>
            {/* --- --- --- --- */}
        </div>
    );
}

export default DetailPage;