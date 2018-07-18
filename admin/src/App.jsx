import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SchoolsList from './components/schools-list';
import SelectedSchool from './components/selected-school';
import Statistics from './components/statistics';

class App extends React.PureComponent {
  state = {
    currentView: 'schools',
    selectedSchool: null,
  };

  handleChangeTab = (event, value) => {
    this.setState({ currentView: value });
  }

  onSelectSchool = selectedSchool => {
    this.setState({ selectedSchool })
  }

  onUnselectSchool = () => {
    this.setState({ selectedSchool: null })
  }

  render() {
    const { currentView, selectedSchool } = this.state;

    return (
      <div className="App">
        <AppBar position="static">
          <Tabs value={currentView} onChange={this.handleChangeTab}>
            <Tab label="Lista de Escolas" value="schools" />
            <Tab label="Estatísticas" value="statistics" />
          </Tabs>
        </AppBar>
        {currentView === 'schools' && (
          <div>
            {!selectedSchool && (
              <SchoolsList
                onCloseSnackbar={this.onCloseSnackbar}
                onSelectSchool={this.onSelectSchool}
              />
            )}
            {selectedSchool && (
              <SelectedSchool
                onUnselectSchool={this.onUnselectSchool}
                selectedSchool={selectedSchool}
              />
            )}
          </div>
        )}
        {currentView === 'statistics' && (
          <Statistics />
        )}
      </div>
    );
  }
}

export default App;
