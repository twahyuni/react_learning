// React.createClass() function to define component
// one way data flow, data changes from "top" and propagated "downwards"
const ProductList = React.createClass({
  // state is mutable and owned by component
  // this.state is private to the component and can be updated with this.setState();
  // getInitialState is special method that run once
  getInitialState: function() {
    return {
      products: [],
    }
  },
  // lifecycle method
  componentDidMount: function() {
    this.updateState();
  },
  // sort by votes
  updateState: function() {
    const products = Data.sort((a,b) => {
      return b.votes - a.votes;
    });
    this.setState({ products: products });
  },
  handleProductVote: function(productId, vote) {
    // productId and vote are passed by Product with handleUpVote and handleDownVote
    // traverse Data to up-vote based on productId
    Data.forEach((el) => {
      if (el.id === productId && vote === 'up') {
        el.votes = el.votes + 1;
        return;
      }  else if (el.id === productId && vote === 'down'){
        el.votes = el.votes - 1;
        return;
      }
    });
    this.updateState();
  },
  // what to render on page
  render: function() {
    // take information from data.js, loop them
    const products = this.state.products.map((product) => {
      // return(); is jsx syntax, this equivalent with React.createElement('div',{className: 'ui items'},'Hi');
      return (
        // add child component Product in ProductList
        // prop_name = {prop_value}
        // key for create unique buidngins for each instance of Product component, for React framework
          <Product
            key={'product-' + product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            url={product.url}
            votes={product.votes}
            submitter_avatar_url={product.submitter_avatar_url}
            product_image_url={product.product_image_url}
            onVote={this.handleProductVote}
          />
      );
    });
    return (
      <div className='ui items'>
        {products}
      </div>
    );
  },
});

// child component Product that will contain a product listing
// Product component can't modify as this.props is immutable
// child doesn't own props, its parent component does
const Product = React.createClass({
  handleDownVote: function() {
    this.props.onVote(this.props.id, 'down');
  },
  handleUpVote: function() {
    // tell which Product trigger the event to its parent, ProductList
    // onVote is passed down by ProductList
    this.props.onVote(this.props.id, 'up');
  },
  render: function() {
    return (
      // className in React, equivalent to class in JS since JSX couldn't use reserved JS words
      // call component props through this.props
      <div className="item">
        <div className="image">
          <img src={this.props.product_image_url} />
        </div>

        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
            {this.props.votes}
          </div>

          <div className="description">
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
        </div>

        <div className ="extra">
          <span> Submitted by: </span>
          <img
            className="ui avatar image"
            src={this.props.submitter_avatar_url}
          />
        </div>
      </div>
    );
  }
});

// ReactDOM.render( [what], [where] );
ReactDOM.render(
  // passing ProductList component, React component names always start with uppercase
  <ProductList />,
  // render it in element that have 'content' as id
  document.getElementById('content')
);
