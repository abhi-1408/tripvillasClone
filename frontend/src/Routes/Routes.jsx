import React from 'react';
import { Route, Switch } from "react-router-dom"
import { Homepage } from '../components/Homepage'
import { FilterPage } from '../components/Filterpage'


export const Routes = () => {
    return (
        <Switch>
            <Route path='/homepage' render={(props) => <Homepage {...props} />} />
            <Route path='/filterby' exact render={(props) => <FilterPage {...props} />} />
        </Switch>
    )
}