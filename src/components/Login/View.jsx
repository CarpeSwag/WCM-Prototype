import Component from 'inferno-component';
import MaterialInput from '../UI/Material/Input/Input';
import MaterialButton from '../UI/Material/Button/Button';

const IMAGE_CAP = 4;

const LoginView = ({username, password, bgImages, onUsername, onPassword, onLogin, onRegister}) => (
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

export default LoginView;
