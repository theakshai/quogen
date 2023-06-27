import React, { Fragment } from 'react';
import SignUpForm from '../componets/SignUpForm';

const SignUp = () => {
    return (
        <Fragment>
            <p className='font-lcSac text-qwhite text-9xl p-6 mt-8  text-center'>SignUp</p>
            <div className='flex justify-around'>
                <SignUpForm/>
            </div>
        </Fragment>
    )
}

export default SignUp;