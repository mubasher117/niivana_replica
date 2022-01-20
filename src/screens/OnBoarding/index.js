import React from "react"
import { Image, View, Text, TouchableOpacity } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { GetChecklist } from "../../api/main"
import { Button } from "../../components"
import styles, { constStyleValues } from "./style"

export default class MyCarousel extends React.Component {
  state = {
    entries: [],
    activeSlide: 0
  }
  _handleNext = () => this.props.navigation.navigate("AuthNav")
  _renderItem = ({ item, index }) => {
    const descriptionLines = item.text.split("\n")
    return (
      <View style={styles.cardMainContainer}>
        <View style={styles.cardContainer}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.category}</Text>
          <View style={styles.descriptionsContainer}>
            {descriptionLines?.map((description, index) => {
              return (
                <View style={styles.descriptionContainer}>
                  <Image
                    source={require("../../assets/icons/tick.png")}
                    style={styles.tick}
                  />
                  <Text style={styles.description}>
                    {description.replace("\r", "")}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
        {this.state?.activeSlide === this.state?.entries?.length - 1 && (
          <Button style={styles.continueButton} onPress={this._handleNext}>
            NEXT
          </Button>
        )}
      </View>
    )
  }

  get pagination() {
    const { entries, activeSlide } = this.state
    console.log(entries)
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        // containerStyle={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationDotInactive}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }
  componentDidMount() {
    GetChecklist().then(res => {
      console.log(res.data)
      this.setState({ entries: res.data })
    })
  }
  render() {
    return (
      <View style={styles.root}>
        {this.state?.activeSlide !== this.state?.entries?.length - 1 && (
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={this._handleNext}
          >
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
        )}
        <Carousel
          data={this.state.entries}
          renderItem={this._renderItem}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          windowSize={1}
          sliderWidth={constStyleValues.sliderWidth}
          itemWidth={constStyleValues.sliderWidth}
          autoplay={true}
        />
        {this.pagination}
      </View>
    )
  }
}
