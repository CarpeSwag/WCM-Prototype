import Component from 'inferno-component';
import MaterialInput from '../../components/MaterialInput/MaterialInput';
import MaterialButton from '../../components/MaterialButton/MaterialButton';

const IMAGE_CAP = 4;
let rotationTimeout = null;

export default class LoginViewContainer extends Component {
	constructor(props) {
		super(props);
		
		let bgImages = [
			<LoginBackgroundImage type={0} />
		];
		
		this.state = {
			username: '',
			password: '',
			bgImgCntr: 0,
			bgImages: bgImages
		};
	}
	
	componentDidMount() {
		rotationTimeout = setTimeout(() => this.rotateImage(), 5000);
	}
	
	componentDidUnmount() {
		if (rotationTimeout != null)
			clearTimeout(rotationTimeout);
	}
	
	rotateImage() {
		let counter = (this.state.bgImgCntr + 1) % IMAGE_CAP;
		let bgImages = this.state.bgImages.slice(); // Clone bgImages
		bgImages.push(<LoginBackgroundImage type={counter} />);
		
		this.setState({
			bgImgCntr: counter,
			bgImages: bgImages
		});
		
		// Rotate the next image
		rotationTimeout = setTimeout(() => this.removeImage(), 1000);
	}
	
	removeImage() {
		// Cut out the bottom image
		let bgImages = this.state.bgImages.slice(1);
		
		this.setState({
			bgImages: bgImages
		});
		rotationTimeout = setTimeout(() => this.rotateImage(), 4000);
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
				<LoginView
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

const LoginView = ({username, password, bgImages, 
	onUsername, onPassword, onLogin, onRegister}) => (
	<div>
		<div className='login-background-image-cntr'>
		{bgImages}
		</div>
		<div className='login-background'>
			<div className='login-background-inner' />
		</div>
		<div className='login-cntr-outer'>
			<div className='login-cntr'>
				<div className='logo-cntr' />
				<div className='bar' />
				<div className='input-cntr'>
					<MaterialInput id='login-input-username'
						updateValue={value => onUsername(value)}
						value={username}
						placeholder='Username' />
					<MaterialInput id='login-input-password'
						updateValue={value => onPassword(value)}
						value={password}
						isPassword={true}
						placeholder='Password' />
				</div>
				<span className='forgot-acct'>
					
				</span>
				<div className='bar' />
				<MaterialButton onClick={(evt) => onLogin(evt)}>
					Login
				</MaterialButton>
				
				<span className='no-acct'>
					Don't have an account?&nbsp;
				</span>
					
				<span className='register' onclick={(evt) => onRegister(evt)}>
					Register
				</span>
			</div>
		</div>
	</div>
);

const LoginBackgroundImage = ({type}) => (
	<div className={'login-background-image rotate-' + type} />
);
