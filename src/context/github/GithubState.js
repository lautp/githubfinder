import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
    GET_USER,
    CLEAR_USERS,
    SET_LOADING,
    SEARCH_USERS,
    GET_REPOS
} from "../types"

const GithubState = props => {
    const initialState = {
        users: [],
        user:{},
        repos:[],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    //Search users
    const userSearch = async (text) =>{
        setLoading();
        
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
        
        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items
        })
        
    }

    //Get user
    const getUser = async username => {
        setLoading()
        
        const res = await axios.get(`https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
        
        dispatch({
            type: GET_USER,
            payload:res.data
        })
    }

    //Clear users
    const clearUsers = () => dispatch({type:CLEAR_USERS})

    //Get repos
    const getUserRepos = async username => {
        setLoading();
        
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`);
        
        dispatch({
            type:GET_REPOS,
            payload:res.data
        })
    }

    //Set loading

    const setLoading = () => dispatch({type: SET_LOADING})

    return <GithubContext.Provider
        value={{
            user: state.user,
            users: state.users,
            repos: state.repos,
            loading: state.loading,
            userSearch,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState;



