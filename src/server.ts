import App from '@/app';
import IndexRoute from '@routes/index.route';
import AircompanyRoute from '@routes/aircompany.route';
import AirplaneRoute from '@routes/airplane.route';
import FlightRoute from '@routes/flight.route';

import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AircompanyRoute(), new AirplaneRoute(), new FlightRoute()]);

app.listen();
