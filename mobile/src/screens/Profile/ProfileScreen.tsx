import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import TextComponent from "../../components/Global/TextComponent";
import ButtonComponent from "../../components/button/ButtonComponent";
import { appColors } from "../../constants/appColors";

const ProfileScreen = () => {
  const auth = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    // Here you can handle saving the edited profile information
  };

  return (
    <>
      <View style={{ width: "100%" }}>
        <Image
          source={{
            uri: "https://th.bing.com/th/id/OIP.ZZctclEOrBiAuWKj2wtKGAHaFj?rs=1&pid=ImgDetMain",
          }}
          resizeMode="cover"
          style={{
            marginTop: 10,
            height: 250,
            width: "100%",
          }}
        />
      </View>
      <View
        style={{
          zIndex: 1,
          position: "absolute",
          top: 200,
          left: 50,
          flex: 1,
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri:
              auth.currentUser.photo ||
              "https://static.wikia.nocookie.net/houkai-star-rail/images/2/22/Profile_Picture_Sparkle_-_Illusion.png/revision/latest/thumbnail/width/360/height/360?cb=20240206032940",
          }}
          style={{
            borderRadius: 9999,
            width: 100,
            height: 100,
            borderWidth: 5,
            borderColor: appColors.primary,
          }}
        />
        <TextComponent text={auth.currentUser.name || "User"} title />
        <TextComponent text={auth.currentUser.email || "User Email"} title />
        <TextComponent
          text={auth.currentUser.familyName || "Family Name"}
          title
        />
        {isEditing ? (
          <>
            {/* Editable fields */}
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
              <View style={styles.inputWrapper}>
                <Text style={styles.labelText}>Name:</Text>
                <Text style={styles.inputText}>
                  {auth.currentUser.name || "User"}
                </Text>
                <View style={styles.underline}></View>
              </View>
            </View>
            {/* Gender Selection */}
            <View style={styles.inputContainer}>
              <Ionicons
                name="people"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.labelText}>Gender:</Text>
              <TouchableOpacity
                style={styles.radio}
                onPress={() => setSelectedGender("male")}
              >
                <Text style={styles.radioText}>Male</Text>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      backgroundColor:
                        selectedGender === "male" ? appColors.primary : "#fff",
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radio}
                onPress={() => setSelectedGender("female")}
              >
                <Text style={styles.radioText}>Female</Text>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      backgroundColor:
                        selectedGender === "female"
                          ? appColors.primary
                          : "#fff",
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radio}
                onPress={() => setSelectedGender("other")}
              >
                <Text style={styles.radioText}>Other</Text>
                <View
                  style={[
                    styles.radioCircle,
                    {
                      backgroundColor:
                        selectedGender === "other" ? appColors.primary : "#fff",
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
            {/* Save button */}
            <ButtonComponent
              iconFlex="right"
              styles={{ width: 170 }}
              icon={
                <FontAwesome name="save" size={20} color={appColors.white} />
              }
              text="Save"
              type="primary"
              onPress={handleSavePress}
            />
          </>
        ) : (
          <ButtonComponent
            iconFlex="right"
            styles={{ width: 170, marginTop: 10 }}
            icon={<FontAwesome name="edit" size={20} color={appColors.white} />}
            text="Edit Profile"
            type="primary"
            onPress={handleEditPress}
          />
        )}
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: -32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  labelText: {
    fontSize: 19,
    marginRight: 10,
    fontWeight: "bold",
  },
  inputWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "black",
  },
  inputText: {
    fontSize: 20,
    paddingBottom: 3,
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "black",
  },
  icon: {
    marginRight: 10,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioText: {
    marginRight: 5,
    fontSize: 17,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
