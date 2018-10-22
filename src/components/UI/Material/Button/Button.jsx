import Component from 'inferno-component';

let timeouts = [];

export default class MaterialButtonContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			clicks: []
		}
		
	}
	
	componentDidUnmount() {
		for (let i = 0; i < timeouts.length; ++i)
			clearTimeout(timeouts[i]);
	}
	
	onClick(evt) {
		let rect = this.node.getBoundingClientRect();
		let x = evt.clientX - rect.left;
		let y = evt.clientY - rect.top;
		
		let clicks = this.state.clicks.slice();
		clicks.push(<Click x={x} y={y} id={Math.floor(Math.random() * 10000)} />);
		
		this.setState({clicks: clicks});
		
		timeouts.push(setTimeout(() => {
			timeouts = timeouts.slice(1);
			if (timeouts.length == 0 || this.state.clicks.length > 100) {
				// Not super efficient, but I was having issues with the DOM
				// not actually removing old elements
				// TODO - Look into this
				this.setState({clicks: []});
			}
		}, 1500));
	}
	
	render() {
		return (
			<MaterialButton
				id={this.props.id}
				label={this.props.children}
				onClick={evt => this.onClick(evt)}
				setRef={node => this.node = node}>
				{this.state.clicks}
			</MaterialButton>
		);
	}
}

const MaterialButton = ({children, id, label, setRef, onClick}) => (
	<div className='material-button' id={id} onClick={onClick}
		ref={node => setRef(node)}>
		{children}
		{label}
	</div>
);

const Click = ({id, x, y}) => (
	<div id={id} className='click' style={{left: x, top: y}} />
);
