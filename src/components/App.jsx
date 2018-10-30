import Component from 'inferno-component';
import {connect} from 'inferno-redux';
import LoginContainer from './Login/Container';


/**
 * View
 * 
 * [component] Inferno component for the full-page view.
 * [key]       String/Integer. Key used to uniquely identify the object in its render list.
 * [props]     Object. Props for the component.
 * [animation] String. Animation type for the view transition.
 */
function View(component, key, props, animation) {
	this.component = component;
	this.key       = key;
	this.props     = (props === undefined)? {}: props;
	this.animation = (animation === undefined)? '': animation;
}


/**
 * Redux Props
 */
const mapStateToProps = (state) => {
	return {};
}

const mapDispatchToProps = (dispatch) => {
	return {};
}

/**
 * App
 */

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			animation: 'left',
			currView: 0,
			views: [new View(LoginContainer, 0)],
			frozen: null
		}
		
		this.lastPageKey = 0;
	}
	
	/**
		Change the current view on the app.
	 */
	changeView(PageComponent, props, animation) {
		if (props === undefined)     props = {};
		if (animation === undefined) animation = 'left';
		
		// Create new component
		let views = this.state.views.slice();
		this.lastPageKey = ++this.lastPageKey % 10;
		views[0].animation = '';
		views.push(new View(PageComponent, this.lastPageKey, props, 'incoming'));
		
		this.setState({
			views: views,
			animation: animation,
			currView: (this.state.currView + 1) % 2,
			refreshConnections: false,
			frozen: <div className='freeze'></div>
		});
		
		// Start animations after brief delay
		setTimeout(() => this.animate(), 250);
	}
	
	// Adds the right CSS class for animating the two pages in the correct manner given the specific animation type.
	animate() {
		const curr = `transition-in-${this.state.animation}`;
		const last = `transition-out-${this.state.animation}`;
		
		// Set animations
		let views = this.state.views.slice();
		views[views.length - 1].animation = curr;
		views[0].animation                = last;
		
		this.setState({views: views});
		
		setTimeout(() => this.removeOld(), 550);
	}
	
	// Remove the old view
	removeOld() {
		let views = this.state.views.slice(1);
		views[0].animation = '';
		this.setState({
			views: views,
			frozen: null
		});
	}
	
	/**
		Render the current view and either an incoming or outgoing view during transitions.
		Generally, only one view will occupy this list at any given moment.
	 */
	renderViews() {
		let views = this.state.views.map((component, i) => {
			const PageComponent = component.component;
			let view = (
				<PageComponent key={component.key}
					activeView={i == this.state.views.length - 1}
					animation={component.animation}
					changeView={(c, p, a) => this.changeView(c, p, a)} />
			);
			// Assign specific props passed in by the initial changeView call.
			view.props = Object.assign({}, component.props, view.props);
			return view;
		});
		
		return (views.length > 0)? views: null;
	}
	
	/**
		Render method
	 */
	render() {
		return (
			<div id='inferno-root'>
				{this.renderViews()}
				{this.state.frozen}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
