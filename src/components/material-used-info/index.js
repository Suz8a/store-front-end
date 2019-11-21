import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

function MaterialUsado() {
  return (
    <div>
      <Grid>
        <Typography variant="h6" component="h2" style={{ color: "#546E7ADE" }}>
          {" "}
          Material a Utilizar{" "}
        </Typography>
        <Grid container>
          <Grid item style={{ paddingRight: "15px" }}>
            <TextField
              label="Oro (gr)"
              type="number"
              style={{ width: "170px", paddingRight: "15px" }}
            />
            <Input
              placeholder="$"
              type="number"
              style={{ width: 70, paddingTop: "16px" }}
            />
          </Grid>
          <Grid item style={{ paddingRight: "15px" }}>
            <TextField
              label="Bronce (gr)"
              type="number"
              style={{ width: "170px", paddingRight: "15px" }}
            />
            <Input
              placeholder="$"
              type="number"
              style={{ width: 70, paddingTop: "16px" }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item style={{ paddingRight: "15px" }}>
            <TextField
              label="Plata (gr)"
              type="number"
              style={{ width: "170px", paddingRight: "15px" }}
            />
            <Input
              placeholder="$"
              type="number"
              style={{ width: 70, paddingTop: "16px" }}
            />
          </Grid>
          <Grid item style={{ paddingRight: "15px" }}>
            <TextField
              label="Acero Inoxidable (gr)"
              type="number"
              style={{ width: "170px", paddingRight: "15px" }}
            />
            <Input
              placeholder="$"
              type="number"
              style={{ width: 70, paddingTop: "16px" }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MaterialUsado;
