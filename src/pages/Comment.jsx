

import React from 'react';
import { Typography, IconButton, Grid, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Comment = ({ comment, onDelete, isCurrentUser }) => {
  const commentStyle = {
    padding: '10px',
    borderRadius: '10px',
    background: 'linear-gradient(to right, #ff6b6b, #ffcb74)', // Customize your gradient colors
  };

  return (
    <Grid container alignItems="center" style={{ marginBottom: '10px', ...commentStyle }}>
      <Grid item xs={8}>
        <Chip label={comment.authorName} variant="filled" color="error" />
        <Typography variant="body1" style={{padding:'6px',color:'whitesmoke' }}>
          {comment.text}
        </Typography>
      </Grid>
      {isCurrentUser && (
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <IconButton onClick={() => onDelete(comment.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default Comment;

/*import React from 'react';
import { Typography, IconButton , Grid, Chip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip'
const Comment = ({ comment, onDelete, isCurrentUser }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <div style={{ flex: 1 }}>
     
      <Chip label={comment.authorName} variant="filled"></Chip><br/>&nbsp;
      <Chip label={comment.text} variant="outlined"></Chip>
       
        <Typography variant="body1"></Typography>
      </div>
      {isCurrentUser && (
        <IconButton onClick={() => onDelete(comment.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
};
export default Comment;*/
