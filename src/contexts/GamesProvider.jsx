import React, { createContext, useEffect, useState } from 'react';
import {supabaseConnection} from '../.config/supabase.js';

const GamesContext = createContext();

const GamesProvider = ({children}) => {
    /* DEBUG */
    const debug = false;

    /* INITIAL STATES VALUES */
    const initialValues = {
        games: [],
        game: {},
        isLoadingGames: true,
        isLoadingGame: true,
    };

    /* STATES */
    const [games, setGames] = useState(initialValues.games);
    const [game, setGame] = useState(initialValues.game);
    const [isLoadingGames, setIsLoadingGames] = useState(initialValues.isLoadingGames);
    const [isLoadingGame, setIsLoadingGame] = useState(initialValues.isLoadingGame);

    /* FUNCTIONS */
    const getGames = async () => {
        try {
            setIsLoadingGames(true);
            const {data, error} = await supabaseConnection.from("games").select("*");

            if(error) throw new Error("Error loading games. Please reload the page and try again.");
            setGames(data);

        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoadingGames(false);
        }
    }

    const getGame = async (gameID) => {
        try {
            setIsLoadingGame(true);
            const {data, error} = await supabaseConnection.from("games").select("*").eq("id", gameID);

            if(error) throw new Error("Error loading the game. Please reload the page and try again.");
            setGame(data);

        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoadingGame(false);
        }
    }


    useEffect(()=>{
        getGames();
    }, []);

    const gamesData = {
        games,
        game,
        getGame,
    };

  return (
    <GamesContext.Provider value={gamesData}>
        {children}
    </GamesContext.Provider>
  )
}

export default GamesProvider
export {GamesContext};