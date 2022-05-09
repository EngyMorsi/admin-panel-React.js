import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {Table,Grid ,Button, TableBody, TextField ,TableCell ,TableContainer ,TableHead ,TableRow ,Paper }from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@mui/icons-material/Delete';


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
export default function Message() {
  const classes = useStyles();
  const [message , setMessages] = useState([]);
  const [search , setSearch] = useState("");
  const getMessages = async () => {
    try {
      const {data} = await axios.get('http://172.104.243.247:8000/api/messages/');
      console.log(data.success);
     setMessages(data.data)
  } catch (err) {
    console.log(err);
  }
  };
  const deleteMessage = async(id)=>{

    console.log(id);
    let Token = localStorage.getItem("token")

    try {
      if(Token){
        const result = await axios.delete(
          `http://172.104.243.247:8000/api/messages/${id}`,
          {headers:{
            "Content-Type" : "multipart/form-data",
            'Authorization': `Bearer ${Token}`
          }}
        );
        console.log(result.status);
        getMessages();
       
      }else{
        console.log("back to DeleteMessag");
      }
      
    } catch (err) {
      console.log(err);
      
    }
  }
  useEffect(()=>{

    getMessages()

  },[])
  return (
    <>
      <div> 
   <Grid>
  <Grid>
  <TextField  className={classes.TextField}
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
         
          onChange={(e) => {
            setSearch(e.target.value);
          }}/>
  </Grid>
</Grid>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>FirstName</StyledTableCell>
            <StyledTableCell>LastName</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Mobile</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {message
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.email.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
              return false;

            })
            .map((item) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.first_name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.last_name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.email}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.mobile}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.description}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.status}
                  </StyledTableCell>
               
                    <StyledTableCell align="right">
                    <Button onClick={ () => deleteMessage(item.id) } variant="outlined" startIcon={<DeleteIcon />}>
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
}
