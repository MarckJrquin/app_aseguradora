import React from "react";

import { useTheme } from "../context/ThemeContext";
import { View, Text } from "react-native";

const QuoteInsurance = () => {

    const { styles } = useTheme();

    return (
        <View>
            <Text style={styles.text}>QuoteInsurance</Text>
        </View>
    );
}

export default QuoteInsurance;