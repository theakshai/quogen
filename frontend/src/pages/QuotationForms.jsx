import  React, { Fragment } from 'react';
import { useFormik } from 'formik'; 
import Toggle from '../components/Toggle';

const QuotationForms = () => {
    const formik = useFormik({
        initialValues : {
            name:'',
            email:'',
            mobile:'',
            state:'',
            about:'',
            tc:'',
        }
    })
    return (
        <Fragment>
            <div className='flex'>
            <h1 className='font-lcSac text-qwhite text-5xl text-center m-10'>Client's Details</h1>
            <Toggle/>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex justify-evenly p-4 m-2'>
                    <div>
                <label htmlFor="name" className='font-lcSac text-qwhite block text-xl'>Client Name</label>
                <input
                id="name"
                name="name"
                type="text"
                placeholder="Client Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className='mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                />
                    </div>
                    <div>
                <label htmlFor="email" className='font-lcSac text-qwhite block text-xl'>Client Email</label>
                <input
                id="email"
                name="email"
                type="text"
                placeholder="Client Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className='font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 mt-2 outline-none border border-qwhite'
                />
                    </div>
                </div>
                <div className='flex justify-evenly p-4 m-2'>
                    <div>
                <label htmlFor="mobile" className='font-lcSac text-qwhite block text-xl'>Client Mobile</label>
                <input
                id="mobile"
                name="mobile"
                type="text"
                placeholder="Client Mobile No"
                onChange={formik.handleChange}
                value={formik.values.mobile}
                className='mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite'
                />
                    </div>
                    <div>
                <label htmlFor="state" className='font-lcSac text-qwhite block text-xl'>Client State</label>
                <input
                id="state"
                name="state"
                type="text"
                placeholder="Client State"
                onChange={formik.handleChange}
                value={formik.values.state}
                className='font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 mt-2 outline-none border border-qwhite'
                />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                <label htmlFor="about" className='block font-lcSac text-xl text-qwhite'>About </label>
                <textarea 
                name="about"
                id="about"
                cols="92"
                rows="5"
                placeholder='Ex: Write about the summary of this project'
                className='p-2 mt-2 font-euclidRegular bg-qblue border border-qwhite text-qwhite'
                />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                <label htmlFor="tc" className='block font-lcSac text-xl text-qwhite mt-4'>Terms And Condition</label>
                <textarea 
                name="tc"
                id="tc"
                cols="92"
                rows="5"
                placeholder='Ex: Write about the summary of this project'
                className='p-2 mt-2 font-euclidRegular bg-qblue border border-qwhite'
                />
                    </div>
                </div>
                <div className='flex justify-center'>
            <button type='submit' className='font-lcSac text-qwhite border border-qwhite p-2 text-xl m-2'>Create Quotation</button>
                </div>

            </form>

        </Fragment>
    )
} 

export default QuotationForms;