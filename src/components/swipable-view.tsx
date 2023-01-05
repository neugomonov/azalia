import { Box } from 'native-base'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps
} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(Animated.View)

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  children: React.ReactNode
  backView?: React.ReactNode
  onSwipe?: () => void
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2

const SwipeView = (props: Props) => {
  const { children, backView, onSwipe, simultaneousHandlers } = props
  const translateX = useSharedValue(0)

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX
    },
    onEnd: () => {
      const shouldBeDismissedToLeft = translateX.value < SWIPE_THRESHOLD
      const shouldBeDismissedToRight = translateX.value > -SWIPE_THRESHOLD
      if (shouldBeDismissedToLeft) {
        translateX.value = withTiming(-SCREEN_WIDTH)
        onSwipe && runOnJS(onSwipe)()
      } else if (shouldBeDismissedToRight) {
        translateX.value = withTiming(SCREEN_WIDTH)
        onSwipe && runOnJS(onSwipe)()
      } else {
        translateX.value = withTiming(0)
      }
    }
  })

  const facadeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }))

  return (
    <StyledView w="92%" style={styles.input}>
      {backView && (
        <Box position="absolute" left={0} right={0} top={0} bottom={0}>
          {backView}
        </Box>
      )}
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <StyledView w="100%" style={facadeStyle}>
          {children}
        </StyledView>
      </PanGestureHandler>
    </StyledView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FAFAFE',
    fontSize: 24,
    overflow: 'hidden',
    color: '#222F3E',
    marginHorizontal: 16,
    borderColor: 'rgba(13, 18, 24, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2
  }
})

export default SwipeView
