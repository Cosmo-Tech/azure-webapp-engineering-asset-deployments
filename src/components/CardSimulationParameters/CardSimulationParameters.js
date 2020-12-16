import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, MenuItem, Select, Typography } from '@material-ui/core'
import { ButtonRunSimulation } from '../../components'
import apiConfig from '../../service/api'

const useStyles = theme => ({
  card: {
    height: '100%',
    color: '#FFFFFF',
    backgroundColor: theme.palette.background.secondary,
    marginBottom: '8px',
    marginLeft: '4px',
    marginRight: '4px'
  },
  title: {
    margin: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 18,
    padding: 0,
    letterSpacing: 0
  },
  parameter: {
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '16px'
  },
  label: {
    marginRight: '4px'
  },
  select: {
    marginLeft: '8px'
  },
  buttonContainer: {
    marginTop: '16px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

class CardSimulationParameters extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    // Bind methods
    this.onSimulationNameChange = this.onSimulationNameChange.bind(this)
  }

  onSimulationNameChange (event) {
    this.props.onSimulationNameChange(event.target.value)
  }

  render () {
    const { classes } = this.props
    return (
      <Card className={classes.card} raised>
        <Typography variant='h5' component='h2' className={classes.title}>
          Simulation parameters
        </Typography>
        <div className={classes.parameter}>
          <Typography className={classes.label} component='span'>
            Simulation name:
          </Typography>
          <Select
            className={classes.select}
            labelId='simulation-parameters-simulation-name'
            id='simulation-name-select'
            value={ this.props.simulationName }
            onChange={this.onSimulationNameChange}>
            { generateMenuItems(this.props.simulationsList) }
          </Select>
        </div>
        <div className={classes.buttonContainer}>
          <ButtonRunSimulation
            apiConfig={apiConfig}
            simulationName={this.state.simulationName}
          />
        </div>
      </Card>
    )
  }
}

function generateMenuItems (simulations) {
  return simulations.map(simulationName => {
    return (
      <MenuItem key={simulationName} value={simulationName}>
        {simulationName}
      </MenuItem>
    )
  })
}

CardSimulationParameters.propTypes = {
  classes: PropTypes.any,
  simulationsList: PropTypes.array.isRequired,
  simulationName: PropTypes.string.isRequired,
  onSimulationNameChange: PropTypes.func.isRequired
}

export default withStyles(useStyles)(CardSimulationParameters)
