import axios from 'axios';
import React, { useEffect } from 'react';

const Nav = () => {
  useEffect(() => {
    axios.get('http://localhost:3000/api/metrics').then((res) => console.log(res)).catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <p>Nav</p>
    </div>
  );
};

export default Nav;
