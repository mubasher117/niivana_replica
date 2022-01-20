/**
 *
 * Register Page
 *
 */
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ReactComponent as AccountIcon } from 'app/assets/account.svg';
import { ReactComponent as AgeIcon } from 'app/assets/cake.svg';
import HomeIcon from 'app/assets/Home';
import { ReactComponent as TicketIcon } from 'app/assets/Ticket.svg';
import CustomButton from 'app/components/CustomButton';
import CustomCard from 'app/components/CustomCard';
import { CustomInput } from 'app/components/CustomInput';
import { CustomSelect } from 'app/components/CustomSelect';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import PageBackground from 'app/components/PageBackground';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from 'styled-components';
import BecomeMember from './BecomeMember';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Error } from 'app/components/Error';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthLoading,
  selectAuthError,
} from 'app/sharedSlice/auth/slice/selectors';
interface Props {}
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must Contain 6 Characters.'),
  confirmPassword: Yup.string()
    .required('Enter Confirm Password ')
    .oneOf([Yup.ref('password')], 'make sure both passwords match'),
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  age: Yup.number(),
  location: Yup.string(),
  refferalCode: Yup.string(),

  hearAboutUs: Yup.string(),
});

export const Register = () => {
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const apiError = useSelector(selectAuthError);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const [openMemberModal, setOpenMemberModal] = useState(false);
  const theme = useTheme();
  const transparentIconButton = {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.primary}`,
    color: theme.primary,
    borderRadius: '12px',
    width: '90px',
    height: '50px',
  };
  const iconStyle = {
    color: '#8F8D86',
    marginRight: '5px',
  };
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Niivana Register Page" />
      </Helmet>
      <PageBackground
        backgroundColor="linear-gradient(180deg, #F4F6FA 23.17%, #FFFFFF 100%);"
        alignItems="flex-start"
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            age: '',
            location: '',
            refferalCode: '',
            hearAboutUs: '',
          }}
          // validate={validate}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              actions.registerRequest({
                email: values.email,
                password: values.password,
                name: values.firstName + '' + values.lastName,
                age: values.age,
                location: values.location,
                refferalCode: values.refferalCode,
                confirmPassword: values.confirmPassword,
                phone: '',
                group: 'default',
                hear_about_us: values.hearAboutUs,
                last_name: values.lastName,
                first_name: values.firstName,
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
                  Sign Up
                </CustomText>
                <CustomInput
                  margin="60px 0px 15px 0px"
                  placeholder="First Name"
                  RightElem={<AccountIcon style={iconStyle} />}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName && touched.firstName ? true : false}
                  name="firstName"
                  id="firstName"
                />
                {errors.firstName && touched.firstName && (
                  <Error addDefaultMarginBottom msg={errors.firstName} />
                )}
                <FlexDiv
                  margin="10px 0px 15px 0px"
                  justifyContent="space-between"
                >
                  <CustomInput
                    placeholder="First Name"
                    RightElem={<AccountIcon style={iconStyle} />}
                    width="65%"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lastName && touched.lastName ? true : false}
                    name="lastName"
                    id="lastName"
                  />

                  <CustomInput
                    placeholder="Age"
                    RightElem={<AgeIcon style={iconStyle} />}
                    width="33%"
                    value={values.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.age && touched.age ? true : false}
                    name="age"
                    id="age"
                  />
                </FlexDiv>
                {errors.lastName && touched.lastName && (
                  <Error addDefaultMarginBottom msg={errors.lastName} />
                )}
                {errors.age && touched.age && (
                  <Error addDefaultMarginBottom msg={errors.age} />
                )}

                <CustomInput
                  margin="10px 0px 15px 0px"
                  placeholder="Your Location"
                  RightElem={
                    <div style={{ marginRight: iconStyle.marginRight }}>
                      <HomeIcon color={iconStyle.color} />
                    </div>
                  }
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.location && touched.location ? true : false}
                  name="location"
                  id="location"
                />
                {errors.location && touched.location && (
                  <Error addDefaultMarginBottom msg={errors.location} />
                )}
                <CustomInput
                  margin="10px 0px 15px 0px"
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
                {errors.email && touched.email && (
                  <Error addDefaultMarginBottom msg={errors.email} />
                )}
                <CustomInput
                  margin="10px 0px 15px 0px"
                  placeholder="Password"
                  inputType={showPassword ? 'text' : 'password'}
                  RightElem={<LockIcon style={iconStyle} />}
                  LeftElem={
                    // <LockIcon style={iconStyle} />
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
                  margin="10px 0px 15px 0px"
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
                <CustomInput
                  margin="10px 0px 15px 0px"
                  placeholder="Referral Code"
                  RightElem={<TicketIcon style={iconStyle} />}
                  value={values.refferalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors.refferalCode && touched.refferalCode ? true : false
                  }
                  name="refferalCode"
                  id="refferalCode"
                />
                {errors.refferalCode && touched.refferalCode && (
                  <Error addDefaultMarginBottom msg={errors.refferalCode} />
                )}
                <CustomSelect
                  options={[
                    { value: 'Social Media', label: 'Social Media' },
                    { value: 'Friend', label: 'Friend' },
                    { value: 'Email', label: 'Email' },
                    { value: 'TV', label: 'TV' },
                    { value: 'Other', label: 'Other' },
                  ]}
                  placeholder="How did you hear abou us?"
                  value={values.hearAboutUs}
                  onChange={value => {
                    formik.setFieldValue('hearAboutUs', value);
                  }}
                  onBlur={handleBlur}
                  name="hearAboutUs"
                  id="hearAboutUs"
                />
                {errors.hearAboutUs && touched.hearAboutUs && (
                  <Error addDefaultMarginBottom msg={errors.hearAboutUs} />
                )}
                <FlexDiv
                  margin="30px 0px"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  {apiError && <Error msg={apiError} />}
                  <CustomButton
                    width="100%"
                    height="50px"
                    fontSize="12px"
                    fontWeight="600"
                    borderRadius="12px"
                    letterSpacing="1px"
                    textTransform="uppercase"
                    margin="10px 0px 0px 0px"
                    // onClick={() => setOpenMemberModal(!openMemberModal)}
                    onClick={formik.handleSubmit}
                    isLoading={isLoading}
                  >
                    Create Account
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
                    onClick={() => history.push('/login')}
                  >
                    Sign In
                  </CustomButton>
                </FlexDiv>
              </CustomCard>
            );
          }}
        </Formik>
        <BecomeMember
          open={openMemberModal}
          handleClose={() => setOpenMemberModal(!openMemberModal)}
        />
      </PageBackground>
    </>
  );
};
