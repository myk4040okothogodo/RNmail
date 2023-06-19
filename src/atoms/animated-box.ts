import { Theme } from '../themes'
import * as React from 'react';
import { createBox } from '@shopify/restyle';
import { ViewProps } from 'react-native'
import Animated, { AnimateProps } from 'react-native-reanimated';


const AnimatedBox = createBox<Theme, AnimateProps<ViewProps>>(Animated.View)


export type AnimatedBoxProps = React.ComponentProps<typeof AnimatedBox>


export default AnimatedBox 