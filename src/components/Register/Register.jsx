import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let navigate = useNavigate();

  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  async function submitRegister(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      setError("");
      navigate("/login");
    }

    console.log(data);
  }

  const validationSchema = Yup.object({
    name: Yup.string("name must be in letters")
      .required("name is required")
      .min(3, "min length is 2 chars")
      .max(8, "max length is 8 chars")
      .matches(/^[A-Z]/, "name must start with capital char"),
    email: Yup.string()
      .required("email is required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <div className="container">
        <div className="w-75 mx-auto my-4">
          <h3>Register Now :</h3>
          <form onSubmit={formik.handleSubmit} className="m-75 mx-auto my-4">
            {error ? (
              <p className="alert alert-danger text-center">{error}</p>
            ) : (
              ""
            )}

            <label htmlFor="name">name :</label>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />

            {formik.errors.name && formik.touched.name ? (
              <p className="alert alert-danger">{formik.errors.name}</p>
            ) : (
              ""
            )}

            <label htmlFor="email">email :</label>
            <input
              type="email"
              className="form-control mb-2"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />

            {formik.errors.email && formik.touched.email ? (
              <p className="alert alert-danger">{formik.errors.email}</p>
            ) : (
              ""
            )}

            <label htmlFor="password">password :</label>
            <input
              type="password"
              className="form-control mb-2"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />

            {formik.errors.password && formik.touched.password ? (
              <p className="alert alert-danger">{formik.errors.password}</p>
            ) : (
              ""
            )}

            <label htmlFor="rePassword">confirm password :</label>
            <input
              type="password"
              className="form-control mb-2"
              id="rePassword"
              name="rePassword"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
            />

            {formik.errors.rePassword && formik.touched.rePassword ? (
              <p className="alert alert-danger">{formik.errors.rePassword}</p>
            ) : (
              ""
            )}

            <label htmlFor="phone">phone :</label>
            <input
              type="tel"
              className="form-control mb-2"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />

            {formik.errors.phone && formik.touched.phone ? (
              <p className="alert alert-danger">{formik.errors.phone}</p>
            ) : (
              ""
            )}

            {isLoading ? (
              <button className="btn bg-main text-white ms-auto d-block">
                <i className="fa-solid fa-spin fa-spinner"></i>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className="btn bg-main text-white  ms-auto d-block"
              >
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
