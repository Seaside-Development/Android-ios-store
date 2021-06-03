import React from "react";
import { Tooltip, Text } from 'react-native-elements';

function ClickAlert() {

    return (
        <Tooltip popover={<Text>Added to cart</Text>}>
        </Tooltip>
    )
}

export default ClickAlert;
