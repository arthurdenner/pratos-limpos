import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { database } from '../config/firebase';
import Card from './card';

class Statistics extends React.PureComponent {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.interval = setInterval(this.fetchStatistics, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      numberOfEvaluatedSchools: `(${evaluatedSchools} de ${schools.length})`,
      numberOfEvaluations: evaluations.length,
      numberOfUsers: users.length,
      percentageSchools: `${percentage.toFixed(2)}%`,
    })
  }

  render() {
    const {
      averageUsersBySchools,
      isLoading,
      numberOfEvaluatedSchools,
      numberOfEvaluations,
      numberOfUsers,
      percentageSchools,
    } = this.state;

    if (isLoading) {
      return (
        <React.Fragment>
          <LinearProgress />
          <h2 style={{ textAlign: 'center' }}>Carregando estatísticas...</h2>
        </React.Fragment>
      )
    }

    return (
      <div style={{ padding: 20 }}>
        <Card
          title="Média de alunos por escola"
          subtitle={averageUsersBySchools}
        />
        <Card
          title="Avaliações realizadas"
          subtitle={numberOfEvaluations}
        />
        <Card
          title="Usuários cadastrados"
          subtitle={numberOfUsers}
        />
        <Card
          title="Escolas que foram avaliadas ao menos uma vez"
          subtitle={percentageSchools}
          extra={numberOfEvaluatedSchools}
        />
      </div>
    )
  }
}

export default Statistics;
