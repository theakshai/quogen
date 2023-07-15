import React from "react";
import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  services: Yup.array().of(
    Yup.object().shape({
      service: Yup.string().required("Service name is required"),
      count: Yup.number()
        .typeError("Count must be a number")
        .positive("Count must be a positive number")
        .required("Count is required"),
    })
  ),
});

const MyForm = ({ initialValues }) => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  let { services } = initialValues;
  console.log(services);
  console.log(initialValues);

  return (
    <Formik
      initialValues={services}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="services">
            {({ push, remove }) => (
              <div>
                {values.services.map((_, index) => (
                  <div key={index}>
                    <div className="flex justify-evenly flex-wrap p-4 m-2">
                      <label
                        htmlFor={`services.${index}.service`}
                        className="font-lcSac text-qwhite block text-xl"
                      >
                        Service
                      </label>
                      <Field
                        name={`services.${index}.service`}
                        placeholder="Service"
                        className="mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                      />
                      <ErrorMessage
                        name={`services.${index}.service`}
                        component="div"
                        className="error"
                      />

                      <label
                        htmlFor={`services.${index}.count`}
                        className="font-lcSac text-qwhite block text-xl"
                      >
                        Count
                      </label>
                      <Field
                        name={`services.${index}.count`}
                        type="number"
                        placeholder="Count"
                        className="mt-2 font-euclidRegular text-qwhite bg-qblue block mb-4 w-80 h-10 p-2 outline-none border border-qwhite"
                      />
                      <ErrorMessage
                        name={`services.${index}.count`}
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ service: "", count: "" })}
                >
                  Add Service
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
