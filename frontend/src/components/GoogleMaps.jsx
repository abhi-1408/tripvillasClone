import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Load_Filtered_Data } from '../Redux/filter/action'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'

const GoogleMaps = (props) => {

    let dispatch = useDispatch()
    let com = useSelector(state => state.common)
    const { data } = com
    const [selectedHotel, setSelectedHotel] = useState(null)

    if (data.length > 0) {
        // let len = Math.floor(data.length) / 2
        return (

            <GoogleMap defaultZoom={12} defaultCenter={{ "lat": parseFloat(data[0]['lat']), "lng": parseFloat(data[0]['lng']) }
            } >

                {data.map(ele => (
                    <Marker key={ele.id} position={{ "lat": parseFloat(ele['lat']), "lng": parseFloat(ele['lng']) }}
                        onClick={() => { setSelectedHotel(ele) }} />
                ))}

                {selectedHotel && (<InfoWindow
                    position={{ "lat": parseFloat(selectedHotel['lat']), "lng": parseFloat(selectedHotel['lng']) }}
                    onCloseClick={() => { setSelectedHotel(null) }}
                >
                    <div><p><b>PropID#{selectedHotel['id']}</b></p> <h5 class="text-primary">{selectedHotel['title']}</h5></div></InfoWindow>)}
            </GoogleMap>


        )
    }
    else {
        return (
            <div>LOADING...</div>
        )
    }
}

export const WrappedMap = withScriptjs(withGoogleMap(GoogleMaps));
