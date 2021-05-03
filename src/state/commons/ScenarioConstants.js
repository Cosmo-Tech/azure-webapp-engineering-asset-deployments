// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

// Available scenario statuses
export const SCENARIO_STATUS = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  IDLE: 'IDLE'
};

// Available scenario endpoints
export const SCENARIO_ENDPOINT = {
  FIND_ALL_SCENARIOS: '/api/FindAllScenarios',
  GET_SCENARIO_TREE: '/api/GetScenariosTree',
  FIND_SCENARIO_BY_ID: '/api/FindScenarioById',
  ADD_NEW_SCENARIO: '/api/addNewScenario'
};

// Available scenario actions
export const SCENARIO_ACTIONS_KEY = {
  GET_ALL_SCENARIOS: 'GET_ALL_SCENARIOS',
  SET_ALL_SCENARIOS: 'SET_ALL_SCENARIOS',
  GET_SCENARIO_TREE: 'GET_SCENARIO_TREE',
  SET_SCENARIO_TREE: 'SET_SCENARIO_TREE',
  GET_CURRENT_SCENARIO: 'GET_CURRENT_SCENARIO',
  SET_CURRENT_SCENARIO: 'SET_CURRENT_SCENARIO',
  FIND_SCENARIO_BY_ID: 'FIND_SCENARIO_BY_ID',
  ADD_NEW_SCENARIO: 'ADD_NEW_SCENARIO'
};

// Available scenario types
export const SCENARIO_TYPES = {
  SIMULATION: {
    key: 'simulation',
    trad: 'scenario.type.simulation'
  },
  OPTIMISATION: {
    key: 'optimisation',
    trad: 'scenario.type.optimisation'
  }
};
