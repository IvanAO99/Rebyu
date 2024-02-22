import React, { useContext } from "react";

import { GamesContext } from "../contexts/GamesProvider.jsx";

const useGames = () => {
    const context = useContext(GamesContext);
    return context;
};

export default useGames;
