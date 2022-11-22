import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from '../routes';

class Header extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });



  render() {
    const { activeItem } = this.state;

      return (
        <Menu style={{ marginTop: "10px" }} pointing secondary>
        <Link route="/"><a className="item">BrasilChain</a></Link>
        <Link route="/licitacoes"><a className="item">Licitações</a></Link>
      </Menu>
    );
  }
};

export default Header;
