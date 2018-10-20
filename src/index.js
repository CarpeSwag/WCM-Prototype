import {render} from 'inferno';
import Component from 'inferno-component';
import LoginView from './views/LoginView/LoginView';

/* global ble  */
/* jshint browser: true , devel: true*/

export default class App extends Component {
	constructor(props) {
		super(props);
		
		this.changePage = this.changePage.bind(this);
		this.animate = this.animate.bind(this);
		this.removeOld = this.removeOld.bind(this);
		
		this.state = {
			animation: 'left',
			currPage: (<LoginView
				changePage={this.changePage}
				animation='' />),
			frozen: null,
			lastPage: null
		}
	}
	
	changePage(component, animation) {
		if (component.props == null) {
			component.props = {};
		}
		animation = animation||'left';
		component.props.changePage = this.changePage;
		component.props.activePage = true;
		
		// Start animations
		component.props.animation = 'incoming';
		this.state.currPage.props.animation = '';
		this.state.currPage.props.activePage = false;
		
		this.setState({
			animation: animation,
			lastPage: this.state.currPage,
			currPage: component,
			frozen: <div className='freeze'></div>
		});
	}
	
	animate() {
		this.state.currPage.props.animation = 'transition-in-' + this.state.animation;
		this.state.lastPage.props.animation = 'transition-out-' + this.state.animation;
		setTimeout(this.removeOld, 550);
		
		this.setState({});
	}
	
	removeOld() {
		this.setState({
			frozen: null,
			lastPage: null
		});
	}
	
	// Reused overlay methods (passed down automatically as props)
	
	// Render method
	
	render() {
		return (
			<div id='inferno-root'>
				{this.state.lastPage}
				{this.state.currPage}
				{this.state.frozen}
			</div>
		);
	}
}

render(
	<App />,
	document.getElementById('root')
);
