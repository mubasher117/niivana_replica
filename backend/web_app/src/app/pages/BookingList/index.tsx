/**
 *
 * BookingList
 *
 */
import { BookingCard } from 'app/components/BookingCard';
import { FlexDiv } from 'app/components/FlexDiv';
import { LoadingIndicatorPage } from 'app/components/LoadingIndicator';
import { useBookingSlice } from 'app/sharedSlice/booking/slice';
import {
  selectBooking,
  selectBookingLoading,
} from 'app/sharedSlice/booking/slice/selectors';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

export function BookingList(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useBookingSlice();
  const { loading, error, bookingList } = useSelector(selectBooking);

  React.useEffect(() => {
    dispatch(actions.bookingListRequest());
  }, []);

  return (
    <>
      <Helmet>
        <title>Bookings</title>
        <meta name="description" content="Niivana Bookings" />
      </Helmet>
      {loading && (
        <LoadingIndicatorPage height="70vh" loadingText="Loading Bookings..." />
      )}
      {!loading && (
        <FlexDiv
          margin="150px 0px 50px 66px"
          backgroundColor="transparent"
          justifyContent="center"
          overflowY="auto"
        >
          <FlexDiv
            backgroundColor="transparent"
            columnGap="48px"
            rowGap="50px"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            padding="0px 20px 0px 0px"
          >
            {bookingList &&
              bookingList.map((elem, index) => (
                <BookingCard key={index} booking={elem} />
              ))}
          </FlexDiv>
        </FlexDiv>
      )}
    </>
  );
}
