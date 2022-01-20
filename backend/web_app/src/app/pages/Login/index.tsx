/**
 *
 * Login
 *
 */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageWrapper } from 'app/components/PageWrapper';
import PageBackground from 'app/components/PageBackground';
import CustomCard from 'app/components/CustomCard';
import { CustomText } from 'app/components/CustomText';
import { CustomInput } from 'app/components/CustomInput';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CustomButton from 'app/components/CustomButton';
import { useTheme } from 'styled-components';
import { FlexDiv } from 'app/components/FlexDiv';
import Separator from 'app/components/Separator';
import AppleIcon from '@material-ui/icons/Apple';
import { ReactComponent as FbIcon } from 'app/assets/fb.svg';
import { useHistory } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from 'app/assets/google.svg';
import { Error } from 'app/components/Error';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthLoading,
  selectAuthError,
} from 'app/sharedSlice/auth/slice/selectors';

interface Props {}
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must Contain 6 Characters.'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  //   'Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special  Character from @$!%*?&',
  // ),
});

export function Login() {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const apiError = useSelector(selectAuthError);

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const transparentIconButton = {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.primary}`,
    color: theme.primary,
    borderRadius: '12px',
    width: '90px',
    height: '50px',
  };
  return (
    <>
      <Helmet>
        <title>Sign in</title>
        <meta name="description" content="Niivana Login Page" />
      </Helmet>

      <PageBackground
        backgroundColor="linear-gradient(180deg, #F4F6FA 23.17%, #FFFFFF 100%);"
        alignItems="flex-start"
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          // validate={validate}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              actions.loginRequest({
                username: values.email,
                password: values.password,
              }),
            );
          }}
        >
          {formik => {
            const {
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              handleBlur,
              isValid,
              dirty,
            } = formik;
            return (
              <CustomCard
                width="441px"
                marginTop="40px"
                height="auto"
                minHeight="70vh"
                padding="40px 60px"
              >
                <CustomText
                  elementName="h1"
                  fontSize="32px"
                  textAlign="center"
                  fontWeight="700"
                >
                  Sign In
                </CustomText>
                <CustomInput
                  margin="60px 0px 10px 0px"
                  placeholder="Email Address"
                  RightElem={
                    <EmailIcon
                      style={{ color: '#8F8D86', marginRight: '5px' }}
                    />
                  }
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email ? true : false}
                />
                {errors.email && touched.email && <Error msg={errors.email} />}
                <CustomInput
                  margin="30px 0px 10px 0px"
                  placeholder="Password"
                  inputType={showPassword ? 'text' : 'password'}
                  RightElem={
                    <LockIcon
                      style={{ color: '#8F8D86', marginRight: '5px' }}
                    />
                  }
                  LeftElem={
                    // <LockIcon style={{ color: '#8F8D86', marginRight: '5px' }} />
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password ? true : false}
                  name="password"
                  id="password"
                />
                {errors.password && touched.password && (
                  <Error msg={errors.password} />
                )}
                <FlexDiv margin="10px 0px" justifyContent="flex-end">
                  <CustomButton
                    backgroundColor="transparent"
                    fontSize="14px"
                    fontWeight="600"
                    color={theme.primary}
                    onClick={() => history.push('/forgot-password')}
                  >
                    Forgot Password?
                  </CustomButton>
                </FlexDiv>

                <FlexDiv
                  margin="50px 0px 70px 0px"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  {apiError && <Error msg={apiError} />}
                  <CustomButton
                    width="100%"
                    height="50px"
                    fontSize="16px"
                    fontWeight="600"
                    borderRadius="12px"
                    letterSpacing="1px"
                    textTransform="uppercase"
                    margin="10px 0px 0px 0px"
                    // backgroundColor="#DB8057"
                    // onClick={() => history.push('/Otp')}
                    onClick={formik.handleSubmit}
                    isLoading={isLoading}
                  >
                    Sign In
                  </CustomButton>
                </FlexDiv>

                <Separator text="or" />
                <FlexDiv
                  margin="40px 0px 50px 0px"
                  justifyContent="space-between"
                >
                  <CustomButton {...transparentIconButton}>
                    <GoogleIcon />
                  </CustomButton>

                  <CustomButton {...transparentIconButton}>
                    <FbIcon />
                  </CustomButton>

                  <CustomButton {...transparentIconButton}>
                    <AppleIcon />
                  </CustomButton>
                </FlexDiv>
                <FlexDiv>
                  <CustomText
                    elementName="p"
                    color="black"
                    fontSize="16px"
                    fontWeight="400"
                  >
                    Don't have an account?{' '}
                  </CustomText>
                  <CustomButton
                    backgroundColor="transparent"
                    fontSize="16px"
                    fontWeight="400"
                    color={theme.primary}
                    onClick={() => history.push('/register')}
                  >
                    Sign Up
                  </CustomButton>
                </FlexDiv>
              </CustomCard>
            );
          }}
        </Formik>
      </PageBackground>
    </>
  );
}
