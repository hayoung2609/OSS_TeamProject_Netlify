import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Box, Typography, TextField, Button, Link, Alert } from '@mui/material';

function SignUpPage() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Sign up attempt with:', data);
        alert('회원가입 되었습니다! (실제 등록 없음)');
        navigate('/login');
    };

    const topError = errors[Object.keys(errors)[0]]?.message;

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                    회원가입
                </Typography>
                {/* 상단 에러 메시지 (MUI Alert 사용) */}
                {topError && <Alert severity="error" sx={{ width: '100%', mt: 2, mb: 1 }}>{topError}</Alert>}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="사용자 이름"
                        autoComplete="username"
                        autoFocus
                        {...register("username", { required: "사용자 이름은 필수입니다." })}
                        error={!!errors.username}
                        helperText={errors.username?.message} // 필드별 에러 메시지는 helperText로
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일 주소"
                        autoComplete="email"
                        {...register("email", {
                            required: "이메일 주소는 필수입니다.",
                            pattern: { value: /^\S+@\S+$/i, message: "올바른 이메일 형식이 아닙니다." }
                        })}
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
                        autoComplete="new-password"
                        {...register("password", {
                            required: "비밀번호는 필수입니다.",
                            minLength: { value: 6, message: "비밀번호는 6자 이상이어야 합니다." }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="비밀번호 확인"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        {...register("confirmPassword", {
                            required: "비밀번호 확인은 필수입니다.",
                            validate: (value) => value === getValues("password") || "비밀번호가 일치하지 않습니다."
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#22c55e', '&:hover': { backgroundColor: '#16a34a' } }}
                    >
                        가입하기
                    </Button>
                    <Typography variant="body2" align="center">
                        이미 계정이 있으신가요?{' '}
                        <Link component={RouterLink} to="/login" variant="body2" sx={{ color: '#ca8a04', '&:hover': { color: '#eab308' } }}>
                            로그인
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUpPage;