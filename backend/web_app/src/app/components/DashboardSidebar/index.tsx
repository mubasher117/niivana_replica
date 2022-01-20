/**
 *
 * DashboardSidebar
 *
 */
import Document from 'app/assets/Document';
import Edit from 'app/assets/Edit';
import Education from 'app/assets/education';
import Home from 'app/assets/Home';
import LiveGroups from 'app/assets/liveGroups';
import Logout from 'app/assets/logout';
import Profile from 'app/assets/Profile';
import { useAuthSlice } from 'app/sharedSlice/auth/slice';
import { useBookingSlice } from 'app/sharedSlice/booking/slice';
import { usePubnubInternalSlice } from 'app/sharedSlice/pubnubInternal/slice';
import { store } from 'index';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { CustomText } from '../CustomText';
import { FlexDiv } from '../FlexDiv';
interface Props {
  children?: React.ReactNode;
}
interface IconWithTextProps {
  Icon: any;
  text?: string;
  textStyle?: {
    margin: string;
    fontSize: string;
    fontWeight: string;
    color: string;
  };
  onClick?: () => void;
}
const IconWithText = ({
  Icon,
  text,
  textStyle,
  onClick = () => {},
}: IconWithTextProps) => {
  const [iconColor, setIconColor] = useState('#19343A');
  return (
    <FlexDiv
      columnGap="10px"
      cursor="pointer"
      onMouseEnter={() => setIconColor('#DB8057')}
      onMouseLeave={() => setIconColor('#19343A')}
      onClick={onClick}
    >
      <FlexDiv cursor="pointer" minWidth="30px">
        <Icon color={iconColor} />
      </FlexDiv>
      {text && (
        <CustomText
          elementName="p"
          color={iconColor}
          cursor="pointer"
          {...textStyle}
        >
          {text}
        </CustomText>
      )}
    </FlexDiv>
  );
};
export const DashboardSidebar = memo(({ children }: Props) => {
  const history = useHistory();
  const { actions: authActions } = useAuthSlice();
  const { actions: bookingActions } = useBookingSlice();
  const { actions: pubnubActions } = usePubnubInternalSlice();

  const dispatch = useDispatch();
  return (
    <Wrapper>
      <SideBar>
        <FlexDiv flexDirection="column" rowGap="20px" alignItems="flex-start">
          <IconWithText Icon={Home} text="Home" />
          <IconWithText Icon={Profile} text="Consults" />
          <IconWithText Icon={LiveGroups} text="Live Groups" />
          <IconWithText Icon={Education} text="Classes" />
          <IconWithText Icon={Document} text="Articles & Videos" />
          <IconWithText Icon={Edit} text="Forum" />
        </FlexDiv>
        <IconWithText
          Icon={Logout}
          text="Logout"
          onClick={async () => {
            store.dispatch({
              type: 'USER_LOGOUT',
            });
            history.replace('/login');
          }}
        />
      </SideBar>
      <Main>{children}</Main>
    </Wrapper>
  );
});
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100vw;
  height: 100%;
`;
const Main = styled.div`
  margin-left: 13vw; /* Same as the width of the sidenav */
  padding: 0px 10px;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #f4f6fa 23.17%, #ffffff 100%);
`;

const SideBar = styled.div`
  height: 85vh;
  width: 13vw;
  position: fixed;
  z-index: 1;
  top: 90px;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  padding: 50px 0px 0px 20px;
  border-right: 1px solid #edf2f7;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
`;
