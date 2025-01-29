import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { resetPasswordAsync, selectError, selectPasswordReset } from '../authSlice';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

export default function ResetPassword() {

  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError)
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token')
  const email = query.get('email')

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  console.log(email, token)

  return (
  <>
    {(email && token) ? <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div style={{ marginLeft: "330px", marginTop: "-50px" }} >
        <MDBContainer className="my-5 gradient-form">

          <MDBRow>
            <MDBCol col='6' className="text-center mb-5 ml-20 ml-20">
              <div className="text-center p-3 my-5 ml-20 ml-20 d-flex flex-column w-50">
                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: '185px', marginLeft: '130px' }} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">We are The Space Cart Team</h4>
                </div>

                <p>Please Enter New Password</p>
                <form
                  noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordAsync({email, token, password:data.password}))
              
            })}
                  className="space-y-6"
                >
                  <div>
                    <MDBInput wrapperClass='mb-4' label='Email address' id="password"
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
                      <div>
                        <MDBInput wrapperClass='mb-4' label='Password' id="confirmPassword"
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
                {passwordReset && (
                  <p className="text-green-500">Password Reset</p>
                )}
                {error && (
                  <p className="text-red-500">{error}</p>
                )}
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1">
                      <MDBBtn type="submit" className=" w-100 gradient-custom-2" style={{background:"linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}>RESET PASSWORD</MDBBtn>
                    </div>
                </form>

                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Send back to {" "}</p>
                  <Link to="/login">
                    <MDBBtn outline className='mx-2' color='danger' style={{color:"linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"}}>
                      LOGIN
                    </MDBBtn>
                  </Link>
                </div>

              </div>

            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </div>
    </div>:<p>Incorrect Link</p>}
  </>
      
  
  );
}

