import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Images from '@assets';
import { NavigationActions } from 'react-navigation';

const Container = styled.View`
  flex: 1.5;
  justify-content: center;
  flex-direction: row;
`;

const LeftView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CenterView = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;

const RightView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled.TouchableOpacity``;

const BackImg = styled.Image`
  width: 12px;
  height: 17px;
`;

const NaviHeader = ({ centerView, onBack }) => (
  <Container>
    <LeftView>
      <BackBtn onPress={onBack}>
        <BackImg source={Images.bt_back} />
      </BackBtn>
    </LeftView>
    <CenterView>{centerView()}</CenterView>
    <RightView />
  </Container>
);

NaviHeader.propTypes = {
  centerView: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default NaviHeader;
