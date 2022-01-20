/**
 *
 * Modal
 *
 */
import Dialog from '@material-ui/core/Dialog';
// import { withStyles } from 'material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  minHeight?: string;
  maxHeight?: string;
  children?: React.ReactNode;
  padding?: string | number;
}

const Modal = ({
  open,
  handleClose,
  minHeight,
  maxHeight,
  children,
  padding,
}: Props) => {
  const useStyles = makeStyles({
    dialogPaper: {
      minHeight: minHeight || '80vh',
      maxHeight: maxHeight || '80vh',
      padding: padding || 20,
    },
  });
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      classes={{ paper: classes.dialogPaper }}
    >
      {children}
    </Dialog>
  );
};

export default Modal;
