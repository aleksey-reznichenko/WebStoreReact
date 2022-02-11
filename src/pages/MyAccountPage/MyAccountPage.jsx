import React from 'react';
import {Container, Typography, useMediaQuery} from "@mui/material";
import {useState} from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import Redirect from "react-router-dom/es/Redirect";
import Link from "react-router-dom/es/Link";
import {connect} from "react-redux";
import {actionFullLogin, actionFullRegister} from "../../actions/ActionLogin";
import {actionClearPromise} from "../../reducers/PromiseReducer";
import {Form} from "./Form";

const MyAccountPage = ({auth, promise, user, onLogin, onRegister, onClear}) => {
    const matches = useMediaQuery('(max-width:899px)')
    const [status, setStatus] = useState('login')

    if (auth?.payload && Object.keys(user).length !== 0){
        onClear('login');
        onClear('register');
    }

    return (
        <>
            <Breadcrumb links={['my account']}/>
            <main
                style={{
                    backgroundColor: "#f3f3f3",
                    padding: matches ? "20px 0" : "50px 0",
                    minHeight:'300px'
                }}
            >
                <Container maxWidth="sm">
                    {(auth?.payload && Object.keys(user).length !== 0) ?
                        <Redirect to={'/profile'}/>
                        :
                        status === 'login' ?
                            <Form
                                title={'LOGIN'}
                                target={'register'}
                                onClickEvent={onLogin}
                                setStatus={value => setStatus(value)}
                                children={
                                    <>
                                        {promise?.login?.status === "RESOLVED" &&
                                            <Typography
                                                variant='body2'
                                                color='red'
                                                marginBottom='20px'
                                            >
                                                This user does not exist
                                            </Typography>
                                        }
                                    </>
                                }
                            />
                            :
                            <Form
                                title={'REGISTER'}
                                target={'login'}
                                onClickEvent={onRegister}
                                setStatus={value => setStatus(value)}
                                children={
                                    <>
                                        <Typography
                                            variant='body2'
                                            color='#616161'
                                            textAlign='justify'
                                            marginBottom='40px'
                                        >
                                            Your personal data will be used to support your experience throughout
                                            this website, to manage access to your account, and for other purposes
                                            described in our
                                            <Link
                                                style={{textDecoration: 'none'}}
                                                to='/privacy-policy'
                                            >
                                                {' privacy policy'}
                                            </Link>
                                            .
                                        </Typography>
                                        {promise?.register?.status === "RESOLVED" &&
                                            <Typography
                                                variant='body2'
                                                color='red'
                                                marginBottom='20px'
                                            >
                                                Such user already exists
                                            </Typography>
                                        }
                                    </>
                                }
                            />
                    }
                </Container>
            </main>
        </>
    )
}

const CLoginForm = connect(state => ({
        auth: state.auth,
        promise: state.promise,
        user: state.user}),
    {
        onLogin: actionFullLogin,
        onRegister: actionFullRegister,
        onClear: actionClearPromise})
(MyAccountPage)

export default CLoginForm
