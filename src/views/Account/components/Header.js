import React from 'react';
import styled from 'styled-components/native';
import {goToViewAccount} from '../../../navigation/screen';

import Colors from '../../../utils/colors';
import Device from '../../../utils/device';

const Wrapper = styled.View`
  padding-top: ${Device.isIphoneX ? 44 : 30}px;
  flex-direction: row;
  padding-bottom: 10px;
  padding-horizontal: 20px;
  justify-content: space-between;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  background-color: ${Colors.yellow};
`;

const AccountWrapper = styled.View`
  flex-direction: row;
`;

const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const UserInfoWrapper = styled.View`
  margin-left: 13px;
`;

const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 3px;
  color: ${Colors.black};
`;

const ViewAccountWrapper = styled.TouchableOpacity``;

const ViewAccount = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const PhoneNumberWrapper = styled.View``;

const PhoneNumber = styled.Text`
  font-size: 13px;
  font-weight: 700;
  color: ${Colors.black};
`;

export default class Header extends React.PureComponent {
  render() {
    const {componentId, user} = this.props;

    const userName = user && `${user.family_name} ${user.first_name}`;
    const phoneNumber = user && user.phone_number;

    return (
      <Wrapper>
        <AccountWrapper>
          <Image
            source={require('../../../assets/images/user_placeholder.jpg')}
          />
          <UserInfoWrapper>
            <UserName>{userName}</UserName>
            <ViewAccountWrapper
              activeOpacity={0.7}
              onPress={() => goToViewAccount(componentId)}>
              <ViewAccount>View Account</ViewAccount>
            </ViewAccountWrapper>
          </UserInfoWrapper>
        </AccountWrapper>
        <PhoneNumberWrapper>
          <PhoneNumber>{phoneNumber}</PhoneNumber>
        </PhoneNumberWrapper>
      </Wrapper>
    );
  }
}
