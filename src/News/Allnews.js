import React from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  TableBody,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: "100%",
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
    margin: "0 auto",
  },
  TextField: {
    margin: "40px 90px",
  },
});

export default function Allnews(props) {

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  
 

  const getNewsData = async () => {
    try {
      const {data} = await axios.get('http://172.104.243.247:8000/api/news/');
      //console.log(data.data);
      setData(data.data)
  } catch (err) {
      console.log(err.data);
  }
  };

  
  
  const deleteNews = async(id)=>{

    console.log(id);
    let Token = localStorage.getItem("token")

    try {
      if(Token){
        const result = await axios.delete(
          `http://172.104.243.247:8000/api/news/${id}`,
          {headers:{
            "Content-Type" : "multipart/form-data",
            'Authorization': `Bearer ${Token}`
          }}
        );
        console.log(result.message);
        getNewsData();
       
      }else{
        console.log("back to login");
      }
      
    } catch (err) {
      console.log(err.results.data);
      
    }
  }
 

  useEffect(() => {
    getNewsData();
  
  }, []);



 
  return (
    <>

      

      <div>
        <h1>data table</h1>

        <TextField
          className={classes.TextField}
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        {/* {product
      .filter((item) => {
        if (search == "") {
          return item;
        } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      })
      .map((item) => {
        return (
          <p>
            {item.name} - {item.price}
          </p>
        );
      })} */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Body</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data&&data
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.body.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
                return false;
  
              })
                .map((item) => {
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.title}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.body}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                        <img src={item.image} width={50} alt="#" />
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">
                      <Link to = {`/editNews/${item.id}`}  style={{ textDecoration: 'none' }} >
                      <Button color="primary"
                          startIcon={<SaveIcon />}
                          variant="contained">Edit</Button>
                      </Link>
                       
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button onClick={ () => deleteNews(item.id) } variant="outlined" startIcon={<DeleteIcon />}>
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
  );
}
