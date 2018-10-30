import {render} from 'inferno';
import {Provider} from 'inferno-redux';
import store from './redux/store';
import App from './components/App';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
