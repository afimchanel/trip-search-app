import React from 'react';
import { TripCardProps } from '../interfaces/Trip';
import { Link } from 'react-router-dom';
import { Grid, Typography, Box, } from '@mui/material';


const TripCard: React.FC<TripCardProps> = ({ trip, onTagClick }) => {

  const tripImage = trip.photos?.[0] || '/path/to/default-image.jpg';

  return (
    <Box sx={{
      backgroundColor: 'white', borderRadius: '8px', boxShadow: 3, overflow: 'hidden', width: '100%',
      maxWidth: 'sm',
      margin: '0 auto',
    }}>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Left Image Section (Full width on xs, 6 columns on sm and above) */}
        <Grid item xs={12} sm={5}>
          <img
            src={tripImage}
            alt={trip.title}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              aspectRatio: '3 / 4',
              objectFit: 'cover',
              objectPosition: 'center',
              maxHeight: '350px',
            }}
          />
        </Grid>

        {/* Right Content Section (Title, Description, Tags) + Additional Images Section */}
        <Grid item xs={12} sm={7}>
          <Grid container spacing={2}>
            {/* Title Section */}
            <Grid item xs={12}>
              <Link to={trip.url} style={{ textDecoration: 'none' }}>
                <Typography variant="h6" component="h2" color="primary"
                  sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                  }}>
                  {trip.title}
                </Typography>
              </Link>
            </Grid>
            {/* Description Section */}
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {trip.description}
              </Typography>

              <Link to={trip.url} style={{ textDecoration: 'none', color: 'primary.main' }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: 'inline-flex',
                    color: 'primary.main',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                    '&:focus': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  อ่านต่อ
                </Typography>
              </Link>
            </Grid>



            {/* Tags Section */}
            <Grid item xs={12}>
              <Typography variant="body2" component="span" sx={{ marginRight: 1, color: '#dedede' }}>
                หมวด:
              </Typography>
              {trip.tags.map((tag, index) => (
                <React.Fragment key={index}>
                  {/* แสดง Tag */}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      color: '#b3b1b1',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      marginRight: 1,
                    }}
                    onClick={() => onTagClick(tag)}
                  >
                    {tag}
                  </Typography>

                  {index === trip.tags.length - 2 && (
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        color: '#bababa',
                        marginRight: 1,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                      onClick={() => onTagClick(tag)}
                    >
                      และ
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Grid>

            {/* Additional Images Section */}
            <Grid item xs={12}>
              <Grid container spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {trip.photos?.slice(1).map((photo, index) => (
                  <Grid item xs={4} sm={4} md={4} lg={4} key={index}
                    sx={{
                      padding: '4px',
                      '& img': {
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        maxHeight: '150px',
                      },
                    }}>
                    <img
                      src={photo}
                      alt={`Trip Image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        maxHeight: '150px',
                        aspectRatio: '1',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box >
  );
};

export default TripCard;
