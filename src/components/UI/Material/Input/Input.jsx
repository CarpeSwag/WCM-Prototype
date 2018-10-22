import Component from 'inferno-component';

export default class MaterialInputContainer extends Component {
	constructor(props) {
		super(props);
		
		let active = this.props.value != '';
		let classes = (active)? 'active': '';
		
		this.state = {
			inputClasses: classes,
			focused: false
		}
	}
	
	componentDidUpdate() {
		let active = this.props.value != '';
		let classes = ((this.state.focused)? 'focused ': '')
			+ ((active)? 'active': '');
		if (this.state.inputClasses != classes) {
			this.setState({inputClasses: classes});
		}
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
		let type = (this.props.isPassword !== undefined)? 'password': 'text';
		return (
			<MaterialInput
				placeholder={this.props.placeholder}
				id={this.props.id}
				inputClasses={this.state.inputClasses}
				type={type}
				value={this.props.value}
				onFocus={evt => this.onFocus(evt)}
				onBlur={evt => this.onBlur(evt)}
				onInput={evt => this.onInput(evt)} />
		);
	}
}

const MaterialInput = ({id, placeholder, inputClasses, type, value, onFocus, onBlur, onInput}) => (
	<div className='material-input' id={id}>
		<input placeholder=''
			className={inputClasses}
			type={type}
			value={value}
			onFocus={evt => onFocus(evt)}
			onBlur={evt => onBlur(evt)}
			onInput={evt => onInput(evt)} />
		<div className={'placeholder ' + inputClasses}>
			{placeholder}
		</div>
	</div>
);

