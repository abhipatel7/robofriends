import React, {useEffect, useState} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css';
import { useDispatch, useSelector} from "react-redux";
import {setSearchField, requestRobots} from "../action";


const App = () => {
    const searchField = useSelector(state => state.searchRobots.searchField)
    const dispatch = useDispatch()

    const robots = useSelector(state => state.requestRobots.robots)
    const isPending = useSelector(state => state.requestRobots.isPending)
    const error = useSelector(state => state.requestRobots.error)

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    const onSearchChange = (event) => dispatch(setSearchField(event.target.value))

    const onRequestRobots = () => dispatch(requestRobots())

    useEffect(() => {
        onRequestRobots()
    },[])

    return isPending ?
        <h1>Loading</h1> :
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default App;