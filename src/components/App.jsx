import Component from 'inferno-component';
import {connect} from 'inferno-redux';
import LoginContainer from './Login/Container';

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
		
		this.changePage = this.changePage.bind(this);
		this.animate = this.animate.bind(this);
		this.removeOld = this.removeOld.bind(this);
		
		this.state = {
			animation: 'left',
			currPage: (<LoginContainer
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
