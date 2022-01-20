/**
 *
 * Reset Password Page
 *
 */
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CustomButton from 'app/components/CustomButton';
import CustomCard from 'app/components/CustomCard';
import { CustomInput } from 'app/components/CustomInput';
import { CustomText } from 'app/components/CustomText';
import { Error } from 'app/components/Error';
import PageBackground from 'app/components/PageBackground';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import {
  selectForgotPasswordEmail,
  selectForgotPasswordOTP,
  selectAuthLoading,
} from 'app/sharedSlice/auth/slice/selectors';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must Contain 6 Characters.'),
  confirmPassword: Yup.string()
    .required('Enter Confirm Password ')
    .oneOf([Yup.ref('password')], 'make sure both passwords match'),
});
export const ResetPassword = () => {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const forgotPasswordEmail = useSelector(selectForgotPasswordEmail);
  const forgotPasswordOTP = useSelector(selectForgotPasswordOTP);

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();

  const iconStyle = {
    color: '#8F8D86',
    marginRight: '5px',
  };
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Niivana Reset Password Page" />
      </Helmet>
      <PageBackground
        backgroundColor="linear-gradient(180deg, #F4F6FA 23.17%, #FFFFFF 100%);"
        alignItems="flex-start"
      >
        {' '}
        <Formik
          initialValues={{
            password: 'Qaim!!12',
            confirmPassword: 'Qaim!!12',
          }}
          // validate={validate}
          validationSchema={resetPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              actions.resetPasswordRequest({
                email: forgotPasswordEmail || '',
                password: values.password,
                code: forgotPasswordOTP || -1,
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
                minHeight="50vh"
                padding="40px 60px"
              >
                <CustomText
                  elementName="h1"
                  fontSize="32px"
                  textAlign="center"
                  fontWeight="700"
                >
                  Reset Password
                </CustomText>
                <CustomInput
                  margin="60px 0px 10px 0px"
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
                  <Error addDefaultMarginBottom msg={errors.password} />
                )}
                <CustomInput
                  margin="10px 0px 80px 0px"
                  placeholder="Confirm Password"
                  inputType={showConfirmPassword ? 'text' : 'password'}
                  RightElem={
                    <LockIcon
                      style={{ color: '#8F8D86', marginRight: '5px' }}
                    />
                  }
                  LeftElem={
                    // <LockIcon style={{ color: '#8F8D86', marginRight: '5px' }} />
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  }
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? true
                      : false
                  }
                  name="confirmPassword"
                  id="confirmPassword"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Error addDefaultMarginBottom msg={errors.confirmPassword} />
                )}
                <CustomButton
                  width="100%"
                  height="50px"
                  fontSize="12px"
                  fontWeight="600"
                  borderRadius="12px"
                  letterSpacing="1px"
                  textTransform="uppercase"
                  margin="30px 0px"
                  // onClick={() => history.push('/signup')}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Send reset code
                </CustomButton>
              </CustomCard>
            );
          }}
        </Formik>
      </PageBackground>
    </>
  );
};
