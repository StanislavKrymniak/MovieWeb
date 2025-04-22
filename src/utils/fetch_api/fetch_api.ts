export const buildMovieFetchURL = (searchValue: string,search_Url: string ,discover_Url:string,selectedGenres:number[],selectedPage:number,urlValue:string) => {
    let baseUrl = urlValue ? urlValue : discover_Url; 


    if (searchValue) {
        baseUrl = `${search_Url}${searchValue}`;
    }


    if (selectedGenres.length) {
        const genreQuery = selectedGenres.join(',');
        baseUrl += `&with_genres=${genreQuery}`;
    }


    if (selectedPage) {
        baseUrl += `&page=${selectedPage}`;
    }

    return baseUrl;
}

export const buildTVFetchURL = (searchValue: string,search_Url: string ,selectedGenres:number[],selectedPage:number,urlTV:string) => {
    let baseUrl = urlTV 


    if (searchValue) {
        baseUrl = `${search_Url}${searchValue}`;
    }


    if (selectedGenres.length) {
        const genreQuery = selectedGenres.join(',');
        baseUrl += `&with_genres=${genreQuery}`;
    }


    if (selectedPage) {
        baseUrl += `&page=${selectedPage}`;
    }

    return baseUrl;
}


