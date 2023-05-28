import React from "react";
import { Recipe } from "../interfaces/Recipe/Recipe"; // importa tu tipo de receta aquí

interface SearchContextProps {
    searchResults: Recipe[];
    setSearchResults: (results: Recipe[]) => void;
}


const SearchContext = React.createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [searchResults, setSearchResults] = React.useState<Recipe[]>([]);

    return (
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;