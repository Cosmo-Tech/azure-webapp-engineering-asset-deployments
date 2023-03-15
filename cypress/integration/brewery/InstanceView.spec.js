// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import utils from '../../commons/TestUtils';
import { setup } from '../../commons/utils/setup';
import { stub } from '../../commons/services/stubbing';
import { DEFAULT_WORKSPACE } from '../../fixtures/stubbing/default/workspaces';
import { DATASET, RUN_TEMPLATE } from '../../commons/constants/brewery/TestConstants';
import { InstanceVisualization, Scenarios, ScenarioManager, Login } from '../../commons/actions';

Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
});

const BASE_URL = Cypress.config().baseUrl;
const url = BASE_URL + '/' + DEFAULT_WORKSPACE.id;

describe('Instance view disabled', () => {
  before(() => {
    setup.initCypressAndStubbing();
    Login.login(url);
    stub.start();
  });

  beforeEach(() => {
    Login.relogin(url);
  });

  after(() => {
    stub.stop();
  });

  it('does not show the instance view tab if config is invalid', () => {
    InstanceVisualization.getInstanceVisualizationViewTab().should('not.exist');
  });
});

describe('Instance view when enabled', () => {
  before(() => {
    Login.login();
  });

  beforeEach(() => {
    Login.relogin();
  });

  const scenarioNamesToDelete = [];
  after(() => {
    ScenarioManager.deleteScenarioList(scenarioNamesToDelete);
  });

  it('can display a scenario created using an ADT dataset', () => {
    const scenarioName = `Test Cypress - Instance view - ADT dataset - ${utils.randomStr(7)}`;
    scenarioNamesToDelete.push(scenarioName);
    Scenarios.createScenario(scenarioName, true, DATASET.BREWERY_ADT, RUN_TEMPLATE.WITHOUT_PARAMETERS);
    InstanceVisualization.switchToInstanceVisualization();
    InstanceVisualization.getLoadingSpinnerContainer().should('be.visible');
    InstanceVisualization.getLoadingSpinnerContainer(30).should('not.exist'); // 30 seconds timeout
    InstanceVisualization.getPlaceholder().should('not.exist');
    InstanceVisualization.getCytoscapeScene().should('be.visible');
    InstanceVisualization.getDrawer().should('not.exist');
    InstanceVisualization.openDrawer();
    InstanceVisualization.getDrawer().should('be.visible');
    InstanceVisualization.switchToDrawerSettingsTab();
    InstanceVisualization.switchToDrawerDetailsTab();
    InstanceVisualization.closeDrawer();
    InstanceVisualization.getDrawer().should('not.exist');
  });

  // TODO: Add test when Azure Storage instances are better supported. This type of instance currently causes an error
  // of the Function App, and thus can't be tested yet (the webapp does not crash but a placeholder and an error banner
  // are displayed)
});
