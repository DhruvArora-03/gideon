import * as profileQueries from './profile';
import * as slotsQueries from './slots';
import * as sessionsQueries from './sessions';

const queries = { ...profileQueries, ...slotsQueries, ...sessionsQueries };

export default queries;
