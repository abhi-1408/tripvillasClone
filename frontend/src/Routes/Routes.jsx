import React from 'react';
import { Route, Switch } from "react-router-dom"
import { Homepage } from '../components/Homepage'
import { FilterPage } from '../components/Filterpage'
import { Propertypage } from '../components/Propertypage'


export const Routes = () => {
    return (
        <Switch>
            <Route path='/homepage' render={(props) => <Homepage {...props} />} />
            <Route path='/filterby' exact render={(props) => <FilterPage {...props} />} />
            <Route path='/property/:id' render={(props) => <Propertypage {...props} />} />
        </Switch>
    )
}