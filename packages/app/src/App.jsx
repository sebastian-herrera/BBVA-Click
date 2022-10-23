import React from 'react';

import { GoogleMaps } from '@/components';
// import ShowInfo from '@/components/ShowInfo';
import ShowInfo from '@/components/ShowInfo/ShowInfo';

function App() {
  return (
    <div className="App">
      <GoogleMaps />
      <ShowInfo />
    </div>
  );
}

export default App;
