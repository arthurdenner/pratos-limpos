import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { database } from '../config/firebase';

class Statistics extends React.PureComponent {
  state = {

    isLoading: true,
  };

  componentDidMount() {
    this.fetchStatistics();
  }

  fetchStatistics = async () => {
    const evaluationsRef = database.ref('/evaluations').once('value');
    const schoolsRef = database.ref('/schools').once('value');
    const usersRef = database.ref('/users').once('value');

    const [evaluationsSnapshot, schoolsSnapshot, usersSnapshot] = await Promise.all([
      evaluationsRef,
      schoolsRef,
      usersRef,
    ]);
    const evaluations = Object.values(evaluationsSnapshot.val())
    const schools = Object.values(schoolsSnapshot.val())
    const users = Object.values(usersSnapshot.val())

    const evaluatedSchools = evaluations
      .map(ev => ev.idSchool)
      .filter((value, index, self) => self.indexOf(value) === index)
      .length;
    const percentage = parseFloat((evaluatedSchools / schools.length) * 100);

    this.setState({
      averageUsersBySchools: parseFloat(users.length / schools.length).toFixed(2),
      isLoading: false,
      numberOfEvaluations: evaluations.length,
      numberOfUsers: users.length,
      percentageSchools: `${percentage.toFixed(2)}%`,
    })
  }

  render() {
    const { isLoading, ...rest } = this.state;

    if (isLoading) {
      return (
        <React.Fragment>
          <LinearProgress />
          <h2 style={{ textAlign: 'center' }}>Carregando estatísticas...</h2>
        </React.Fragment>
      )
    }

    return (
      <pre>{JSON.stringify(rest, null, 2)}</pre>
    )
  }
}

export default Statistics;
