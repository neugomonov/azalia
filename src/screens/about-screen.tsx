import { Box, ScrollView, Text, useColorModeValue, VStack } from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead image={require('../assets/azalia.png')}>
        <Navbar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Text fontSize="md" w="full">
              This is an Azalia test app. Check it out. It's right here. Take
              it! 🌹
            </Text>
          </Box>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
