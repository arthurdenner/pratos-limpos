import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import DomainIcon from '@material-ui/icons/Domain';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MySnackbarContent from './snackbar';
import { database } from '../config/firebase';

class SchoolsList extends React.Component {
  state = {
    errorMessage: '',
    filterValue: '',
    isLoading: true,
    showError: false,
    schools: [],
  };

  componentDidMount() {
    this.fetchSchools();
  }

  fetchSchools = () => {
    database.ref('schools').once('value')
      .then(snapshot => {
        this.setState({
          isLoading: false,
          schools: Object.values(snapshot.val() || {}),
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errorMessage: 'Não foi possível obter as escolas',
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

  handleFilterChange = (evt) => {
    this.setState({ filterValue: evt.target.value });
  }

  render() {
    const { errorMessage, filterValue, isLoading, schools, showError } = this.state;
    const { onSelectSchool } = this.props;

    if (isLoading) {
      return (
        <React.Fragment>
          <LinearProgress />
          <h2 style={{ textAlign: 'center' }}>Carregando escolas...</h2>
        </React.Fragment>
      )
    }

    const filteredSchools = schools.filter(
      s => s.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    const numberOfSchools = filteredSchools.length - 1;

    return (
      <div>
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              Lista de escolas
              </Typography>
            <Input
              onChange={this.handleFilterChange}
              value={filterValue}
              style={{ color: '#FFFFFF' }}
              placeholder="Filtrar escolas"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Toolbar>
        </AppBar>
        <List>
          {filteredSchools.length > 0 ?
            filteredSchools.map((s, idx) => (
              <React.Fragment key={s._id}>
                <ListItem button onClick={() => onSelectSchool(s)}>
                  <ListItemIcon>
                    <DomainIcon />
                  </ListItemIcon>
                  <ListItemText primary={s.name} secondary={`${s.address} - ${s.city}`} />
                </ListItem>
                {idx < numberOfSchools && <Divider />}
              </React.Fragment>
            ))
            : (
              <ListItem>
                <ListItemIcon>
                  <DomainIcon />
                </ListItemIcon>
                <ListItemText primary="Nenhuma escola encontrada" />
              </ListItem>
            )}
        </List>
      </div>
    )
  }
}

export default SchoolsList;
