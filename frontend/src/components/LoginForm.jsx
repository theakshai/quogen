import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie'
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = () => {

    const[cookies,setCookies] = useCookies();

    const formik = useFormik(
        {
            initialValues: {
                email:'',
                password:'',
            },
            validationSchema: Yup.object({
                email: Yup.string().email("Invalid Email Address").required('Required'),
                password: Yup.string()
                .min(8, "Minimum be 8 characters")
                .max(12, "Maximum be 12 characters")
                .required("Required"),
            }),
            onSubmit: values => {
                const payload = {
                    "email": values.email,
                    "password": values.password,
                }
                request(payload)
            },
        }
    );



    const request = (a) => {
        axios.post("http://localhost:5146/api/login", a)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    } 

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
                 {formik.touched.email && formik.errors.email ? (
         <div className='font-lcSac text-qwhite'>{formik.errors.email}</div>
       ) : null}
 
                <input
                 id="password"
                 name="password"
                 type="password"
                 placeholder="Password"
                 onChange={formik.handleChange}
                 value={formik.values.password}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
                 {formik.touched.password && formik.errors.password ? (
         <div className='font-lcSac text-qwhite'>{formik.errors.password}</div>
       ) : null}
            <button type="submit" disabled={formik.isSubmitting} className='border border-qwhite w-60 h-10 font-lcSac ml-10 text-qwhite rounded-sm'>Submit</button>
            </form>
            </div>
    )
}

export default LoginForm; 