import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Homepage } from '../components/Homepage'
import { FilterPage } from '../components/Filterpage'
import { Propertypage } from '../components/Propertypage'
import { Holidayhomes } from '../components/Holidayhomes'
import { Map } from '../components/Map'
import { WrappedMap } from '../components/GoogleMaps'
import { Paymentpage } from '../components/Paymentpage'
import { Form } from '../components/Form'

export const Routes = () => {
  return (
    <Switch>
      {/* <Route path='/' exact render={(props) => <div style={{ width: "100vw", height: "100vh" }}>
                <WrappedMap googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M"}
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                /> 
            </div>} /> */}
      <Route path='/homepage' render={(props) => <Homepage {...props} />} />
      <Route path='/filterby' render={(props) => <FilterPage {...props} />} />
      <Route
        path='/holiday/:state'
        render={(props) => <Holidayhomes {...props} />}
      />
      <Route
        path='/property/:id'
        render={(props) => <Propertypage {...props} />}
      />
      <Route path='/book/:id' render={(props) => <Form {...props} />} />
      <Route
        path='/booking-confirm/:id'
        render={(props) => <Paymentpage {...props} />}
      />
    </Switch>
  )
}
