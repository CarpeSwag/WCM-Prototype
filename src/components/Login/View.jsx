import MaterialInput from '../UI/Material/Input/Input';
import MaterialButton from '../UI/Material/Button/Button';

const LoginView = ({username, password, bgImages, onUsername, onPassword, onLogin, onRegister}) => (
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
			<MaterialButton onClick={onLogin}>
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
);

export default LoginView;
