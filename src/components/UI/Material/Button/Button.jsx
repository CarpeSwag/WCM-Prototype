import Component from 'inferno-component';

const CLICK_CAP = 100;

const Button = ({children, id, label, setRef, onClick}) => (
	<div className='material-button' id={id} onClick={onClick}
		ref={node => setRef(node)}>
		{children}
		{label}
	</div>
);

const Click = ({x, y}) => (
	<div className='click'
		style={{left: `${x}px`, top: `${y}px`}} />
);

export default class MaterialButton extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			clicks: []
		}
		
		this.timeouts = [];
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.state.clicks.length != nextState.clicks.length;
	}
	
	componentDidUnmount() {
		for (let i = 0; i < this.timeouts.length; ++i)
			clearTimeout(this.timeouts[i]);
	}
	
	onClick(evt) {
		const rect = this.node.getBoundingClientRect();
		const x = evt.clientX - rect.left;
		const y = evt.clientY - rect.top;
		
		let clicks = this.state.clicks.slice();
		clicks.push(
			<Click x={x} y={y} />
		);
		this.setState({
			clicks: clicks
		});
		
		this.timeouts.push(setTimeout(() => {
			// Get rid of reference to timer
			this.timeouts = this.timeouts.slice(1);
			
			if (this.timeouts.length == 0 || this.state.clicks.length > CLICK_CAP) {
				// Not super efficient, but I was having issues with the DOM removing keyed elements incorrectly
				// TODO - Look into this
				this.setState({clicks: []});
			}
		}, 1500));
	}
	
	render() {
		return (
			<Button
				id={this.props.id}
				label={this.props.children}
				onClick={evt => this.onClick(evt)}
				setRef={node => this.node = node}>
				{this.state.clicks}
			</Button>
		);
	}
}
