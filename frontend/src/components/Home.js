import React, { useState, useEffect } from 'react';

function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  const courses = [
    { name: "DevOps", desc: "Docker, Kubernetes, Jenkins, AWS" },
    { name: "Mainframes", desc: "COBOL, JCL, DB2, CICS" },
    { name: "Java Full Stack", desc: "Spring Boot + React" },
    { name: "Data Science", desc: "Python, ML, Power BI" }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white p-16 rounded-3xl text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Tech Expert Solutions</h1>
        <p className="text-2xl">Expert Training | 100% Placements | Industry Ready Courses</p>
      </div>

      {/* Courses */}
      <h2 className="text-3xl font-bold mb-8 text-center">Our Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <div key={i} className="bg-white border p-6 rounded-2xl shadow hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-2">{c.name}</h3>
            <p className="text-gray-600">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Placed Students */}
      <h2 className="text-3xl font-bold mt-16 mb-8 text-center">Our Placed Students</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {students.slice(0, 6).map(s => (
          <div key={s.id} className="bg-white p-6 rounded-2xl shadow">
            <p className="font-semibold">{s.name}</p>
            <p className="text-sm text-gray-500">{s.course} • {s.email}</p>
            <p className="text-green-600 text-xs mt-2">Placed in Top Companies</p>
          </div>
        ))}
      </div>

      <p className="text-center mt-10 text-gray-500">More than 500+ students placed successfully!</p>
    </div>
  );
}

export default Home;
