import ReactPaginate from 'react-paginate';

const Pagination = ({ handlePageClick, pageCount }) => {
    return (
        <ReactPaginate
            breakLabel="......."
            nextLabel="»"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="«"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-end"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        />
    );
};

export default Pagination;
