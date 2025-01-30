import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useState ,useEffect} from 'react';

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    useEffect(() => {
      if (!user) {
        return;
      }
      if (user?.role !== "admin") {
        navigate("/");
      } else {
        navigate("/admin-dashboard");
      }
    }, [user]);

  return (
    <>
      <div style={{ margin: "0 auto", maxWidth: "1200px", paddingTop: "50px",height:"100dvh" }}>
        <MDBContainer className="my-5 gradient-form">
          <MDBRow>
            <MDBCol col="6" className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "white" }}>
              <img 
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
                style={{ width: '300px' }}
              />
            </MDBCol>

            <MDBCol col="6" className="p-5">  
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
                  <MDBInput wrapperClass="mb-4" label="Name" id="name"
                    {...register('name', {
                      required: 'Name is required',
                      pattern: {
                        value: /^[a-zA-Z\s'-]+$/g,
                        message: 'Invalid name format',
                      },
                    })}
                    type="text" />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                  <MDBInput wrapperClass="mb-4" label="Username" id="username"
                    {...register('username', {
                      required: 'Username is required',
                    })}
                    type="text" />
                  {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                  <MDBInput wrapperClass="mb-4" label="Email address" id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: 'Invalid email format',
                      },
                    })}
                    type="email" />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                  {/* Password Input with Toggle */}
                  <div className="position-relative">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="password"
                      {...register('password', {
                        required: 'Password is required',
                        pattern: {
                          value: /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/gm,
                          message: 'Password must be at least 8 characters long and contain uppercase, lowercase, and a number',
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                    />
                    <MDBIcon
                      far
                      icon={showPassword ? "eye-slash" : "eye"}
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}


                  <div className="text-center pt-1 mb-5 pb-1">
                    <MDBBtn type="submit" className="w-100 gradient-custom-2" style={{ backgroundColor: "#000", color: "#fff" }}>
                      Sign Up
                    </MDBBtn>
                  </div>
                </form>

                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Already have an account?</p>
                  <Link to="/login">
                    <MDBBtn outline className="mx-2" color="danger" style={{ color: "#000", borderColor: "#000" }}>
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