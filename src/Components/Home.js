import React from "react";
import{ Typography ,Paper,Grid}  from "@material-ui/core";


export default function Home() {

  return (
    <>
      <section >
        <div className="admin-card">
    
          <Grid container>
            <Grid item xs={12} sm={6} md={4}>
              <Paper>
               <Typography>
                 hello
               </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper>
              <Typography>
                 hello
               </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper>hello</Paper>
            </Grid>
          </Grid>
 
        </div>
      </section>
    </>
  );
}
