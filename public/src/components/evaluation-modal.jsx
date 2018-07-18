import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  question: {
    margin: '10px 0',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '52%',
    left: '53%',
    transform: 'translate(-52%, -53%)',
  },
});

const EvaluationModal = ({ classes, evaluation, onClose }) => (
  <Modal
    aria-describedby="Modal com avaliação do estudante"
    aria-labelledby="Avaliação de estudante"
    onClose={onClose}
    open
  >
    <div className={classes.paper}>
      {evaluation.map(qa => (
        <div className={classes.question} key={qa.question}>
          <Typography variant="title">
            {qa.question}
          </Typography>
          <Typography variant="subheading">
            {qa.answer}
          </Typography>
        </div>
      ))}
    </div>
  </Modal>
)

export default withStyles(styles)(EvaluationModal);
