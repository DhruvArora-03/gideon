import * as defaultSlotsQueries from './defaultSlots';
import * as profileQueries from './profiles';
import * as sessionsQueries from './sessions';
import * as slotsQueries from './slots';

const queries = { ...defaultSlotsQueries, ...profileQueries, ...sessionsQueries, ...slotsQueries };

export default queries;
