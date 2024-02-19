import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from "../../Context/userToken";

export default function Login() {
  let { setIsLogin } = useContext(userToken);

  let navigate = useNavigate();

  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  async function submitLogin(values) {
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setIsLoading(false);
      setError("");
      localStorage.setItem("userToken", data.token);
      setIsLogin(data.token);
      navigate("/");
    }

    console.log(data);
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <div className="container">
        <div className="w-75 mx-auto my-4">
          <h3>Login Now :</h3>
          <form onSubmit={formik.handleSubmit} className="m-75 mx-auto my-4">
            {error ? (
              <p className="alert alert-danger text-center">{error}</p>
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
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
