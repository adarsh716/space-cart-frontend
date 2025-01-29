import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import { resetPasswordRequestAsync, selectMailSent } from '../authSlice';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
export default function ForgotPassword() {

 const mailSent = useSelector(selectMailSent);
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <>
      <div style={{ marginLeft: "330px", marginTop: "-50px",height:"100dvh" }} >
        <MDBContainer className="my-5 gradient-form">

          <MDBRow>
            <MDBCol col='6' className="text-center mb-5 ml-20 ml-20">
              <div className="text-center p-3 my-5 ml-20 ml-20 d-flex flex-column w-50">

                <p>Please enter your email</p>
                <form
                  noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordRequestAsync(data.email))
              
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
                      type="email" />
                    {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {mailSent && (
                  <p className="text-green-500">Mail Sent</p>
                )}
                  </div>
                    <div className="text-center pt-1 mb-5 pb-1">
                      <MDBBtn type="submit" className=" w-100 gradient-custom-2" style={{color:"white",backgroundColor:"black"}}>SEND EMAIL</MDBBtn>
                    </div>
                </form>

                <div className="d-flex flex-row align-items-center justify-content-center pb-4 -mb-10">
                  <p className="mb-0">Send back to{" "}</p>
                  <Link to="/login">
                    <MDBBtn outline className='mx-2' color='danger' style={{color:"white",backgroundColor:"black"}}>
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