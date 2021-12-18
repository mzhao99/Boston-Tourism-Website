import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import ScrollToTop from './components/mainpages/ScrollToTop'

function App() {
  return (
    <DataProvider>
      <Router>
        {/* <ScrollToTop /> */}
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;