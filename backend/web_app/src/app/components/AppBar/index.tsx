import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  alpha,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ReactComponent as CalendarIcon } from 'app/assets/calendar.svg';
import CalendarOutline from 'app/assets/CalendarOutline';
import ChatIcon from 'app/assets/Chat';
import Money from 'app/assets/money';
import Notification from 'app/assets/Notification';
import ProviderAvatar from 'app/assets/provider-avatar.png';
import Star from 'app/assets/Star';
import Video from 'app/assets/Video';
import { Chat } from 'app/pages/Chat/Loadable';
import { ChatWrapper } from 'app/pages/ChatWrapper/Loadable';
import { Conversation } from 'app/pages/HomePage/Conversation/Loadable';
import { selectUser } from 'app/sharedSlice/auth/slice/selectors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomText } from '../CustomText';
import { DashborardRightDrawer } from '../DashborardRightDrawer';
import { FlexDiv } from '../FlexDiv';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    niivanaAppbar: {
      height: 90,
      backgroundColor: 'white !important',
      display: 'flex',
      borderBottom: '1px solid #EDF2F7',
      justifyContent: 'center',
      zIndex: 1400,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        columnGap: 30,
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);
interface IconButtonWithTextProps {
  Icon: any;
  text?: string;
  onClick?: () => void;
  textStyle?: {
    margin: string;
    fontSize: string;
    fontWeight: string;
    color: string;
  };
}
const IconButtonWithText = ({
  Icon,
  text,
  textStyle,
  onClick,
}: IconButtonWithTextProps) => {
  const [iconColor, setIconColor] = useState('#19343A');
  return (
    <FlexDiv
      flexDirection="column"
      rowGap="10px"
      cursor="pointer"
      onClick={onClick}
      onMouseEnter={() => setIconColor('#DB8057')}
      onMouseLeave={() => setIconColor('#19343A')}
    >
      <FlexDiv height="30px">
        <Icon color={iconColor} />
      </FlexDiv>
      {text && (
        <CustomText elementName="p" color={iconColor} {...textStyle}>
          {text}
        </CustomText>
      )}
    </FlexDiv>
  );
};
export default function Header() {
  const user = useSelector(selectUser);
  const [openDrawer, setOpenDrawer] = useState<null | 'ChatDrawer'>(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.niivanaAppbar}>
        <Toolbar>
          <img src={ProviderAvatar} alt="Logo" />

          <div className={classes.search}>
            <CustomText
              elementName="h3"
              color="black"
              fontFamily="'Roboto', sans-serif"
              fontSize="26px"
            >
              Hi {user?.name}
            </CustomText>
            <FlexDiv
              columnGap="10px"
              justifyContent="flex-start"
              margin="8px 0px 0px 0px"
            >
              <CalendarIcon />
              <CustomText
                elementName="p"
                color="#DB8057"
                fontFamily="'Roboto', sans-serif"
                fontSize="14px"
              >
                MON 2 OCT
              </CustomText>
            </FlexDiv>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButtonWithText Icon={CalendarOutline} text="Calendar" />
            <IconButtonWithText Icon={Video} text="Video" />
            <IconButtonWithText
              Icon={ChatIcon}
              text="Chat"
              onClick={() => setOpenDrawer('ChatDrawer')}
            />
            <IconButtonWithText Icon={Money} text="Payments" />
            <IconButtonWithText Icon={Star} text="Reviews" />
            <IconButtonWithText Icon={Notification} />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <DashborardRightDrawer
        open={openDrawer === 'ChatDrawer'}
        onClose={() => setOpenDrawer(null)}
      >
        <ChatWrapper />
      </DashborardRightDrawer>
    </div>
  );
}
