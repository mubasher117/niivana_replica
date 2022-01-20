/* eslint-disable prettier/prettier */
import { Formik } from "formik"
import React, { useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView
} from "react-native"
import CheckBox from "../../../../components/CheckBox"
import BackIcon from "../../../../assets/icons/back.svg"
import CheckBoxIcon from "../../../../assets/icons/checkbox.svg"
import CheckBoxUnslectedIcon from "../../../../assets/icons/checkbox-unselected.svg"
import Header from "../../../../components/Header"
import styles from "./style"
import {
  Button,
  CustomTextInput,
  VerticalSpacing
} from "../../../../components"
import { BaseColor } from "../../../../config"
import CustomModal from "../../../../components/CustomModal"
import ModalDropdown from "react-native-modal-dropdown"
import { problems } from "../../../../util/data"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import Remove from "../../../../assets/icons/remove.svg"

const SelectedImage = ({ imageName, imageIndex, removeImage }) => {
  return (
    <View style={styles.selectedImageContainer}>
      <Text style={styles.selectedImageName}>{imageName}</Text>
      <TouchableOpacity onPress={() => removeImage(imageIndex)}>
        <Remove />
      </TouchableOpacity>
    </View>
  )
}

const QuestionForm = props => {
  const [isActiveMental, setIsActiveMental] = useState(false)
  const [isActiveLactation, setIsActiveLactation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [defaultProblem, setDefaultProblem] = useState("Select Problem")
  const [selectedProblem, setSelectedProblem] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedImages, setSelectedImages] = useState()
  const _handleImagePicker = async () => {
    const options = { mediaType: "photo", selectionLimit: 0 }
    const imageResult = await launchImageLibrary(options)
    console.log(imageResult)
    setSelectedImages(imageResult?.assets)
  }
  const _handleRemoveImage = index => {
    console.log(index)
    let tempImages = Array.from(selectedImages)
    tempImages.splice(index, 1)
    setSelectedImages(tempImages)
  }
  const _handleSubmit = data => {}
  return (
    <>
      <CustomModal
        isVisible={isModalVisible}
        handleCancel={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* <VerticalSpacing height={40}/> */}
          <Text style={styles.title}>Upload your Images</Text>
          {/* <VerticalSpacing height={20}/> */}
          <Text style={[styles.subTitle, styles.modalSubTitle]}>
            Please upload any images that may be helpful to the provider. File
            should be a JPG or PNG
          </Text>
          <VerticalSpacing height={40} />

          <View
            style={[
              styles.imagePickerContainer,
              selectedImages && selectedImages?.length !== 0
                ? styles.displayImages
                : styles.browseImage
            ]}
          >
            {selectedImages && selectedImages?.length !== 0 ? (
              <>
                <ScrollView>
                  {selectedImages?.map((image, index) => {
                    return (
                      <Text style={styles.imageName}>{image.fileName}</Text>
                    )
                  })}
                </ScrollView>
              </>
            ) : (
              <TouchableOpacity onPress={_handleImagePicker}>
                <Text style={styles.imagePickerText}>Browse files</Text>
              </TouchableOpacity>
            )}
          </View>
          <VerticalSpacing height={30} />

          <Button
            style={styles.modalButton}
            onPress={() => setIsModalVisible(false)}
          >
            {"upload".toUpperCase()}
          </Button>
          <VerticalSpacing height={40} />
        </View>
      </CustomModal>
        <Formik
          onSubmit={values => _handleSubmit(values)}
          initialValues={{
            babyName: "",
            age: "",
            issue: "",
          }}
        >
          {formik => {
            return (
              <ScrollView 
               contentContainerStyle={styles.container}>

        <SafeAreaView><Header
          title=""
          leftIcon={<BackIcon />}
          rightIcon={<View />}
          leftHandler={() => props.navigation.goBack()}
        /></SafeAreaView>
        <Text style={styles.title}>
          Hold tight. We are connecting you to our on-call IBCLC.
        </Text>
        <Text style={styles.subTitle}>
          While you wait, please answer these questions so your consultant can
          better help you
        </Text>
        <VerticalSpacing height={60}/>
                <CustomTextInput
                  style={styles.input}
                  inputStyle={styles.inputText}
                  autoCorrect={false}
                  placeholder="Baby Name"
                  onChangeText={formik.handleChange("babyName")}
                  onBlur={formik.handleBlur("babyName")}
                  value={formik.values.babyName}
                  hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                  selectionColor={BaseColor.primaryLightColor}
                />
                <CustomTextInput
                  style={styles.input}
                  inputStyle={styles.inputText}
                  autoCorrect={false}
                  placeholder="Age"
                  onChangeText={formik.handleChange("age")}
                  onBlur={formik.handleBlur("age")}
                  value={formik.values.age}
                  hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                  selectionColor={BaseColor.primaryLightColor}
                />

                <ModalDropdown
                  options={problems}
                  dropdownTextStyle={styles.dropdownText}
                  textStyle={styles.dropdownText}
                  style={styles.dropdownContainer}
                  dropdownStyle={styles.dropdown}
                  onSelect={(index, value) => setSelectedProblem(value)}
                  defaultValue={defaultProblem}
                />
                <VerticalSpacing height={10} />
                {selectedImages && selectedImages?.length !== 0 ? (
                  <View style={styles.imagesDisplay}>
                    <ScrollView>
                      {selectedImages?.map((image, index) => {
                        return (
                          <SelectedImage
                            imageName={image.fileName}
                            imageIndex={index}
                            removeImage={_handleRemoveImage}
                          />
                        )
                      })}
                    </ScrollView>
                  </View>
                ) : (
                  <CustomTextInput
                    style={[styles.input, styles.multilineInput]}
                    inputStyle={styles.inputText}
                    autoCorrect={false}
                    placeholder="Briefly Describe Your Issue"
                    onChangeText={formik.handleChange("issue")}
                    onBlur={formik.handleBlur("issue")}
                    value={formik.values.issue}
                    hitSlop={{ top: 32, bottom: 8, left: 0, right: 500 }}
                    selectionColor={BaseColor.primaryLightColor}
                    multiline={true}
                    numberOfLines={10}
                  />
                )}
                <VerticalSpacing height={20} />
                <Text style={styles.bottomText}>
                  If possible, we recommend that you have a second person nearby
                  to assist you with your consult.
                </Text>
                <VerticalSpacing height={20} />
                <Button
                  style={styles.uploadImages}
                  onPress={() => setIsModalVisible(true)}
                  styleText={styles.uploadImagesText}
                >
                  {"Upload Images".toUpperCase()}
                </Button>
                <VerticalSpacing height={15} />
                <Button
                  style={styles.continueButton}
                  onPress={formik.handleSubmit}
                >
                  {"confirm".toUpperCase()}
                </Button>
              </ScrollView>
            )
          }}
        </Formik>
        <SafeAreaView>
          <VerticalSpacing height={10}/>
        </SafeAreaView>
      
    </>
  )
}

export default QuestionForm
