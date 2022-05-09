import React from 'react'
import axios from "axios";
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';

export default function AddSlider() {
  const onSubmit = async (event) => {
    event.preventDefault();
    let caption = event.target.caption.value;
    let image = event.target.image.files[0];
   
    let Token = localStorage.getItem("token")
    console.log(Token);
    let formData = new FormData();
    formData.append('caption', caption);
     formData.append('image', image);
    console.log(formData);
 
    try {
      if(Token){

        const results = await axios.post(
          'http://172.104.243.247:8000/api/sliders/',
          formData,
          {headers:{
            "Content-Type" : "multipart/form-data",
            'Authorization': `Bearer ${Token}`
          }}
        );
       
       // //console.log(results.data.message);
       
      }else{
          console.log("back to login");
      }
      
    } catch (err) {
      console.log(err.results.message);
    }
    
  };

 
  return (
    <>
    <Grid container  alignItems="center">
    <Card style={{ maxWidth: 450, padding: "40px 60px", margin: "80px auto" }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
         Add News
      </Typography> 
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          Fill up the form and our team will get back to you within 24 hours.
      </Typography> 
      
        <form onSubmit={onSubmit} >
       
          <Grid container spacing={1}>
           
            <Grid item xs={12}>
              <TextField type="text" name="caption" placeholder="Enter Your Caption" label="Caption" variant="outlined" fullWidth required />
            </Grid>
          
           <Grid item xs={12}>
              <TextField type="file" name="image" placeholder="Enter Your Image" label="Image" variant="outlined" fullWidth required />
            </Grid> 
          
            
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>Add</Button>
            </Grid>
            
          </Grid>
         
        </form>
      
      </CardContent>
    </Card>
  </Grid>
   </>
  )
}
