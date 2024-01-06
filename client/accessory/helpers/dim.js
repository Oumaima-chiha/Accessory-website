import {Dimensions, Platform} from 'react-native';
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = width>500 ? width : 375;
const guidelineBaseHeight =  height>900? height :812;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};
