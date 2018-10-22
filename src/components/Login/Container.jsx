import Component from 'inferno-component';
import View from './View';

const IMAGE_CAP = 4;

const BackgroundImage = ({type}) => (
	<div className={'login-background-image rotate-' + type} />
);

class LoginContainer extends Component {
	constructor(props) {
		super(props);
		
		let bgImages = [
			<BackgroundImage type={0} />
		];
		
		this.state = {
			username: '',
			password: '',
			bgImgCntr: 0,
			bgImages: bgImages
		};
		
		this.rotationTimeout = null;
	}
	
	componentDidMount() {
		this.rotationTimeout = setTimeout(() => this.rotateImage(), 5000);
	}
	
	componentDidUnmount() {
		if (this.rotationTimeout != null)
			clearTimeout(this.rotationTimeout);
	}
	
	rotateImage() {
		let counter = (this.state.bgImgCntr + 1) % IMAGE_CAP;
		let bgImages = this.state.bgImages.slice(); // Clone bgImages
		bgImages.push(<BackgroundImage type={counter} />);
		
		this.setState({
			bgImgCntr: counter,
			bgImages: bgImages
		});
		
		// Rotate the next image
		this.rotationTimeout = setTimeout(() => this.removeImage(), 1000);
	}
	
	removeImage() {
		// Cut out the bottom image
		let bgImages = this.state.bgImages.slice(1);
		
		this.setState({
			bgImages: bgImages
		});
		this.rotationTimeout = setTimeout(() => this.rotateImage(), 4000);
	}
	
	login(evt) {
		
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
