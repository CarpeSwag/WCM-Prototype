import Component from 'inferno-component';
import View from './View';
import Background from './Background';
import DashboardContainer from '../Dashboard/Container';
import Slideshow from '../UI/Slideshow/Slideshow';

const IMAGE_CAP = 4;
const IMAGE_ROTATION = 5000;

class LoginContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: ''
		};
	}
	
	login(evt) {
		this.props.changeView(DashboardContainer);
	}
	
	register(evt) {
		
	}
	
	updateUsername(name) {
		this.setState({username: name});
	}
	
	updatePassword(pass) {
		this.setState({password: pass});
	}
	
	render() {
		return (
			<div id='login-root' className={this.props.animation}>
				<Slideshow 
					cap={IMAGE_CAP}
					rotationTime={IMAGE_ROTATION} />
				<Background />
				<View
					bgImages={this.state.bgImages}
					username={this.state.username}
					password={this.state.password}
					onUsername={evt => this.updateUsername(evt)}
					onPassword={evt => this.updatePassword(evt)}
					onLogin={evt => this.login(evt)}
					onRegister={evt => this.register(evt)} />
			</div>
		);
	}
}

export default LoginContainer;
