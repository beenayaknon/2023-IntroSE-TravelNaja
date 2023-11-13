import React, { useEffect, useState } from 'react';
import { ref, onValue, off, push, set, remove, get } from 'firebase/database';
import { db } from '../config';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const GuideList = () => {
  const [guideList, setGuideList] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'Register-guide/');

    const handleData = (snapshot) => {
      const guides = snapshot.val();
      if (guides) {
        const guideArray = Object.values(guides);
        setGuideList(guideArray);
      }
    };
    onValue(dbRef, handleData);

  }, []);

  const handleApprove = (guideId) => {
    const registerGuideRef = ref(db, 'Register-guide/' + guideId);
    get(registerGuideRef).then((snapshot) => {
      const guideData = snapshot.val();
      const approvedGuideRef = ref(db, 'Approved-guide/');
      const newApprovedGuideRef = push(approvedGuideRef);
      set(newApprovedGuideRef, guideData);
  
      remove(registerGuideRef);
    }).catch((error) => {
      console.error('Error getting guide data:', error.message);
    });
  };
  

  const handleDeny = (guideId) => {
    const registerGuideRef = ref(db, 'Register-guide/' + guideId);
    remove(registerGuideRef)
  };


  return (
    <div className="container-fluid">
      <div className="row">
        {/* Navigation Bar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
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
            <h2 className="h2">List of Registered Guides</h2>
          </div>
          <ul className="list-group">
            {guideList.map((guide, index) => (
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

                {/* Approve and Deny Buttons */}
                <div className="mt-2">
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => handleApprove(guide.guideID)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => { handleDeny(guide.guideID) }}
                  >
                    Deny
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default GuideList;

