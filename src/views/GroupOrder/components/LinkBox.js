import React from 'react';
import styled from 'styled-components/native';
import {showToast} from '../../../navigation/screen';
import Clipboard from '@react-native-community/clipboard';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  height: 35px;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${Colors.grey};
`;

const LinkWrapper = styled.View`
  flex: 4;
  margin-left: 10px;
  justify-content: center;
`;

const Link = styled.Text`
  font-size: 13px;
  font-weight: 600;
`;

const CopyButton = styled.TouchableOpacity`
  flex: 1;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.yellow};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Copy = styled.Text`
  font-size: 13px;
  font-weight: bold;
`;

export default ({url}) => {
  const copyToClipboard = () => {
    Clipboard.setString(url);

    showToast({message: 'Copied'});
  };

  return (
    <Wrapper>
      <LinkWrapper>
        <Link numberOfLines={1}>{url}</Link>
      </LinkWrapper>
      <CopyButton activeOpacity={0.5} onPress={() => copyToClipboard()}>
        <Copy>COPY</Copy>
      </CopyButton>
    </Wrapper>
  );
};
