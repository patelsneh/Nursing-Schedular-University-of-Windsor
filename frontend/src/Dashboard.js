import React from 'react';
import Hospital from './Hospital';
import Navbar from './Navbar';
import {Routes,Route} from "react-router-dom"

export class Dashboard extends React.Component {
  render() {
    return (<>   <Navbar/> <Routes>
        <Route exact path="/">
        </Route>
      <Route path="/Hospital" element={<Hospital />}>
        </Route>
      </Routes> </>
           
    )
  }
}
export default Dashboard;

