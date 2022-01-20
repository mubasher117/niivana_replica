/**
 *
 * ForgotPassword Page
 *
 */
import { ReactComponent as AccountIcon } from 'app/assets/account.svg';
import CustomButton from 'app/components/CustomButton';
import CustomCard from 'app/components/CustomCard';
import { CustomInput } from 'app/components/CustomInput';
import { CustomText } from 'app/components/CustomText';
import PageBackground from 'app/components/PageBackground';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTheme } from 'styled-components';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import { Error } from 'app/components/Error';
import { selectAuthLoading } from 'app/sharedSlice/auth/slice/selectors';

interface Props {}
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export const ForgotPassword = () => {
  const history = useHistory();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const theme = useTheme();
  const isLoading = useSelector(selectAuthLoading);

  const iconStyle = {
    color: '#8F8D86',
    marginRight: '5px',
  };
  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta name="description" content="Niivana ForgotPassword Page" />
      </Helmet>
      <PageBackground
        backgroundColor="linear-gradient(180deg, #F4F6FA 23.17%, #FFFFFF 100%);"
        alignItems="flex-start"
      >
        {' '}
        <Formik
          initialValues={{
            email: '',
          }}
          // validate={validate}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              actions.forgotPasswordRequest({
                email: values.email,
                // password: values.password,
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
                  Forgot Password
                </CustomText>
                <CustomInput
                  margin="60px 0px 15px 0px"
                  placeholder="Email Address"
                  RightElem={<AccountIcon style={iconStyle} />}
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email ? true : false}
                />
                {errors.email && touched.email && <Error msg={errors.email} />}
                <CustomText
                  elementName="p"
                  fontSize="16px"
                  textAlign="center"
                  color="#8F8D86"
                  margin="20px 0px 10px 0px"
                >
                  We will send a reset code
                </CustomText>
                <CustomText
                  elementName="p"
                  fontSize="16px"
                  textAlign="center"
                  color="#8F8D86"
                  margin="0px 0px 70px 0px"
                >
                  to your email.
                </CustomText>
                <CustomButton
                  width="100%"
                  height="50px"
                  fontSize="12px"
                  fontWeight="600"
                  borderRadius="12px"
                  letterSpacing="1px"
                  textTransform="uppercase"
                  margin="30px 0px"
                  onClick={formik.handleSubmit}
                  isLoading={isLoading}
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
