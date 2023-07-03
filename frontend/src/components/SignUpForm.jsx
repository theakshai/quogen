import React, { Fragment } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';

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
            validationSchema: Yup.object({
                firstName: Yup.string().min(2,"Mininum be 2 characters").max(50, "Maximum be 50 characters"),
                lastName: Yup.string().min(2,"Mininum be 2 characters").max(50, "Maximum be 50 characters"),
                email: Yup.string().email("Invalid Email Address").required('Required'),
                password: Yup.string()
                .min(8, "Minimum be 8 characters")
                .max(12, "Maximum be 12 characters")
                .required("Required"),
                designation: Yup.string().min(5,"Mininum be 2 characters").max(50, "Maximum be 50 characters"),
            }),
            onSubmit: values => {
                const payload = {
  "firstName": values.firstName,
  "lastName": values.lastName,
  "email": values.email,
  "designation": values.designation,
  "password": values.password,
                }
                request(payload);
            },
        }
    );

    const request = (a) => {
        axios.post("http://localhost:5146/api/signup", a)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    } 


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
                 {formik.touched.firstName && formik.errors.firstName ? (
         <div className='font-lcSac text-qwhite'>{formik.errors.firstName}</div>
       ) : null}
                <input
                 id="lastName"
                 name="lastName"
                 type="text"
                 placeholder="Last Name"
                 onChange={formik.handleChange}
                 value={formik.values.lastName}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
                 {formik.touched.lastName && formik.errors.lastName ? (
         <div className='font-lcSac text-qwhite'>{formik.errors.lastName}</div>
       ) : null}
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
                 id="designation"
                 name="designation"
                 type="text"
                 placeholder="Designation: Ex: Sales Manager, HR etc.,"
                 onChange={formik.handleChange}
                 value={formik.values.designation}
                 className='font-lcSac text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                 />
                 {formik.touched.designation && formik.errors.designation ? (
         <div className='font-lcSac text-qwhite'>{formik.errors.designation}</div>
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
            <button type="submit" className='border border-qwhite w-60 h-10 font-lcSac ml-10 text-qwhite rounded-sm'>Submit</button>
            </form>
            </div>
    )
}

export default SignUpForm; 