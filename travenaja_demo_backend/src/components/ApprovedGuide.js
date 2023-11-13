import React, { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../config';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApproveGuide = () => {
  const [approvedGuideList, setApprovedGuideList] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'Approved-guide/');

    const handleData = (snapshot) => {
      const approvedGuides = snapshot.val();
      if (approvedGuides) {
        const approvedGuideArray = Object.values(approvedGuides);
        setApprovedGuideList(approvedGuideArray);
      }
    };

    // Attach an asynchronous callback to read the data
    onValue(dbRef, handleData);

    // Detach the callback when the component unmounts
    return () => {
      off(dbRef, 'value', handleData);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Navigation Bar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Register Local Guide List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="ApprovedGuide">
                  Approved Local Guide List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  User Management
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2 className="h2">List of Approved Guides</h2>
          </div>
          <ul className="list-group">
            {approvedGuideList.map((guide, index) => (
              <li key={index} className="list-group-item">
                <strong>
                  {guide.firstName} {guide.lastName}
                </strong>
                <br />
                <strong>ID Number:</strong> {guide.idNumber}<br />
                <strong>Mobile:</strong> {guide.mobile}<br />
                <strong>Email:</strong> {guide.email}<br />
                <strong>Skills:</strong> {guide.skills}<br />
                <strong>Experiences:</strong> {guide.experiences}<br />
                <strong>Travel Style:</strong> {guide.travelStyle}<br />
                <strong>Tour Program:</strong> {guide.tourProgram}<br />
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default ApproveGuide;
