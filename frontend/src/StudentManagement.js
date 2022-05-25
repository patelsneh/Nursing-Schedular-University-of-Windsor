import React, { useState, useEffect } from 'react';
import "./css/nav.css";
import "./css/button.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { confirm } from "react-confirm-box";
import 'mdbreact/dist/css/mdb.css';
import { MDBDataTableV5 } from 'mdbreact';
const StudentManagement = () => {
    const [placementLocation, setPlacementLocation] = useState([]);
    useEffect(() => {
        load_data();
    }, []);
    const deletePlacementLocation = async (e) => {
        const result = await confirm("Are you sure do you want to delete?");
        if (result) {
            var id = e;
            try {
                let res = await fetch(`http://localhost:3000/deletePlacementLocation/${id}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
                let result = await res.json();
                alert(result.msg);
                load_data();
            }
            catch (e) {
                console.log(e);
            }
            return;
        }
    }
    const load_data = async () => {
        try {
            let res = await fetch('http://localhost:3000/load_placement_location', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();
            console.log(result.data);
            setPlacementLocation(result.data);
            // setPlacementLocation(result.data1);
            // setPlacementLocation(result.data1);


        }
        catch (e) {
            console.log(e);
            this.resetForm();
        }
    }

//DATA TABLE

const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Term',
        field: 'term',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'SchoolName',
        field: 'schoolName',
        width: 270,
      },
      {
        label: 'FirstName',
        field: 'firstName',
        width: 200,
      },
      {
        label: 'LastName',
        field: 'lastname',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Student Number',
        field: 'studentNumber',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: [
        {
          firstName: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          salary: '$320',
        },
        {
          name: 'Garrett Winters',
          position: 'Accountant',
          office: 'Tokyo',
          age: '63',
          date: '2011/07/25',
          salary: '$170',
        },
    ],
});
    
    return (
        <div>

            <div style={{margin: "10px"}}>
                <Link to='/AddStudentRecord' class='btn btn-primary'>Add Student Record</Link>
            </div>
            <MDBDataTableV5
      hover
      entriesOptions={[5, 20, 25]}
      entries={5}
      pagesAmount={4}
      data={datatable}
      pagingTop
      searchTop
      searchBottom={false}
      barReverse
    />
            {/* <h1>Hello From PlacementLocation</h1> */}
            {/* <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Hospital Name</th>
                        <th>Unit</th>
                        <th>Instructor Name</th>
                        <th>Section</th>
                        <th>Day</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody> */}
            {/* {placementLocation.map((placementLocation, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{placementLocation.hospital_name}</td>
                            <td>{placementLocation.unit}</td>
                            <td>{placementLocation.Instructor_name}</td>
                            <td>{placementLocation.section}</td>
                            <td>{placementLocation.day}</td>
                            <td>{placementLocation.comments}</td>
                            {/* <td><Link to={`/EditInstructors/${instructors.Id}`} class='fa fa-pencil-square'></Link></td> */}
            {/* <td onClick={e => deletePlacementLocation(placementLocation.Id)}><i class="fa fa-trash" aria-hidden="true"></i></td>
                        </tr>

                    ))}
                </tbody>
            // </Table> */}
        </div>
    );
}
export default StudentManagement;