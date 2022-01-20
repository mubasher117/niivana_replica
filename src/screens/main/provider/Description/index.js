/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import StarIcon from '../../../../assets/icons/star.svg';
import DownIcon from '../../../../assets/icons/down-orange.svg';
import BackIcon from '../../../../assets/icons/back.svg';
import styles from './style';
import { Button } from '../../../../components';
import Header from '../../../../components/Header';
import { retrieveData, storeData } from '../../../../util/helpers';
import { getFeedbackProvider, getProviderDetails } from '../../../../api/main/Provider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { getUserCards } from '../../../../api/main/Payment';

// const specializations = ['Toddler Care', 'Lactation', 'Pregnancy'];

const ReviewCardProvider = ({ reviewerName, review, rating, date }) => (
  <View style={styles.reviewCardContainer}>
    <Text style={styles.reviewerName}>{reviewerName}</Text>
    <Text style={styles.review}>{review}</Text>
    <View style={styles.reviewBottomContainer}>
      <View style={styles.ratingsContainer}>
        <StarIcon />
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  </View>
);
const ProviderDescription = props => {
  const [providerData, setProviderData] = useState();
  const [specializations, setSpecializations] = useState();
  const [feedback, setFeedback] = useState();
  const [avgRating, setAvgRating] = useState(0);
  const [displayReviews, setDisplayReviews] = useState(false);
  const screensFlow = useSelector(state => state.nav.screensFlow);

  useEffect(() => {
    retrieveData('providerDetails').then(data => {
    setProviderData(data);
    console.log('providerDetails:     ', data);
    setSpecializations(data?.provider?.specialization?.split(','));
    getFeedbackProvider(data.provider?.id).then(res => {
      setFeedback(res.data);
      setAvgRating(getAvgRating(res?.data?.response));
    });
    });
  }, []);
  const _handlePurchase = () => {
    if (screensFlow === 'calendar'){
      getUserCards().then(res => {
        if (res.data?.data && res.data.data.length === 0) {
          props.navigation.navigate('Billing');
        } else {
          props.navigation.navigate('Payment');
        }
      });
    }else{
      storeData('amountPayable', providerData?.price);
      props.navigation.navigate('MainNav', {
        screen: 'Calendar',
        isScheduled: true
      });
    }
  };
  const getAvgRating = reviews => {
    let ratingSum = 0;
    reviews?.forEach(review => {
      ratingSum = ratingSum + review?.ratings;
    });
    return ratingSum / reviews?.length;
  };
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.rootContentContainer}
    >
      <Header
        title=""
        leftIcon={<BackIcon />}
        leftHandler={() => props.navigation.goBack()}
      />
      <Image
        source={{
          uri: providerData?.provider?.profile_picture
        }}
        style={styles.image}
      />
      <Text style={styles.providerName}>{providerData?.provider?.name}</Text>
      <Text style={styles.providerText}>
        {providerData?.provider?.location}
      </Text>
      <View style={styles.availabilityContainer}>
        <View style={styles.availableContainer}>
          <Text style={styles.providerText}>Available: </Text>
          <Text style={[styles.providerText, { fontWeight: 'bold' }]}>
            {providerData?.availabilityTime}
          </Text>
        </View>
        <View style={styles.daysContainer}>
          <Text style={styles.providerText}>Days: </Text>
          <Text style={[styles.providerText, { fontWeight: 'bold' }]}>
            {providerData?.availableDays}
          </Text>
        </View>
      </View>

      <View style={{ width: 300, height: 30 }} />
      <Text style={styles.title}>Specializes In</Text>
      <View style={styles.specializationsContainer}>
        {specializations?.map((item, index) => {
          return <Text style={styles.specialization}>{item}</Text>;
        })}
      </View>

      <Text style={styles.title}>About Me</Text>
      <Text style={styles.aboutMe}>{providerData?.provider?.about}</Text>

      <View style={{ width: 300, height: 30 }} />
      <View style={styles.horizontalBreak} />

      <View style={styles.reviewContainer}>
        <View style={styles.reviewDataContainer}>
          <Text style={[styles.title, styles.titleRow]}>Reviews</Text>
          <View style={styles.starIcon}>
            <StarIcon />
          </View>
          <Text style={styles.ratings}>{avgRating}</Text>
          <Text style={styles.providerText}>
            ({feedback?.response?.length}{' '}
            {feedback?.response?.length === 1 ? 'Review' : 'Reviews'})
          </Text>
        </View>
        <TouchableOpacity style={styles.downIcon} onPress={() => setDisplayReviews(displayReviews => !displayReviews)}>
          <DownIcon />
        </TouchableOpacity>
      </View>

      {displayReviews && <View>
        {feedback?.response?.map((review, index) => {
          return (
            <ReviewCardProvider
              reviewerName={'Shabeeb Hassan'}
              review={review.message}
              rating={review.ratings}
              date={'21 April 2021'}
            />
          );
        })}
      </View>}

      <View style={styles.horizontalBreak} />

      <View style={{ width: 300, height: 80 }} />
      <View style={styles.bottomContainer}>
        <View style={styles.pricingContainer}>
          <Text style={styles.price}>${providerData?.provider?.price}</Text>
          <Text style={styles.duration}>1 hour session</Text>
        </View>
        <Button
          style={styles.purchaseButton}
          onPress={_handlePurchase}
        >
          Schedule
        </Button>
      </View>
      <View style={{ width: 300, height: 50 }} />
    </ScrollView>
  );
};

export default ProviderDescription;
