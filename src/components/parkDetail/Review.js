import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Review extends Component {

  render() {

    // const { reviewsInfo } = this.props;
    // const { user_id } = reviewsInfo;

    return (
      <div>
        <div className="reviews">
          <h3>Park Name Park</h3>
          {/* <Link to={`/UserDetail/${user_id}`}><h4>reviewer</h4></Link> */}
          <p>Lorem ipsum dolor sit amet, sit movet intellegam eu. Cu dolor argumentum mediocritatem nam. Te quo utinam appetere, feugait disputationi per te. Quo solet labores mandamus et. Ad eos clita blandit.

His dicat augue et, mea no modo verear, sit autem fierent ne. Natum maluisset sit at. Ex nam nobis recteque, an libris tamquam molestie quo, no vivendo mandamus pri. Vix regione menandri imperdiet in, timeam alterum invenire et usu, ad modus viris gloriatur pri. Cu vivendum vulputate sea.

Dicant incorrupte vim at, molestie invenire ea vim. In ridens ancillae ius, vel ei altera accusata maiestatis, per habeo fuisset perpetua te. Eripuit facilisi explicari nec ad. Probo paulo vel cu, eos error erant commodo et. Per graeci labores antiopam an, vix ad lorem tation alienum. Ex vitae homero philosophia nam.</p>
        </div>
      </div>
    );
  }
}

export default connect(
  // state => ({ reviews: state.reviews }),
  null
)(Review);