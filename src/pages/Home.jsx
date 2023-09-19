import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  query,
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, database } from '../firebase';
import { UserAuth } from '../context/AuthContext';
import Comment from './Comment';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import Scroll from '../components/Scroll';



const Home = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const uploadFile = async () => {
    if (!imageUpload || !title || !content || !user) return;
    setIsLoading(true);

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    try {
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);

      await addDoc(collection(database, 'posts'), {
        userId: user.uid,
        title,
        content,
        imageUrl: url,
        authorEmail: user.email,
        authorName: user.displayName,
        timestamp: serverTimestamp(),
      });

      setUploadSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setUploadSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId, postId) => {
    try {
      await deleteDoc(doc(database, 'comments', commentId));

      const updatedData = data.map((item) => {
        if (item.id === postId) {
          const updatedComments = item.comments.filter((comment) => comment.id !== commentId);
          item.comments = updatedComments;
        }
        return item;
      });

      setData(updatedData);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const addComment = async (postId, commentText) => {
    if (!commentText) return;

    try {
      await addDoc(collection(database, 'comments'), {
        postId,
        text: commentText,
        authorName: user.displayName,
        timestamp: serverTimestamp(),
      });

      const updatedData = [...data];
      const postIndex = updatedData.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        const comments = await loadComments(postId);
        updatedData[postIndex].comments = comments;
        setData(updatedData);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const fetchData = async () => {
    try {
      const q = query(collection(database, 'posts'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        const post = { id: doc.id, ...doc.data() };
        post.comments = [];
        items.push(post);
      });
      
      setData(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadComments = async (postId) => {
    try {
      const commentRef = collection(database, 'comments');
      const q = query(commentRef, where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      const commentList = [];
      querySnapshot.forEach((doc) => {
        commentList.push({ id: doc.id, ...doc.data() });
      });
      return commentList;
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <><Scroll/>
      <Container maxWidth="xl" style={{marginTop:'60px'}}>
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card style={{ background: 'linear-gradient(to right, #ff6b6b, #ffcb74)' }}>
                <CardContent>
                <img
                    src={item.imageUrl}
                    alt="ok"
                    style={{ height: '350px', width: '100%', borderRadius: '10px' }}
                  />
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: '24px',
                      fontFamily: 'fantasy',
                      color: 'whitesmoke',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'sans-serif',
                      color: 'whitesmoke',
                      marginBottom: '16px',
                    }}
                  >
                    {item.content}
                  </Typography>                  
                  <Typography variant="caption" color={'whitesmoke'}>
                  Posted by : {item.authorName}
                  </Typography>
                  &nbsp;
                  {user && (
                    <div>
                      {item.comments.map((comment) => (
                        <Comment
                          key={comment.id}
                          comment={comment}
                          onDelete={() => deleteComment(comment.id, item.id)}
                          isCurrentUser={comment.authorName === user.displayName}
                        />
                      ))}

                      <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        value={item.commentText || ''}
                        onChange={(e) => {
                          const updatedData = [...data];
                          const postIndex = updatedData.findIndex((post) => post.id === item.id);
                          if (postIndex !== -1) {
                            updatedData[postIndex].commentText = e.target.value;
                            setData(updatedData);
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <Button
                              style={{ borderRadius: '90px' }}
                              onClick={() => addComment(item.id, item.commentText)}
                              variant="contained"
                              color="primary"
                            >
                              <AddCommentOutlinedIcon />
                            </Button>
                          ),
                        }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;



















/*import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Card, CardContent, Typography, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { query, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, orderBy } from 'firebase/firestore';
import { storage, database } from '../firebase';
import { UserAuth } from '../context/AuthContext';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const Home = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = data.slice(startIndex, endIndex);



  const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;



  const uploadFile = async () => {
    if (!imageUpload || !title || !content || !user) return;
    setIsLoading(true);

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    try {
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);

      await addDoc(collection(database, 'posts'), {
        userId: user.uid,
        title,
        content,
        imageUrl: url,
        authorEmail: user.email,
        authorName: user.displayName,
        timestamp: serverTimestamp(),
      });

      setUploadSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setUploadSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };


  const styles = {
    container: {
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginTop: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'red',
      fontSize: '21px',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(database, 'posts'),
          orderBy('timestamp', 'desc'),
        );
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Container maxWidth="md" style={styles.container}>
      
      </Container>
      <Container maxWidth="md" >
        {displayedItems.map((item) => (
          <Card key={item.id} style={{ margin: '10px 0' }}>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1">{item.content}</Typography>
              <img src={item.imageUrl} alt="ok" style={{ height: '250px', background: 'black' }} />
              <Typography variant="caption">User Name {item.authorName}</Typography>&nbsp;
              <Typography variant="caption">User Email {item.authorEmail}</Typography>
            </CardContent>
          </Card>
        ))}
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={(event, newPage) => {
            setPage(newPage);
            scrollToTop();
          }}
        />
      </Container>
      <footer>
        <Typography variant="caption" align="center">

        </Typography>
      </footer>
    </>
  );
};

export default Home;
*/