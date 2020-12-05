import { makeStyles } from '@material-ui/core';

export const useRichTextStyles = makeStyles(
  ({ typography, palette, spacing }) => ({
    block: {
      '& p': {
        ...typography.body1,
        fontWeight: 300,
        marginBottom: spacing()
      },
      '& h1': {
        ...typography.h1
      },
      '& h2': {
        ...typography.h2
      },
      '& h3': {
        ...typography.h3
      },
      '& h4': {
        ...typography.h4
      },
      '& h5': {
        ...typography.h5
      },
      '& h6': {
        ...typography.h6
      },
      '& a': {
        color: palette.secondary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  })
);
