import React, { Fragment } from 'react';
import { useFormik } from 'formik';

const SignUpForm = () => {
    const formik = useFormik(
        {
            initialValues: {
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                designation:'',
            },
            onSubmit: values => {
                alert(JSON.stringify(values));
            },
        }
    );

    return (
            <div>
                <p className='text-center font-lcSac text-2xl text-qwhite m-4'>Welcome to QuoGen!</p>
            <form onSubmit={formik.handleSubmit}>
                <input
                 id="firstName"
                 name="firstName"
                 type="text"
                 placeholder="First Name"
                 onChange={formik.handleChange}
                 value={formik.values.firstName}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
                <input
                 id="lastName"
                 name="lastName"
                 type="text"
                 placeholder="Last Name"
                 onChange={formik.handleChange}
                 value={formik.values.lastName}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
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
                 id="designation"
                 name="designation"
                 type="text"
                 placeholder="Designation: Ex: Sales Manager, HR etc.,"
                 onChange={formik.handleChange}
                 value={formik.values.designation}
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
            <button type="submit" className='border border-qwhite w-60 h-10 font-lcSac ml-10 text-qwhite rounded-sm'>Submit</button>
            </form>
            </div>
    )
}

export default SignUpForm; 