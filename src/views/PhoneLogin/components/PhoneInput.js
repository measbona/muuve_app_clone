import React from 'react'
import styled from 'styled-components/native'

import utils from '../../../utils'

const Wrapper = styled.View`
  height: 40px;
  border-radius: 17px;
  flex-direction: row;
  margin-vertical: 10px;
  justify-content: space-between;
  background-color: ${utils.colors.grey};
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  margin-left: 10px;
`;

const Head = styled.View`
  align-items: center;
  flex-direction: row;
`;

const CambodiaFlagIcon = styled.Image`
  width: 27px;
  height: 17px;
  margin-left: 20px;
`;

const PrefixNumber = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-left: 10px;
`;

export default props => {
  const { onChangeText } = props

  return (
    <Wrapper>
      <Head>
        <CambodiaFlagIcon
          source={require('../../../assets/icons/flag_icon.png')}
        />
        <PrefixNumber>+855</PrefixNumber>
      </Head>
      <TextInput
        caretHidden
        maxLength={10}
        keyboardType="number-pad"
        placeholder="Enter phone number"
        onChangeText={num => onChangeText(num)}
      />
    </Wrapper>
  )
}