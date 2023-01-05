import { Box, Image, VStack } from 'native-base'
import React from 'react'
import { ImageSourcePropType } from 'react-native'

interface Props {
  image: ImageSourcePropType
  children: React.ReactNode
}

const Masthead = ({ image, children }: Props) => {
  return (
    <VStack h="200px" pb={5}>
      <Image
        position="relative"
        mx={8}
        mt={110}
        w="50%"
        h="110px"
        resizeMode="contain"
        source={image}
        alt="masthead image"
      />
      {children}
      <Box flex={1} />
    </VStack>
  )
}

export default Masthead
