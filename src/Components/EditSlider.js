import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Input,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const initialState = {
  caption: "",
  image: "",
};


export default function EditSlider() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [didMount, setDidMount] = useState(false);
  const [formValues, setFormValues] = useState(initialState);
 


  const { caption, image } = formValues;
  let Token = localStorage.getItem("token");

  const onSubmit = async (e) => {
    e.preventDefault();
    const caption = e.target.caption.value;
    const image = e.target.image.files[0];
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);

    let formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      if (Token) {
        const results = await axios.put(
          `http://172.104.243.247:8000/api/sliders/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        navigate("/Allslider");
        console.log(results);
      } else {
        console.log("back to update");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getDataID = async () => {
      try {
        if (Token) {
          const { data } = await axios.get(
            `http://172.104.243.247:8000/api/sliders/${id}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          setFormValues(data.data);
        } else {
          console.log("back to login");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDataID();
  }, [Token, id]);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <>
      <Grid container alignItems="center">
        <Card
          style={{ maxWidth: 450, padding: "40px 60px", margin: "80px auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Edit To Your Slider
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form and our team will get back to you within 24
              hours.
            </Typography>

            <form onSubmit={onSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    value={caption}
                    name="caption"
                    type="text"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Enter Your Title"
                    label="title"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    accept="image/*"
                    name="image"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    UpDate
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
