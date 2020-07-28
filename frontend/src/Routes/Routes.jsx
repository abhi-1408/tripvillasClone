import React from 'react';
import { Route, Switch } from "react-router-dom"
import { Homepage } from '../components/Homepage'
import { FilterPage } from '../components/Filterpage'
import { Propertypage } from '../components/Propertypage'
import { Holidayhomes } from '../components/Holidayhomes';
import { Map } from '../components/Map';
import { Paymentpage } from '../components/Paymentpage';
import { Form } from '../components/Form';


export const Routes = () => {
    return (
        <Switch>
            {/* <Route path='/' exact render={(props) => <Form {...props} />} /> */}
            <Route path='/homepage' render={(props) => <Homepage {...props} />} />
            <Route path='/filterby' exact render={(props) => <FilterPage {...props} />} />
            <Route path='/holiday/:state' exact render={(props) => <Holidayhomes {...props} />} />
            <Route path='/property/:id' exact render={(props) => <Propertypage {...props} />} />
            <Route path='/book/:id' exact render={(props) => <Form {...props} />} />
            <Route path='/booking-confirm/:id' exact render={(props) => <Paymentpage {...props} />} />
        </Switch>
    )
}