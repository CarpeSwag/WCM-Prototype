import Component from 'inferno-component';
import Navbar from './Navbar';

class NavbarContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			atTop: true
		};
	}
	
	componentDidMount() {
		
	}
	
	componentDidUnmount() {
		
	}
	
	
	render() {
		return (
			<Navbar
				atTop={this.state.atTop} />
		);
	}
}

export default NavbarContainer;
