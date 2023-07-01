import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import Button from '../componets/Button'

const LoginForm = () => {
    const formik = useFormik(
        {
            initialValues: {
                email:'',
                password:'',
            },
            onSubmit: values => {
                alert(JSON.stringify(values));
            },
        }
    );

    return (
            <div>
                <p className='text-center font-lcSac text-2xl text-qwhite m-4'>Glad to see you again!</p>
            <form onSubmit={formik.handleSubmit}>
                <input
                 id="email"
                 name="email"
                 type="text"
                 placeholder="Email"
                 onChange={formik.handleChange}
                 value={formik.values.email}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
                <input
                 id="password"
                 name="password"
                 type="password"
                 placeholder="Password"
                 onChange={formik.handleChange}
                 value={formik.values.password}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
            <button type="submit" className='border border-qwhite w-60 h-10 font-lcSac text-qwhite rounded-sm'>Submit</button>
            </form>
            </div>
    )
}

export default LoginForm; 