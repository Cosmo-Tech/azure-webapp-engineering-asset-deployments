// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';

import { connect, useSelector } from 'react-redux';
import ScenarioParameterInput from './ScenarioParameterInput';
import { PermissionsGate } from '@cosmotech/ui';
import { ConfigUtils } from '../../../../utils';
import PropTypes from 'prop-types';
import { t } from 'i18next';

const ScenarioParametersTab = ({ parametersGroupData, context, userAppRoles }) => {
  const noPermissionsPlaceHolder = (t) => {
    return <div>{t('genericcomponent.text.scenario.parameters.tabs.placeholder')}</div>;
  };

  const scenarioId = useSelector((state) => state.scenario?.current?.data?.id);
  const authorizedRoles = ConfigUtils.getParametersGroupAttribute(parametersGroupData, 'authorizedRoles');
  const isParameterVisible = (parameter) => ConfigUtils.getParameterAttribute(parameter, 'hidden') !== true;

  const groupContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  };

  return (
    <PermissionsGate
      RenderNoPermissionComponent={() => noPermissionsPlaceHolder(t)}
      necessaryPermissions={authorizedRoles}
      sufficientPermissions={authorizedRoles}
      userPermissions={userAppRoles}
    >
      <div key={parametersGroupData.id} style={groupContainerStyle}>
        {parametersGroupData.parameters
          .filter((parameter) => isParameterVisible(parameter))
          .map((parameterData) => (
            <ScenarioParameterInput
              key={`${scenarioId}_${parameterData.id}`}
              parameterData={parameterData}
              context={context}
            />
          ))}
      </div>
    </PermissionsGate>
  );
};

ScenarioParametersTab.propTypes = {
  parametersGroupData: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  userAppRoles: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  userAppRoles: state.auth.roles,
});

export default connect(mapStateToProps)(ScenarioParametersTab);
