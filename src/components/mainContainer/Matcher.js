import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import {
  Paper,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7db1b1',
    },
    secondary: {
      main: '#EE8585',
    },
  },
});

const Matcher = () => {
  const { user } = useAuth0();
  const [selected, setSelected] = React.useState([]);
  const [bio, setBio] = React.useState('');
  const [username, setUsername] = React.useState('');

  const getRandomUser = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/profiles/${user.nickname}/random`
      );
      if (res.data) {
        setSelected(res.data.interests);
        setBio(res.data.bio);
        setUsername(res.data.username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="matcher">
      <Paper
        id="matcherPaper"
        elevation={0}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <ThemeProvider theme={theme}>
          <Card id="matchCard">
            <CardMedia
              id="matcherImg"
              component="img"
              image="https://source.unsplash.com/random" //temp
              alt="user image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {username}
              </Typography>
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                Interests:
              </Typography>
              <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                {selected.map((interest) => {
                  return (
                    <Chip
                      className="matchChip"
                      variant="outlined"
                      label={interest}
                      color="default"
                      key={interest}
                    >
                      {interest}
                    </Chip>
                  );
                })}
              </div>
              <Typography variant="h6" style={{ textAlign: 'left' }}>
                Bio:
              </Typography>
              <Typography style={{ textAlign: 'left' }}>{bio}</Typography>
            </CardContent>
          </Card>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'nowrap',
              justifyContent: 'center',
            }}
          >
            <IconButton className="matchBtn" size="large" color="secondary">
              <ThumbDownAltRoundedIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              className="matchBtn"
              size="large"
              color="primary"
              onClick={getRandomUser}
            >
              <ThumbUpAltRoundedIcon fontSize="inherit" />
            </IconButton>
          </div>
        </ThemeProvider>
      </Paper>
    </div>
  );
};

export default Matcher;
