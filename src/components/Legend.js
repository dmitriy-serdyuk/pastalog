import React, { PropTypes } from 'react';
import { getUUID, stringToColor } from 'lib';
import { isSeriesEnabled, mapSeries } from './../state/helpers';

function Legend(props) {
  const state = props.state;
  const disabled = state.get('disabled');
  const logs = state.get('logs');
  if (logs === undefined) {
    return (<div></div>);
  }
  const legendItems = mapSeries(state.get('logs'), (modelName, seriesName) => {
    const uuid = getUUID(modelName, seriesName);
    const color = stringToColor(uuid);
    const enabled = isSeriesEnabled(disabled, modelName, seriesName);
    const toggle = () => {
      const type = (enabled) ? 'DISABLE' : 'ENABLE';
      props.store.dispatch({
        type,
        category: 'uniques',
        id: uuid,
      });
    };
    return (
    <li key={uuid} onClick={toggle} className={enabled ? 'activated clearfix' : 'deactivated clearfix'}>
      <span className="h4">{modelName} - {seriesName}</span>
      <span className="bullet left" style={{ color, fontSize: 32, lineHeight: 0.5 }}> &bull; </span>
    </li>);
  });

  return (
  <div className="Legend md-col md-col-2">
  <h3 className="headlines h3">Series <small className="h6">show all / hide all</small></h3>
    <ul className="m1 list-reset">
      {legendItems}
    </ul>
  </div>
  );
}

Legend.propTypes = {
  state: PropTypes.object,
  store: PropTypes.object,
};

export default Legend;
