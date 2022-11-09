import React, { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { LoginContent } from '../../components'

export function Login() {
  return (
    <Flex h='100vh' w='100vw' overflow='hidden' justify='center' align='center'>
      <LoginContent />
    </Flex>
  )
}
