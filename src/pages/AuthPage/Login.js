import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './auth.css';
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import AuthModal from '../../components/CartMessage/AuthMessage';
import { STATUS } from '../../utils/status';
import { autoLoginUser, getAuthStatus, getUserError, loginUser, setAuthStatusOff,getLoginUrl,setLoginUrlOff } from '../../store/userSlice';

const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const authStatus = useSelector(getAuthStatus);
    const loginUrl = useSelector(getLoginUrl);
    const authError = useSelector(getUserError);
    const isLoading = authStatus === STATUS.LOADING;


    useEffect(() => {
        if(authStatus){
            setTimeout(() => {
                dispatch(setAuthStatusOff());
            }, 4000);
        }
    },[authStatus]);


    useEffect(() => {
        if(loginUrl){
            dispatch(setLoginUrlOff());
            navigate('/')
        }
    });

    useEffect(() => {
        setIsDisabled(email.trim() === '' || password.trim() === '');
    }, [email, password]);

    const handleEmailChange = (e) => {
        const text = e.target.value;
        setEmail(text);
    };

    const handlePasswordChange = (e) => {
        const text = e.target.value;
        setPassword(text);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const submitHandler = async () => {
        if (isLoading) return;

        let isValid = true;

        if (!email || !isValidEmail(email)) {
            setIsEmailValid('Enter a valid email');
            isValid = false;
        } else {
            setIsEmailValid('');
        }

        if (!password || password.length < 6) {
            setIsPasswordValid('Password must be at least 6 characters');
            isValid = false;
        } else {
            setIsPasswordValid('');
        }

        if (!isValid) return;

        await dispatch(loginUser({ email, password }));
    };



    const signupHandler = () => {
        navigate('/signup')
    }

    return (
        <div className='login'>
            {authStatus === 'FAILED' && <AuthModal message={authError} />}
            <div className="container">
                <div className="innerContainer">

                    <h2 className="title" style={{ marginBottom: '30px' }}>Log In </h2>

                    <input
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <p className="error">{isEmailValid}</p>

                    <input
                        type="password"
                        className="input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <p className="error">{isPasswordValid}</p>

                    <button
                        className={`button `}
                        disabled={isDisabled}
                        onClick={submitHandler}
                    >
                        {isLoading ? (
                            <Spinner
                                size={10}
                                color="#fff"
                                className="loader"
                                style={{ color: '#fff', fill: '#fff', stroke: '#fff' }}
                            />
                        ) : 'Continue'}
                    </button>

                    <div className="termsText">
                        Click the link to signup if you do not have an account<br></br> <span className="link" onClick={signupHandler}>Signup</span>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;

