/**
 *
 * BookingDetails
 *
 */
import React, { useState, useEffect } from 'react';
import Mother from 'app/assets/mother.png';
import { DashboardWrapper } from 'app/components/DashboardWrapper';
import { CustomText } from 'app/components/CustomText';
import { FlexDiv } from 'app/components/FlexDiv';
import { Helmet } from 'react-helmet-async';
import CustomButton from 'app/components/CustomButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { TextWithTwoColors } from 'app/components/TextWithTwoColors';
import { ReactComponent as CalendarSmall } from 'app/assets/CalendarSmall.svg';
import { useHistory, useParams } from 'react-router-dom';
import { useBookingSlice } from 'app/sharedSlice/booking/slice';
import { useSelector } from 'react-redux';
import { selectBooking } from 'app/sharedSlice/booking/slice/selectors';
import { BookingType } from 'app/sharedSlice/booking/slice/types';

interface Props {}

export function BookingDetails(props: Props) {
  const history = useHistory();
  const [booking, setBooking] = useState<BookingType | null>();
  const params: { id?: string } = useParams();
  const { bookingList } = useSelector(selectBooking);

  const { id } = params;
  useEffect(() => {
    const selectedBooking = bookingList?.find(
      elem => elem.id == parseInt(id || ''),
    );
    setBooking(selectedBooking);
  }, [id]);

  const openInNewTab = url => {
    window.open(url, '_blank');
  };
  return (
    <>
      <Helmet>
        <title>Booking Details</title>
        <meta name="description" content="Niivana Booking Details" />
      </Helmet>

      <FlexDiv
        columnGap="30px"
        backgroundColor="transparent"
        height="100%"
        margin="20px 0vw 0px 0px"
        alignItems="flex-start"
      >
        <FlexDiv
          backgroundColor="transparent"
          color="#1A1F36"
          width="80px"
          cursor="pointer"
          onClick={() => history.goBack()}
        >
          <KeyboardBackspaceIcon style={{ fontSize: 14 }} />
          <CustomText
            elementName="span"
            fontSize="14px"
            margin="0px 0px 0px 10px"
            color="#1A1F36"
            cursor="pointer"
          >
            Back
          </CustomText>
        </FlexDiv>
        <FlexDiv
          justifyContent="space-between"
          // margin="20px 8vw 0px 8vw"
          borderRadius="16px"
          overflow="hidden"
          padding="60px"
          height="100%"
          alignItems="flex-start"
          width="fit-content"
          maxWidth="65vw"
        >
          <FlexDiv
            flexDirection="column"
            maxWidth="48%"
            alignItems="flex-start"
          >
            <img src={Mother} alt="Mother" />
            <CustomText
              elementName="p"
              fontSize="24px"
              color="#19343A"
              fontWeight={600}
              margin="20px 0px 10px 0px"
            >
              Lactation Lesson
            </CustomText>
            <TextWithTwoColors
              istText="with"
              secondText="Annabelle Cooper"
              istColor="#19343A"
              istFontSize="14px"
              secondFontSize="14px"
              istFontWeight={400}
              secondFontWeight={500}
              margin="0px 0px 60px 0px"
            />
            <FlexDiv columnGap="10px" alignItems="flex-start">
              <CalendarSmall />
              <FlexDiv
                flexDirection="column"
                alignItems="flex-start"
                rowGap="5px"
              >
                <CustomText
                  elementName="p"
                  fontSize="16px"
                  fontWeight={300}
                  color="#19343A"
                >
                  Thursday, 6 Feb 2020
                </CustomText>
                <CustomText
                  elementName="p"
                  color="#8F8D86"
                  fontSize="14px"
                  fontWeight={400}
                >
                  19:30 - 21:30
                </CustomText>
                <CustomText
                  elementName="p"
                  fontSize="14px"
                  fontWeight={400}
                  margin="10px 0px "
                  cursor="pointer"
                >
                  Add to calendar
                </CustomText>
              </FlexDiv>
            </FlexDiv>
            <CustomButton
              width="90%"
              height="50px"
              fontSize="16px"
              fontWeight="600"
              borderRadius="12px"
              letterSpacing="1px"
              textTransform="uppercase"
              margin="30px 0px 0px 0px"
              // backgroundColor="#DB8057"
              onClick={() => history.push(`/zoom-meeting/${id}`)}
              // onClick={() => openInNewTab(booking?.zoom_link || '')}
              // onClick={formik.handleSubmit}
              // isLoading={isLoading}
            >
              Join
            </CustomButton>
          </FlexDiv>
          <FlexDiv
            flexDirection="column"
            maxWidth="48%"
            alignItems="flex-start"
          >
            <CustomText
              elementName="p"
              fontSize="16px"
              fontWeight={400}
              color="#19343A"
              margin="0px 0px 20px 0px"
            >
              With Annabelle Cooper
            </CustomText>
            <TextWithTwoColors
              istText=" Baby Name"
              secondText="Alex"
              istColor="#8F8D86"
              secondColor="#8F8D86"
              istFontSize="14px"
              secondFontSize="14px"
              istFontWeight={300}
              secondFontWeight={500}
            />
            <TextWithTwoColors
              istText="Age:"
              secondText="3 months old"
              istColor="#8F8D86"
              secondColor="#8F8D86"
              istFontSize="14px"
              secondFontSize="14px"
              istFontWeight={300}
              secondFontWeight={500}
            />
            <TextWithTwoColors
              istText="Problem:"
              secondText="Don’t sleep properly at nights"
              istColor="#8F8D86"
              secondColor="#8F8D86"
              istFontSize="14px"
              secondFontSize="14px"
              istFontWeight={300}
              secondFontWeight={500}
            />
            <CustomText
              elementName="p"
              fontSize="16px"
              fontWeight={400}
              color="#19343A"
              margin="20px 0px"
            >
              answered questions{' '}
            </CustomText>

            <CustomText
              elementName="p"
              fontWeight={500}
              color="#8F8D86"
              fontSize="14px"
            >
              Lorem ipsum
            </CustomText>
            <CustomText
              elementName="p"
              fontWeight={300}
              color="#8F8D86"
              fontSize="14px"
            >
              dolor sit amet, consectetur adipiscing elit. Varius ut metus
              tristique tellus ipsum in mi ut. Dictum sapien vel adipiscing
              viverra.
            </CustomText>
            <CustomText
              elementName="p"
              fontWeight={500}
              color="#8F8D86"
              fontSize="14px"
              textAlign="justify"
            >
              Pellentesque
            </CustomText>
            <CustomText
              elementName="p"
              fontWeight={300}
              color="#8F8D86"
              fontSize="14px"
              textAlign="justify"
            >
              mi mauris iaculis id sodales integer felis. Cras pretium ac porta
              diam purus. Adipiscing ornare neque pellentesque nulla risus
              tincidunt volutpat nibh. Quam et mi vel aenean urna. Ornare et et
              nullam sapien molestie donec in. Mattis metus nullam mauris
              viverra nunc. Dictumst arcu.
            </CustomText>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </>
  );
}
