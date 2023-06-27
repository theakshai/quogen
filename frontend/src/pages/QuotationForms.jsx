import  React, { Fragment } from 'react';
import { useFormik } from 'formik'; 

const QuotationForms = () => {
    const formik = useFormik({
        initialValues : {
            name:'',
            address:'',
        }
    })
    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <input/>
            </form>

        </Fragment>
    )
} 

export default QuotationForms;