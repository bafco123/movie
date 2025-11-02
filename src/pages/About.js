import React from 'react';
export default function About(){
  return (
    <>
      <h2>About MovieBox</h2>
      <p>Simple movie review platform for your lab. Uses OMDb for movie data and Firebase for storing reviews.</p>
      <ul>
        <li>Frontend: React + Bootstrap</li>
        <li>Backend: Node + Express (proxy + reviews API)</li>
        <li>Database: Firebase Firestore</li>
      </ul>
    </>
  );
}
