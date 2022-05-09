import React from 'react';
import { useState, useEffect } from "react";
import {
  Table,
  Grid,
  Button,
  TableBody,
  TextField,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";


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
export default function Admins() {
    const classes = useStyles();
    const [user, setUser] = useState([]);
    const [search, setSearch] = useState("");
  
    let Token = localStorage.getItem("token");
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "http://172.104.243.247:8000/api/admins/",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        //console.log(data.data);
        setUser(data.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const deleteUser = async (id) => {
      console.log(id);
  
      try {
        if (Token) {
          const results = await axios.delete(
            `http://172.104.243.247:8000/api/admins/${id}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          console.log(results.data);
          getUser();
        } else {
          console.log("back to Delete");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getUser();
    });
  return (
    <>
    <div>
      <h1>data table</h1>

      <Grid>
        <Grid>
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
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>username</StyledTableCell>
              <StyledTableCell align="right">fullName</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user
              .filter((item) => {
                if (search === "") {
                  return item;
                } else if (
                  item.username.toLowerCase().includes(search.toLowerCase())
                ) {
                  return item;
                }
                return false;
              })
              .map((item) => {
                return (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.username}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.full_name}
                    </StyledTableCell>

                    <StyledTableCell align="right">
                      <Link to={"/"} style={{ textDecoration: "none" }}>
                        <Button
                          color="primary"
                          startIcon={<SaveIcon />}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => deleteUser(item.id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
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
