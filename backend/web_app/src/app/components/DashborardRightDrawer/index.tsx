/**
 *
 * DashborardRightDrawer
 *
 */
import React, { memo, useState } from 'react';
import styled from 'styled-components/macro';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// import { Button, Form, Text } from 'shared/components';
// import FormInput from 'shared/components/form/input/input';
// import style from './style.scss';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { CustomText } from '../CustomText';
import CustomButton from '../CustomButton';
// import styled from '@emotion/styled';
interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles({
  list: {
    width: '25vw',
  },
  fullList: {
    width: 'auto',
  },
  drawerPaper: {
    top: '90px !important',
  },
});
const FormActionsContainer = styled.div`
  position: sticky;
  bottom: 0;
  padding: 10px;
  background-color: white;
  border-top: 1px solid grey;
`;

const FormHeaderContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 10px;
  background-color: white;
`;

export const DashborardRightDrawer = memo(
  ({ open, onClose, children }: Props) => {
    const classes = useStyles();
    const drawerRef = React.useRef<HTMLDivElement>(null);

    const toggleDrawer = () => event => {
      if (
        (event.type === 'click' &&
          drawerRef.current &&
          drawerRef.current.contains(event.target)) ||
        (event.type === 'keydown' && event.key !== 'Escape')
      ) {
        return;
      }

      onClose();
    };

    return (
      <Drawer
        anchor="right"
        open={open}
        BackdropProps={{
          invisible: true,
        }}
        onClose={toggleDrawer()}
        classes={{
          paper: clsx(classes.drawerPaper),
        }}
      >
        <div
          className={clsx(classes.list)}
          onClick={toggleDrawer()}
          onKeyDown={toggleDrawer()}
          style={{ padding: 20 }}
          ref={drawerRef}
        >
          {children}
        </div>
      </Drawer>
    );
  },
);

const Div = styled.div``;
