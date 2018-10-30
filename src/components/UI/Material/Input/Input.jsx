import Component from 'inferno-component';

const Input = ({id, placeholder, className, type, value, onFocus, onBlur, onInput}) => (
	<div className='material-input' id={id}>
		<input placeholder=''
			className={className}
			type={type}
			value={value}
			onFocus={evt => onFocus(evt)}
			onBlur={evt => onBlur(evt)}
			onInput={evt => onInput(evt)} />
		<div className={'placeholder ' + className}>
			{placeholder}
		</div>
	</div>
);

class MaterialInput extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			focused: false
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.value != nextProps.value
			|| this.state.focuses != nextState.focused;
	}
	
	onFocus(evt) {
		this.setState({focused: true});
	}
	
	onBlur(evt) {
		this.setState({focused: false});
	}
	
	onInput(evt) {
		this.props.updateValue(evt.target.value);
	}
	
	render() {
		const classes = ((this.state.focused)? 'focused ': '')
			+ ((this.props.value !== '')? 'active': '');
		const type = (this.props.isPassword)? 'password': 'text';
		
		return (
			<Input
				placeholder={this.props.placeholder}
				id={this.props.id}
				className={classes}
				type={type}
				value={this.props.value}
				onFocus={evt => this.onFocus(evt)}
				onBlur={evt => this.onBlur(evt)}
				onInput={evt => this.onInput(evt)} />
		);
	}
}

export default MaterialInput;
