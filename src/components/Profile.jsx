import React, { useState, useEffect } from 'react';
import '../components/Profile.css'
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Menu,
  MenuItem,
  IconButton, 
  Avatar,
  Divider,
} from '@mui/material';
import { UserAuth } from '../context/AuthContext';
import { useAuth, upload } from '../firebase';
import { CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { database } from '../firebase';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AnimatedLogo from '../pages/Animaton'

const styles = {
    Avatar: {
      width: '100px',
      height: '100px',
      marginBottom: '10px',
      borderRadius: '50%',
      cursor: 'pointer',
    },
    FirstVisitContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    GridItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Card: {
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.05)', 
      },
    },}
const ProfileUpdate = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    'https://i.postimg.cc/t4yQKtGb/wall.png'
  );
  const { user } = UserAuth();
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [firstVisit, setFirstVisit] = useState(true);
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  async function handleClick() {
    setLoading(true);
    await upload(photo, currentUser, setLoading);
    setLoading(false);
  }

  const handleMenuOpen = (postId, event) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const postRef = doc(database, 'posts', postId);
      await deleteDoc(postRef);
      setData((prevData) => prevData.filter((item) => item.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          return;
        }

        const q = query(
          collection(database, 'posts'),
          where('userId', '==', user.uid)
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
  }, [user]);
  useEffect(() => {
    
    const visitTimeout = setTimeout(() => {
      setFirstVisit(false);
    }, 3000); 

    return () => clearTimeout(visitTimeout);
  }, []);
  return (
    <>
    {firstVisit ? (
      <div style={styles.FirstVisitContainer}>


<div class="first-intro">
  <div class="intro-fill">
    <span class="tf-user-welcome welcome-1">Hi {user?.displayName}!</span>
    <span class="tf-user-welcome welcome-2">Welcome to Bloger</span>
    <span class="tf-user-welcome welcome-3">We’re delighted to be at your Service</span>
  </div>
</div>
        <Typography variant="h5" gutterBottom>
          Welcome, {user?.displayName}!
        </Typography>
        <Typography variant="body2" gutterBottom>
          Thanks for joining.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Enjoy your first visit!
        </Typography>
      </div>
    ) : (
      <Container maxWidth="xl" style={{ padding: '30vh', background: '#dff2f7' }}>
        <Container maxWidth="xl" style={styles.FirstVisitContainer}>
          <Avatar src={user?.photoURL} alt="Profile" style={styles.Avatar} />
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {user?.displayName}
          </Typography>
          <Typography variant="body2">{user?.email}</Typography>
          <Typography variant="body2">
            {user?.emailVerified ? 'Email Verified' : 'Email not Verified'}
          </Typography>
        </Container>
        <Container
          maxWidth="xl"
          style={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            display: '-ms-inline-flexbox',
          }}
        >
       <Typography variant="h5" gutterBottom className="animated-text">
        Welcome, {user?.displayName}!
      </Typography>
      <Typography variant="body2" className="animated-text" gutterBottom>
        Thanks for joining.
      </Typography>
      <Typography variant="body2" className="animated-text"  gutterBottom>
        Enjoy your first visit!
      </Typography>
        </Container>       
      </Container>
    )}
  </>
  );
};

export default ProfileUpdate;
