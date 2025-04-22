import './pagination.styles.scss'
import { selectCurrentPage } from '../../store/pager/pager.selector'
import { useSelector,useDispatch } from 'react-redux'
import { setCurrentPage } from '../../store/pager/pager.action'
import { fetchMoviesStart,fetchTVShowsStart } from '../../store/movies/movies.action'
import { selectTotalPages } from '../../store/movies/movies.selector'
import { fetchPeopleStart } from '../../store/people/people.action'

export const Pagination = ({type}) => {
    const currentPage = useSelector(selectCurrentPage)
    const totalPages = useSelector(selectTotalPages)
    const dispatch = useDispatch()
    const onPageChangeHandler = (nextCurrentPage: number) => {
        if (nextCurrentPage > 0 && nextCurrentPage <= totalPages) {
            dispatch(setCurrentPage(nextCurrentPage))
        }
        if  (type === 'tv') {
            dispatch(fetchTVShowsStart())
        } else if (type === 'movies') {
            dispatch(fetchMoviesStart())
        } else if (type === 'people') {
            dispatch(fetchPeopleStart())
        }
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
    const generatePageNumbers =  (currentPage: number, totalPages: number) => {
        
        const pages: number[] = []
        const startPage = Math.max(1, currentPage - 4)
        const endPage = Math.min(totalPages, currentPage + 4)
        
        for(let i = startPage;i <= endPage; i++) {
            pages.push(i)
        }
        return {pages, startPage, endPage};
    }
    const {pages,startPage,endPage} = generatePageNumbers(currentPage, totalPages)
    
    
    return (
        <div className="pagination_container">
            <button disabled={currentPage === 1} onClick={()=> onPageChangeHandler(currentPage - 1)}>
                Prev
            </button>

            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChangeHandler(1)}>1</button>
                    {startPage > 2 && <span className="ellipsis">...</span>}
                </>
            )}

                {pages.map((page)=> (
                    <button 
                        key={page}
                        onClick={()=> onPageChangeHandler(page)}
                        className={`pagination_button${page === currentPage ? ' active' : ''}`}
                    >
                        {page}
                    </button>
                ))}
                
                {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
                    <button onClick={() => onPageChangeHandler(totalPages)}>{totalPages}</button>
                </>
                )}

            <button disabled={currentPage === totalPages} onClick={()=> onPageChangeHandler(currentPage + 1)}>
                Next
            </button>
        </div>
    )
}

export default Pagination;

