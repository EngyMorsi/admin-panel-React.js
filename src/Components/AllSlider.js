import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import {Table,Grid ,Button, TableBody, TextField ,TableCell ,TableContainer ,TableHead ,TableRow ,Paper }from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width:"100%"
   


  },
  body: {
    fontSize: 14,
   
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
   maxWidth: 700,
   margin: "0 auto" ,
  },
  TextField:{
  
    margin:"40px 90px",
    

  },
});



export default function AddSlider() {
  const classes = useStyles();
  const [slides , setSlides] = useState([]);
  const [search , setSearch] = useState("");

  const getSlider = async () => {
    try {
      const {data} = await axios.get('http://172.104.243.247:8000/api/sliders/');
     // console.log(data.data);
     setSlides(data.data)
  } catch (err) {
      console.log(err);
  }
  };
 
  const deleteSlide = async(id)=>{

    console.log(id);
    let Token = localStorage.getItem("token")

    try {
      if(Token){
        const result = await axios.delete(
          `http://172.104.243.247:8000/api/sliders/${id}`,
          {headers:{
            "Content-Type" : "multipart/form-data",
            'Authorization': `Bearer ${Token}`
          }}
        );
        console.log(result.data.message);
        getSlider();
       
      }else{
        console.log("back to Delete");
      }
      
    } catch (err) {
      console.log(err);
      
    }
  }
  useEffect(()=>{

    getSlider()

  },[])
  return (
    <>
    
    <div>
    <h1>data table</h1>
    
    <Grid>
  <Grid>
  <TextField  className={classes.TextField}
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
         
          onChange={(e) => {
            setSearch(e.target.value);
          }}
    
  
        />
    
  </Grid>
  

</Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Caption</StyledTableCell>
            <StyledTableCell align="right">Sliders</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
            <StyledTableCell ></StyledTableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {slides
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.caption.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
              return false;

            })
            .map((item) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.caption}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                   <img src={item.image} width={50} alt="#" />
                  </StyledTableCell>
                
                   
                    <StyledTableCell align="right">
                    <Link to = {`/editSlider/${item.id}`}  style={{ textDecoration: 'none' }} >
                      <Button color="primary"
                          startIcon={<SaveIcon />}
                          variant="contained">Edit</Button>
                      </Link>
                  
                    </StyledTableCell>
                    <StyledTableCell align="right">
                    <Button onClick={ () => deleteSlide(item.id) } variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    </StyledTableCell>
                  </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  </>
  )
 
};

