import React, {Component} from 'react';
import ParseRupiah from './ParseRupiah';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="body">
        <div className="header">
          <h1>Rupiah Parser</h1>
        </div>
        <ParseRupiah />
        <div className="footer">
          <p>By Ev Robinson</p>
        </div>
      </div>
    );
  }
}

export default App;
