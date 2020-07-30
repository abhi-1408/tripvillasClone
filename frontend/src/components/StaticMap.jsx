import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Load_Filtered_Data } from '../Redux/common/action'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'

const StaticMap = (props) => {


    // const [selectedHotel, setSelectedHotel] = useState(null)

    // if (props) {
    // let len = Math.floor(data.length) / 2
    return (

        <GoogleMap defaultZoom={12} defaultCenter={{ "lat": parseFloat(props['lat']), "lng": parseFloat(props['lng']) }
        } >


            <Marker key={2} position={{ "lat": parseFloat(props['lat']), "lng": parseFloat(props['lng']) }}
            />
        </GoogleMap>


    )
    // }
    // else {
    //     return (
    //         <div>LOADING...</div>
    //     )
    // }
}

export const WrappedStaticMap = withScriptjs(withGoogleMap(StaticMap));
