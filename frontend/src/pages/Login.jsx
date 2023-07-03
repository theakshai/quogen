import React, { Fragment } from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
    return (
        <Fragment>
            <p className='font-lcSac text-qwhite text-9xl p-6 mt-8  text-center'>Login</p>
            <div className='flex justify-around'>
                <LoginForm/>
            </div>
        </Fragment>
    )
}

export default Login;