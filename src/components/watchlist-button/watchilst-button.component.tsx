import { MediaTypes } from "../../store/movies/movies.types";
import { addToWatchlist,removeFromWatchlist } from "../../store/watchlist/watchlist.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectWatchlist } from "../../store/watchlist/watchlist.selector";


export const WatchlistButton = ({ media }: { media: MediaTypes }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const watchlist = useSelector(selectWatchlist);

  const mediaWithType = {
      ...media,
      media_type: media.media_type || (media.name ? 'tv' : 'movie')
    };
  
  const isInWatchlist = watchlist.some(
    (item) =>
      item.id === mediaWithType.id &&
      item.media_type === mediaWithType.media_type
  );
  //console.log('isInWatchlist', isInWatchlist);
  const handleOnClick = () => {
    if (!currentUser) {
      alert('Please sign in to add to watchlist');
      return;
    }

    if (!isInWatchlist) {
      dispatch(addToWatchlist(mediaWithType));
    }else if (isInWatchlist) {
      dispatch(removeFromWatchlist({id: mediaWithType.id, media_type: mediaWithType.media_type}));
    }
  };

  return (
    <button className='watchlist-button' onClick={handleOnClick}>
      {isInWatchlist ? '✓' : '+'}
    </button>
  );
};

export default WatchlistButton;