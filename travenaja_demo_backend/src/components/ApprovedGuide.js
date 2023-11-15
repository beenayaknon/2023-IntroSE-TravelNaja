import React, { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../config';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApprovedGuide.css';

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

    onValue(dbRef, handleData);

    return () => {
      off(dbRef, 'value', handleData);
    };
  }, []);

  return (
    <div className="contain">
      {/* Sidebar */}

        <nav id="sidebar" className="sidebar">
          <h3 style={{
            marginLeft: '3%',
            color: '#ffffff',
          }}>Travel Naja</h3>
          <p style={{
            marginLeft: '3%',
            color: '#ffffff',
            marginBottom: '30%',
            fontSize: 14
          }}>Local guide Management demo</p>
          <ul className="nav flex-column" style={{ height: '100vh', overflowY: 'auto'}}>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Waiting for approval Guide
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="ApprovedGuide">
                Approved Local Guide
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                User Management
              </a>
            </li>
          </ul>
        </nav>


      {/* Main Content */}
      <div className='a'>

        <div className="topbar">
          <h2 className="h2">List of Approved Guides</h2>
        </div>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 main-content">
          <ul className="list-group">
            {approvedGuideList.map((guide, index) => (
              <li key={index} className="list-group-item">
                <div className='bb'>
                  <strong>
                    {guide.firstName} {guide.lastName}
                  </strong>
                </div>
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
