import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div style={{ margin: "0 auto", maxWidth: "1200px", paddingTop: "50px" }}>
        <MDBContainer className="my-5 gradient-form" style={{ backgroundColor: "white", color: "#000" }}>
          <MDBRow>
            <MDBCol col='6' className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "white" }}>
              <img 
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
                style={{ width: '300px' }}
              />
            </MDBCol>

            {/* Right Column: Form */}
            <MDBCol col='6' className="p-5">
              <div className="text-center mb-5">
                <h4 className="mt-1 mb-5 pb-1">We are The Space Cart Team</h4>
                <p>Please login to your account</p>
              </div>
              
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  dispatch(loginUserAsync({ email: data.email, password: data.password }));
                })}
                className="space-y-6"
              >
                <div>
                  <MDBInput wrapperClass='mb-4' label='Email address' id="email"
                    {...register('email', {
                      required: 'email is required',
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'email not valid',
                      },
                    })}
                    type="email"
                    style={{ backgroundColor: "#f8f8f8", color: "#000" }}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ marginLeft: "auto", color: "#000" }}>
                    <Link to="/forgot-password" className="font-semibold">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <MDBInput wrapperClass='mb-4' label='Password' id="password"
                    {...register('password', {
                      required: 'password is required',
                    })}
                    type={showPassword ? "text" : "password"}
                    style={{ backgroundColor: "#f8f8f8", color: "#000" }}
                  />
                  <span 
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#888'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  {error && <p className="text-red-500">{error || error.message}</p>}
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn type="submit" className="w-100" style={{ backgroundColor: "#000", color: "#fff" }}>
                    Login
                  </MDBBtn>
                </div>
              </form>

              <div className="d-flex flex-row align-items-center justify-content-center pb-4">
                <p className="mb-0">Don't have an account?</p>
                <Link to="/signup">
                  <MDBBtn outline className='mx-2' color='dark' style={{ color: "#000", borderColor: "#000" }}>
                    Sign Up
                  </MDBBtn>
                </Link>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
}
