import { Container } from "@material-ui/core";
import React, { useContext } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { ApiContext } from "../../utils/ApiContext";

function NavBar() {

    const {setSearch} = useContext(ApiContext);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div className="Nav-bar">
            <Container>
                <nav className="content">
                    <div className="Nav-bar__left">
                        <Link to="/" className="logo">Movies App</Link>
                        <ul>
                            <li>
                                <Link to="/movies"> Best Movies</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="Nav-bar__right">
                        <input
                            className="input-search"
                            type="text"
                            placeholder="search"
                            onChange={handleChange}
                        />
                    </div>
                </nav>
            </Container>
        </div>
    );
}

export default NavBar;
