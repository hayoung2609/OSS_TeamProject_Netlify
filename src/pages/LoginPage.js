import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material'; // MUI 컴포넌트 임포트

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Login attempt with:', data);
        alert('로그인 되었습니다! (실제 인증 없음)');
        navigate('/');
    };

    return (
        // Tailwind 대신 MUI Container와 Box로 레이아웃 구성
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white', // 배경색
                    padding: 4, // 패딩
                    borderRadius: 3, // 둥근 모서리
                    boxShadow: 3, // 그림자
                }}
            >
                {/* h1 대신 Typography */}
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    로그인
                </Typography>
                {/* form에 handleSubmit 연결 */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                    {/* input 대신 TextField */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        autoComplete="email"
                        autoFocus
                        // react-hook-form 연동 + 에러 처리
                        {...register("email", { required: "이메일 주소는 필수입니다." })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", { required: "비밀번호는 필수입니다." })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    {/* button 대신 Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained" // MUI 기본 스타일 버튼
                        sx={{ mt: 3, mb: 2, backgroundColor: '#fbbf24', '&:hover': { backgroundColor: '#f59e0b' } }} // Tailwind 색상 유사하게 적용
                    >
                        로그인
                    </Button>
                    {/* react-router Link 대신 MUI Link 사용 (RouterLink 연결) */}
                    <Typography variant="body2" align="center">
                        계정이 없으신가요?{' '}
                        <Link component={RouterLink} to="/signup" variant="body2" sx={{ color: '#16a34a', '&:hover': { color: '#22c55e' } }}>
                            회원가입
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;