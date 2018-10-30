import Component from 'inferno-component';
import View from './View';

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			
		};
	}
	
	componentDidMount() {
		
	}
	
	componentDidUnmount() {
		
	}
	
	
	render() {
		return (
			<div id='dashboard-root' className={this.props.animation}>
				<View />
			</div>
		);
	}
}

export default DashboardContainer;
