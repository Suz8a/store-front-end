import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function DetailsTitle(props) {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography
          variant="h6"
          component="h2"
          style={{ width: "253px", height: "33px" }}
        >
          {props.servicio}{" "}
        </Typography>
        <Typography variant="subtitle1" style={{ width: "130px" }}>
          {" "}
          Folio: {props.folio}{" "}
        </Typography>
      </Grid>
    </div>
  );
}

export default DetailsTitle;
