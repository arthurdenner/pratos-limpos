import * as React from 'react';
import SchoolsList from './components/schools-list';
import SelectedSchool from './components/selected-school';

class App extends React.PureComponent {
  state = {
    selectedSchool: null,
  };

  onSelectSchool = selectedSchool => {
    this.setState({ selectedSchool })
  }

  onUnselectSchool = () => {
    this.setState({ selectedSchool: null })
  }

  render() {
    const { selectedSchool } = this.state;

    return (
      <div className="App">
        {!selectedSchool && (
          <SchoolsList
            onCloseSnackbar={this.onCloseSnackbar}
            onSelectSchool={this.onSelectSchool}
          />
        )}
      </div>
    );
  }
}

export default App;
