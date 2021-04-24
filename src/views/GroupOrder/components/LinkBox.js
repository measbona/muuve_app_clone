import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  height: 35px;
  border-radius: 10px;
  flex-direction: row;
  background-color: rgba(235, 234, 240, 1);
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

const CopyButton = styled.View`
  flex: 1;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: #fcbd3e;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Copy = styled.Text`
  font-size: 13px;
  font-weight: bold;
`;

export default () => {
  return (
    <Wrapper>
      <LinkWrapper>
        <Link numberOfLines={1}>https://stgmuuve.page.link/5SFGTV78SSKJ23</Link>
      </LinkWrapper>
      <CopyButton>
        <Copy>COPY</Copy>
      </CopyButton>
    </Wrapper>
  );
};
