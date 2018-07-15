import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EvaluationModal from './evaluation-modal';
import MySnackbarContent from './snackbar';
import { database } from '../config/firebase';
import LABELS from '../utils/labels';

const formatDate = date => date.split('-').reverse().join('/');

class SelectedSchool extends React.PureComponent {
  state = {
    errorMessage: '',
    evaluations: [],
    isLoading: true,
    selectedEvaluation: null,
    showError: false,
  };

  componentDidMount() {
    this.fetchSchool();
  }

  fetchSchool = () => {
    const { selectedSchool } = this.props;

    database.ref('evaluations')
      .orderByChild('idSchool')
      .equalTo(selectedSchool._id)
      .once('value')
      .then(snapshot => {
        const evaluations = Object.values(snapshot.val() || {})
          .map(ev => ({
            ...ev,
            evaluation: Object.entries(ev.evaluation).map(([key, value]) => ({
              question: LABELS[key],
              answer: LABELS[value],
            })).reverse(),
          }));

        this.setState({
          evaluations,
          isLoading: false,
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMessage: 'Não foi possível obter as avaliações',
          isLoading: false,
          showError: true,
        })
      })
  }

  onCloseSnackbar = () => {
    this.setState({
      errorMessage: '',
      showError: false,
    })
  }

  onCloseModal = () => {
    this.setState({ selectedEvaluation: null })
  }

  onOpenModal = selectedEvaluation => {
    this.setState({ selectedEvaluation });
  }

  render() {
    const {
      errorMessage,
      evaluations,
      isLoading,
      selectedEvaluation,
      showError,
    } = this.state;
    const { onUnselectSchool, selectedSchool } = this.props;
    const numberOfEvaluations = evaluations.length - 1;

    if (isLoading) {
      return (
        <React.Fragment>
          <LinearProgress />
          <h2 style={{ textAlign: 'center' }}>Carregando avaliações...</h2>
        </React.Fragment>
      )
    }

    return (
      <div>
        {selectedEvaluation && (
          <EvaluationModal
            evaluation={selectedEvaluation}
            onClose={this.onCloseModal}
          />
        )}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              aria-label="Menu"
              color="inherit"
              onClick={onUnselectSchool}
              style={{ marginLeft: -12, marginRight: 20 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              Avaliações na escola {selectedSchool.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showError}
          autoHideDuration={2000}
          onClose={this.onCloseSnackbar}
        >
          <MySnackbarContent
            onClose={this.onCloseSnackbar}
            variant="error"
            message={errorMessage}
          />
        </Snackbar>
        <List>
          {evaluations.length > 0 ?
            evaluations.map((ev, idx) => (
              <React.Fragment key={ev.idUser_date}>
                <ListItem button onClick={() => this.onOpenModal(ev.evaluation)}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={`Avaliação do dia ${formatDate(ev.date)}`} />
                </ListItem>
                {idx < numberOfEvaluations && <Divider />}
              </React.Fragment>
            ))
            : (
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Nenhuma avaliação encontrada" />
              </ListItem>
            )}
        </List>
      </div >
    )
  }
}

export default SelectedSchool;
