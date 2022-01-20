/**
 *
 * Otp Page
 *
 */
import { ReactComponent as AccountIcon } from 'app/assets/account.svg';
import CustomButton from 'app/components/CustomButton';
import CustomCard from 'app/components/CustomCard';
import { CustomInput } from 'app/components/CustomInput';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import PageBackground from 'app/components/PageBackground';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { Error } from 'app/components/Error';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthLoading,
  selectForgotPasswordEmail,
  selectAuthError,
} from 'app/sharedSlice/auth/slice/selectors';
interface Props {}
const codeSchema = Yup.object().shape({
  code: Yup.number().required('Code is required'),
});

export const Otp = () => {
  const history = useHistory();
  const theme = useTheme();
  const { actions } = useAuthSlice();
  const apiError = useSelector(selectAuthError);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const forgotPasswordEmail = useSelector(selectForgotPasswordEmail);
  const iconStyle = {
    color: '#8F8D86',
    marginRight: '5px',
  };
  return (
    <>
      <Helmet>
        <title>OTP </title>
        <meta name="description" content="Niivana Otp Page" />
      </Helmet>
      <PageBackground
        backgroundColor="linear-gradient(180deg, #F4F6FA 23.17%, #FFFFFF 100%);"
        alignItems="flex-start"
      >
        <Formik
          initialValues={{
            code: '',
          }}
          // validate={validate}
          validationSchema={codeSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              actions.checkOTPRequest({
                code: values.code,
                email: forgotPasswordEmail || '',
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
                <CustomText
                  elementName="p"
                  fontSize="15px"
                  textAlign="center"
                  color="#8F8D86"
                  margin="60px 0px 30px 0px"
                >
                  Please enter the code we sent to your email{' '}
                </CustomText>
                <CustomInput
                  margin="0px 0px 15px 0px"
                  placeholder="Enter Code"
                  textAlign="center"
                  fontSize="36px"
                  fontWeight="700"
                  letterSpacing="10px"
                  inputType="number"
                  height="55px"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.code && touched.code ? true : false}
                  name="code"
                  id="code"
                  placeholderFontSize="18px"
                />
                {errors.code && touched.code && (
                  <Error addDefaultMarginBottom msg={errors.code} />
                )}
                <FlexDiv
                  margin="10px 0px 80px 0px"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  {apiError && <Error msg={apiError} />}
                  <CustomButton
                    fontSize="16px"
                    color={theme.primary}
                    backgroundColor="transparent"
                    margin="10px 0px 0px 0px"
                  >
                    Send me a new code
                  </CustomButton>
                </FlexDiv>
                <CustomButton
                  width="100%"
                  height="50px"
                  fontSize="16px"
                  fontWeight="600"
                  borderRadius="12px"
                  letterSpacing="1px"
                  textTransform="uppercase"
                  margin="30px 0px"
                  onClick={formik.handleSubmit}
                  isLoading={isLoading}
                >
                  Continue
                </CustomButton>
              </CustomCard>
            );
          }}
        </Formik>
      </PageBackground>
    </>
  );
};
