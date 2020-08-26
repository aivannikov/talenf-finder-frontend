import React, { useState, useLayoutEffect, useRef } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function parseResponse(data) {
   let tableData = [];
   data.forEach(el => {
     tableData.push({
       firstName: el.attributes.firstName,
       lastName: el.attributes.lastName,
       email: el.attributes.email,
       skills: el.attributes.skills.toString() 
     })
   });
   
   return tableData;
  
}


export default function CandidatesTable(props) {
  const columns = [
    { title: 'Firstname', field: 'firstName' },
    { title: 'Lastname', field: 'lastName' },
    { title: 'Email', field: 'email' },
    {
      title: 'Skills',
      field: 'skills'

    }
  ]; 
  
  const [state, setState] = useState({
    
    data: [
      
    ]
  });

  const firstUpdate = useRef(true);
useLayoutEffect(() => {
  if (firstUpdate.current) {
      firstUpdate.current = false;
      axios.get('/api/candidates')
        .then((res) => {
          if(res.status == 200){
            let tableData = parseResponse(res.data.data);
            setState({data: tableData});
          }
        });

  }
  else {
    if(props.candidatesSkills){
      axios.get(`/api/candidates?skills=${props.candidatesSkills}`)
        .then((res) => {
          if(res.status == 200){
            let tableData = parseResponse(res.data.data);
            setState({data: tableData});
          }
        }); 
    }
  }
}, [props.candidatesSkills]);

  


  return (
    <MaterialTable
      icons={tableIcons}  
      title="Available Candidates"
      columns={columns}
      data={state.data}
      options={{
        search: false
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}