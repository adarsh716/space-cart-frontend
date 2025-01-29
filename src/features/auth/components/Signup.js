import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div style={{ margin: "0 auto", maxWidth: "1200px", paddingTop: "50px" }}>
        <MDBContainer className="my-5 gradient-form">

          <MDBRow>
          <MDBCol col='6' className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "white" }}>
              <img 
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
                style={{ width: '300px' }}
              />
            </MDBCol>

            <MDBCol col='6' className="p-5">  
              <div className="text-center mb-5">
                  <h4 className="mt-1 mb-5 pb-1">We are The Space Cart Team</h4>
                <p>Please create a new account</p>
                <form
                  noValidate
                  className="space-y-6"
                  onSubmit={handleSubmit((data) => {
                    dispatch(
                      createUserAsync({
                        email: data.email,
                        password: data.password,
                        addresses: [],
                        role: 'user',
                        name: data.name,
                        username: data.username
                      })
                    );
                    console.log(data);
                  })} 
                >
                  <div>
                    <MDBInput wrapperClass='mb-4' label='Name' id="name"
                      {...register('name', {
                        required: 'name is required',
                        pattern: {
                          value: /^[a-zA-Z\s'-]+$/g,
                          message: 'email not valid',
                        },
                      })}
                      type="name" />
                    {errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <MDBInput wrapperClass='mb-4' label='Username' id="usernname"
                      {...register('username', {
                        required: 'username is required',
                        pattern: {
                          message: 'username is not valid',
                        },
                      })}
                      type="username" />
                    {errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <MDBInput wrapperClass='mb-4' label='Email address' id="email"
                      {...register('email', {
                        required: 'email is required',
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: 'email not valid',
                        },
                      })}
                      type="email" />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <div>
                      <MDBInput wrapperClass='mb-4' label='Password' id="password"
                        {...register('password', {
                          required: 'password is required',
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                            message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                          },
                        })}
                        type="password" />
                      {errors.password && (
                        <p className="text-red-500">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div>
                      <MDBInput wrapperClass='mb-4' label='Password' 
                        id="confirmPassword"
                        {...register('confirmPassword', {
                          required: 'confirm password is required',
                          validate: (value, formValues) =>
                            value === formValues.password || 'password not matching',
                        })}
                        type="password" />
                      {errors.confirmPassword && (
                        <p className="text-red-500">
                          {errors.confirmPassword.message}
                        </p>
                      )}

                    </div>
                    <div className="text-center pt-1 mb-5 pb-1">
                      <MDBBtn type="submit" className=" w-100 gradient-custom-2" style={{ backgroundColor: "#000", color: "#fff" }}>Sign Up</MDBBtn>
                    </div>
                  </div>
                </form>

                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Already have an account?</p>
                  <Link to="/login">
                    <MDBBtn outline className='mx-2' color='danger' style={{ color: "#000", borderColor: "#000" }}>
                      LOGIN
                    </MDBBtn>
                  </Link>
                </div>

              </div>

            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </div>
    </>
  );
}