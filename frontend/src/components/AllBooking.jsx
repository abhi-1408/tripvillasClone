import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Load_User_Booking_List } from '../Redux/common/action'
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export const AllBooking = (props) => {

    const useStyles = makeStyles({
        root: {
            height: 240,
            flexGrow: 1,
            maxWidth: 400,
        },
    });


    let dispatch = useDispatch()
    let com = useSelector(state => state.common)
    const { user_booking_flag,
        user_booking_list } = com
    let log = useSelector(state => state.login)
    const { user_id_loggedin } = log

    useEffect(() => {
        dispatch(Load_User_Booking_List({ "id": user_id_loggedin }))
    }, [])
    if (user_booking_flag == true) {
        return (<div> BOOKING LIST IS
            <TreeView
                className={makeStyles().root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >{

                    user_booking_list.map((ele, ind) => {
                        return (<>
                            <TreeItem nodeId={ind * 10 + 0} label={ele.booking_id}>
                                <TreeItem nodeId={ind * 10 + 1} label={"hotel id: " + ele.hotel_id} />
                                <TreeItem nodeId={ind * 10 + 2} label={"customer name: " + ele.customer_name} />
                                <TreeItem nodeId={ind * 10 + 3} label={"customer_mobile: " + ele.customer_mobile} />
                                <TreeItem nodeId={ind * 10 + 4} label={"customer_email: " + ele.customer_email} />
                                <TreeItem nodeId={ind * 10 + 5} label={"total price: " + ele.total_price} />
                                <TreeItem nodeId={ind * 10 + 6} label={"booking date:" + ele.booking_date} />
                                <TreeItem nodeId={ind * 10 + 7} label={"checkin date:" + ele.check_in} />
                                <TreeItem nodeId={ind * 10 + 8} label={"checkout date:" + ele.check_out} />
                                <TreeItem nodeId={ind * 10 + 9} label={"number of units:" + ele.number_of_units} />


                            </TreeItem>
                        </>
                        )
                    })

                }</TreeView>
        </div>
        )
    }
    else {
        return (<div>LOADING BOOKING DETAILS...</div>)
    }
}
