// HomePage.web.js
import React, {useRef, useState} from "react";
import {View, TextInput, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Animated} from "react-native";
import JewelryBox from "./JewleryBox";
import { Images } from "../contants";
import { userApi } from "../services/modules/users";
import { api } from "../services/api";

const category = [
    "All",
    "Rings",
    "Necklaces",
    "Earings",
    "Braclets",
    "HairClips",
    "Brooches",
];

const HomePageWeb = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [200, 0],
        extrapolate: "clamp",
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[{ height: headerHeight, opacity: headerOpacity,width:'100%' }]}>
                <Animated.Image source={Images.ACCESSORY} style={[{height:250, top:-50,width:'100%' }]} resizeMode={'cover'} />
            </Animated.View>
            <View style={styles.header}>
                <View >
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search..."
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                    />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                    {category.map((categoryName, index) => (
                        <TouchableOpacity key={categoryName + index} onPress={() => setSelectedCategory(categoryName)}>
                            <View style={styles.category}>
                                <Text>{categoryName}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <JewelryBox searchTerm={searchTerm} selectedCategory={selectedCategory} scrollY={scrollY} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
    },

    searchBar: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 30,
        paddingHorizontal: 20,
    },

    categoriesContainer: {
        flexDirection: "row",
        marginTop: 10,
    },

    category: {
        paddingHorizontal: 10,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 14,
        marginTop: 10,
    },
});

export default HomePageWeb;
