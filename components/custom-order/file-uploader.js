import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-translate';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import CenteredBox from '../shared/box/centered-box';
import AddIcon from '@material-ui/icons/Add';
import { useField } from 'formik';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ spacing }) => ({
  dropzone: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
    marginBottom: spacing()
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    position: 'relative',
    justifyContent: 'center',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    '&:hover $thumbBackdrop': {
      opacity: 1
    }
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  thumbBackdrop: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    opacity: 0,
    transition: 'opacity .2s ease-in-out',
    cursor: 'pointer'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
}));

const FileUploader = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  // eslint-disable-next-line
  const [field, meta, helpers] = useField('files');
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      helpers.setValue([
        ...field.value,
        ...acceptedFiles.map((file) => {
          console.log('file', file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file)
          });
        })
      ]);
    }
  });

  const removeFile = (previewId) => {
    helpers.setValue(field.value.filter((file) => file.preview !== previewId));
  };

  const thumbs = field.value.map((file) => (
    <div className={classes.thumb} key={file.preview}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} alt="предпросмотр" />
      </div>
      <div
        className={classes.thumbBackdrop}
        onClick={() => removeFile(file.preview)}
      >
        <IconButton color="inherit">
          <CancelIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      field.value.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [field.value]
  );

  return (
    <section className={classes.container}>
      <div {...getRootProps({ className: classes.dropzone })}>
        <input {...getInputProps()} />
        <p>{t('custom-order:step1.dragDropLabel')}</p>
        <CenteredBox textAlign="center" mb={3}>
          <div>
            <Typography gutterBottom color="textSecondary">
              {t('custom-order:step1.or')}
            </Typography>
            <Button color="primary" variant="outlined">
              <AddIcon /> {t('custom-order:step1.addFileBtn')}
            </Button>
          </div>
        </CenteredBox>
      </div>
      <aside className={classes.thumbContainer}>{thumbs}</aside>
    </section>
  );
};

export default FileUploader;
