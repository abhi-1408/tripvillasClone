import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Load_Filtered_Data } from '../Redux/common/action'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'


export const Map = (props) => {

    let dispatch = useDispatch()
    let com = useSelector(state => state.common)
    const { data } = com
    // useEffect(() => {
    //     setViewport({

    //     })
    //     // dispatch(Load_Filtered_Data({ "state": "delhi", "check_in": "2020-07-28", "check_out": "2020-07-30" }))
    // }, [])
    useEffect(() => {
        console.log('in map are :', data)
    })

    const [viewport, setViewport] = useState({
        // latitute: 28.6517178,
        // longitude: 77.2219388,
        latitude: parseFloat(data[0]['lat']),
        longitude: parseFloat(data[0]['lng']),
        width: "80vw",
        height: "80vh",
        zoom: 9
    })

    const [selectHotel, setSelectedHotel] = useState(null)
    // latitude={parseFloat(data[0]['lat'])} longitude={parseFloat(data[0]['lng'])}
    if (data.length > 0) {

        return (
            <div>
                <h2>

                    <ReactMapGL {...viewport} mapboxApiAccessToken={'pk.eyJ1IjoiYWJoaW9ubmV0IiwiYSI6ImNrZDR0aDg1cjAzdTgyeG55c3NnaGQ4MW0ifQ.0f-6HhYjCCRm_6ngb9JmMA'}
                        mapStyle="mapbox://styles/mapbox/streets-v11"

                        onViewportChange={viewport => {
                            setViewport(viewport)
                        }}
                    >

                        {data && data.map(ele => (
                            <Marker key={ele['id']} latitude={parseFloat(ele['lat'])} longitude={parseFloat(ele['lng'])} offsetLeft={-10} offsetTop={-10}>
                                <button style={{ background: "None", border: "None", "cursor": "pointer" }} onClick={e => {
                                    e.preventDefault()
                                    setSelectedHotel(ele)
                                }}>
                                    <img style={{ width: "20px", height: "20px" }} src="https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-vector-location-icon-png-image_317888.jpg" alt="hotel" />
                                </button>

                            </Marker>
                        )

                        )}

                        {selectHotel ? (
                            <Popup latitude={parseFloat(selectHotel['lat'])} longitude={parseFloat(selectHotel["lng"])} onClose={() => {
                                setSelectedHotel(null)
                            }}>
                                <div>
                                    <h2>hotel#{selectHotel['id']}</h2>
                                    <p>{selectHotel['title']}</p>
                                    <h5>{selectHotel['location_name']}</h5>
                                </div>
                            </Popup>
                        ) : null}
                    </ReactMapGL>
                </h2>
            </div>
        )
    }
    else {
        return (
            <div>LOADING...</div>
        )
    }
}
