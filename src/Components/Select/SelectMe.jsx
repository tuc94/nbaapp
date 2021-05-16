import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Label } from "@material-ui/icons";
import "./SelectMe.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectMe(props) {
  const data = props.data;
  const label = props.label;
  const state = props.state;
  const setState = props.setState;

  const classes = useStyles();

  const handleChange = (event) => {
    setState(event.target.value);
  };
  return (
    <div>
      <FormControl variant="outlined" className="TextOutline">
        <InputLabel id="demo-simple-select-outlined-label" className="Text">
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state}
          onChange={handleChange}
          label={label}
          className="TextOutline"
        >
          {data.map((option) => {
            return <MenuItem value={option.value}>{option.title}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectMe;
