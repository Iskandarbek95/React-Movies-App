import React, { useContext, useState } from "react";
import "./Movies.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { ApiContext } from "../../utils/ApiContext";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function Movies() {

    const { apiState, search } = useContext(ApiContext);
    const [searchParam] = useState(['title']);

    const filterMovies = apiState.filter(item =>
        String(item.title).toLowerCase().includes(search.toLowerCase()) ||
        String(item.release_date).toLowerCase().includes(search.toLowerCase()) ||
        String(item.vote_average).toLowerCase().includes(search.toLowerCase())
    );
    console.log(filterMovies);

    // pagination \/

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const [pageNumberLimit, setPageNumberLimit] = useState(8);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(8);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const pages = [];
    for (let i = 1; i <= Math.ceil(apiState.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = apiState.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage == number ? "active" : null}
                >
                    {number}
                </li>
            )
        } else {
            return null;
        }
    });

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}>&hellip;</li>
    }

    // pagination /\

    return (<div>

        <div className="movies">
            {filterMovies.slice(indexOfFirstItem, indexOfLastItem).map((item) =>
                <MoviesCard
                    poster_path={item.poster_path}
                    original_title={item.original_title}
                    vote_average={item.vote_average}
                    release_date={item.release_date}
                    key={item.id}
                    id={item.id} />
            )}
        </div>
        <ul className="page-numbers">
            <li>
                <button disabled={currentPage == pages[0] ? true : false} onClick={handlePrevbtn}>
                    <ChevronLeftIcon />
                </button>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
                <button onClick={handleNextbtn}>
                    <ChevronRightIcon />
                </button>
            </li>
        </ul>
    </div>
    );
}

export default Movies;
