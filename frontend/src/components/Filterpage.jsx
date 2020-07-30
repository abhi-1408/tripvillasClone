import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import data1 from './data1.json'
import styles from './css/Filterpage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {
  Load_Data,
  Save_Filter,
  Load_Filtered_Data,
  Apply_Data
} from '../Redux/common/action'
import { useParams, useHistory } from 'react-router'
import { Link, Switch, Route } from 'react-router-dom'
// import { Map } from './Map'
import { WrappedMap } from './GoogleMaps'
import $ from 'jquery'
import ReactGa from 'react-ga'
import Skeleton from '@material-ui/lab/Skeleton';

export const FilterPage = (props) => {
  console.log('PROPS ARE:', props)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [flag, setFlag] = useState(0)
  const [location_search, setLocationSearch] = useState('')
  const [dispFlag, setDispFlag] = useState(false)


  const handleChange1 = (date) => {
    // console.log(date)
    if (endDate < date) {
      setEndDate(date)
      setStartDate(date)
    } else {
      setStartDate(date)
    }
  }

  const handleChange2 = (date) => {
    // console.log(date)
    // setEndDate(date)
    if (date >= startDate) {
      setEndDate(date)
    } else {
      setEndDate(startDate)
      setStartDate(date)
    } ////
  }

  // const [data,setData] = useState([])
  let common = useSelector((state) => state.common)
  const { data, filters, filter_list, filter_page_flag } = common
  let dispatch = useDispatch()

  let history = useHistory()
  // let params = useParams()
  useEffect(() => {
    ReactGa.initialize('UA-173941004-2')

    ReactGa.pageview(window.location.pathname + window.location.search)
    console.log('props are', props)
    console.log('******history is****', history)
    // console.log('*******params *******', params)

    // dispatch(Load_Data())
    let s = history.location.search
    if (s.length > 0) {
      s = s.slice(1)
      let arr_param = s.split('&')
      console.log('array params', arr_param)
      arr_param.map((ele) => {
        let temp = ele.split('=')
        if (temp[0] == 'sort_by') {
          filters[temp[0]] = temp[1]
        } else if (temp[0] == 'check_in') {
          filters[temp[0]] = temp[1]
        } else if (temp[0] == 'check_out') {
          filters[temp[0]] = temp[1]
        } else if (temp[0] == 'state') {
          filters[temp[0]] = temp[1]
          setLocationSearch(temp[1])
        } else {
          filters[temp[0]] = temp[1] == 'true' ? true : false
        }
      })

      let temp_dict = {}
      for (let key in filters) {
        if (key == 'sort_by' && filters[key] != false) {
          // filters[key] = e.target.value
          temp_dict['sort_by'] = filters[key]
          // s = s + "sort_by=" + filters[key].toString()
        } else if (key == 'check_in' && filters[key] != false) {
          temp_dict['check_in'] = filters[key]
          var start = new Date(filters['check_in'])
          filters['start_date'] = start
        } else if (key == 'check_out' && filters[key] != false) {
          temp_dict['check_out'] = filters[key]
          var end = new Date(filters['check_out'])
          filters['end_date'] = end
        } else if (key == 'state' && filters[key] != false) {
          temp_dict['state'] = filters[key]
        } else if (filters[key] == true) {
          temp_dict[key] = true
          // s = s + key.toString() + '=' + temp_dict[key].toString() + '&'
        }
        // if (filters[key] == true) {
        //     temp_dict[key] = true
        // }
      }
      console.log('temp dict is', temp_dict)

      // history.push(s)
      console.log('FILTERS WHILE LOADING', filters)
      setStartDate(filters['start_date'])
      setEndDate(filters['end_date'])
      dispatch(Save_Filter(filters))
      dispatch(Load_Filtered_Data(temp_dict))
      // loadall(temp_dict)
    } else {
      dispatch(Load_Data())
    }
    console.log('*****data', data)
  }, [])

  // async function loadall(temp_dict) {
  //   let data1 = await dispatch(Load_Filtered_Data(temp_dict))
  //   if (data1.length > 0) {
  //     // dispatch(Apply_Data(data1))
  //     console.log('changede flag')
  //     setDispFlag(true)
  //   }
  // }

  const handleCheck = (e) => {
    ReactGa.event({
      category: 'FILTER CLICKED',
      action: e.target.checked
        ? 'filtered by ' + e.target.name.toString()
        : 'filtered by ' + e.target.name.toString() + ' removed',
    })
    console.log('checkbox filter is', filters)
    filters[e.target.name] = e.target.checked
    dispatch(Save_Filter(filters))
  }

  const handleApplyFilter = (e) => {
    window.$('#applyfilter').modal('hide')
    setFlag(0)
    let temp_dict = {}
    for (let key in filters) {
      if (key == 'sort_by' && filters[key] != false) {
        // filters[key] = e.target.value
        temp_dict['sort_by'] = filters[key]
        // s = s + "sort_by=" + filters[key].toString()
      } else if (key == 'check_in' && filters[key] != false) {
        temp_dict['check_in'] = filters[key]
      } else if (key == 'check_out' && filters[key] != false) {
        temp_dict['check_out'] = filters[key]
      } else if (key == 'state' && filters[key] != false) {
        temp_dict['state'] = filters[key]
      } else if (filters[key] == true) {
        temp_dict[key] = true
        // s = s + key.toString() + '=' + temp_dict[key].toString() + '&'
      }
    }
    // props.match.params = temp_dict
    // <Redirect to={`/filterby/{}`}
    let s = history.location.pathname
    s = s + '?'
    for (let q in temp_dict) {
      s = s + q.toString() + '=' + temp_dict[q].toString() + '&'
    }
    s = s.slice(0, -1)
    history.push(s)
    dispatch(Load_Filtered_Data(temp_dict))
    dispatch(Save_Filter(filters))
  }

  const handleSortBy = (e) => {
    ReactGa.event({
      category: 'SORT BUTTON',
      action: 'sorted by ' + e.target.value.toString(),
    })
    // ReactGa.initialize('UA-173941004-2')

    // ReactGa.pageview(window.location.pathname + window.location.search)
    setFlag(0)
    let temp_dict = {}
    let s = '?'
    for (let key in filters) {
      if (key == 'sort_by') {
        filters[key] = e.target.value
        temp_dict['sort_by'] = e.target.value
        s = s + 'sort_by=' + e.target.value.toString() + '&'
      } else if (key == 'check_in' && filters[key] != false) {
        temp_dict['check_in'] = filters[key]
        s = s + 'check_in=' + filters[key] + '&'
      } else if (key == 'check_out' && filters[key] != false) {
        temp_dict['check_out'] = filters[key]
        s = s + 'sort_by=' + filters[key] + '&'
      } else if (key == 'state' && filters[key] != false) {
        temp_dict['state'] = filters[key]
        s = s + 'state=' + filters[key] + '&'
      } else if (filters[key] == true) {
        temp_dict[key] = true
        s = s + key.toString() + '=' + temp_dict[key].toString() + '&'
      }
    }
    // temp_dict['sort_by'] = e.target.value
    // s = s + "sort_by=" + e.target.value.toString()
    // s = s.slice(0, -1)

    // let s = history.location.search
    let path = history.location.pathname
    // if (s.length > 0) {
    //     s = s.slice(1)
    //     let arr_param = s.split('&')
    //     let final = ""
    //     // console.log('array params', arr_param)
    //     let flag = 0
    //     arr_param.map(ele => {
    //         let temp = ele.split('=')

    //         if (temp == 'sort_by') {
    //             final = final + 'sort_by' + e.target.value.toString()
    //             flag = 1
    //         }
    //         else {
    //             final = final + ele
    //         }
    //     })

    //     if (flag == 0) {
    //         final = final + '?sort_by=' + e.target.value.toString()
    //     }

    //     s = final
    // }
    // else {
    //     s = s + '?sort_by=' + e.target.value.toString()
    // }
    history.push(path + s)
    dispatch(Save_Filter(filters))
    dispatch(Load_Filtered_Data(temp_dict))
  }

  const handleModifySearch = () => {
    ReactGa.event({
      category: 'SEARCH MODIFIED',
      action: 'search dates changed',
    })
    window.$('#modify').modal('hide')
    setFlag(0)
    console.log('handle search clicked')
    let temp_dict = {}
    for (let key in filters) {
      if (key == 'sort_by' && filters[key] != false) {
        // filters[key] = e.target.value
        temp_dict['sort_by'] = filters[key]
        // s = s + "sort_by=" + filters[key].toString()
      } else if (filters[key] == true) {
        temp_dict[key] = true
        // s = s + key.toString() + '=' + temp_dict[key].toString() + '&'
      }
    }
    // props.match.params = temp_dict
    // <Redirect to={`/filterby/{}`}
    let s = history.location.pathname
    s = s + '?'
    for (let q in temp_dict) {
      s = s + q.toString() + '=' + temp_dict[q].toString() + '&'
    }
    let sd =
      startDate.getFullYear() +
      '-' +
      (startDate.getMonth() + 1) +
      '-' +
      startDate.getDate()
    let ed =
      endDate.getFullYear() +
      '-' +
      (endDate.getMonth() + 1) +
      '-' +
      endDate.getDate()
    s = s + 'check_in=' + sd + '&check_out=' + ed
    temp_dict['check_in'] = sd
    temp_dict['check_out'] = ed
    filters['check_in'] = sd
    filters['check_out'] = ed
    filters['start_date'] = startDate
    filters['end_date'] = endDate

    filters['state'] = location_search
    temp_dict['state'] = location_search
    s = s + '&state=' + location_search
    // // s = s.slice(0, -1)
    history.push(s)
    dispatch(Save_Filter(filters))
    dispatch(Load_Filtered_Data(temp_dict))
  }

  // if (data.length > 0) {
  //     return (
  //         <div>
  //             <h2>incoming</h2>
  //             {data && data.map(ele => {
  //                 return <h2>{ele.title}</h2>
  //             })}
  //         </div>
  //     )
  // }
  // else {
  //     return <div><h2>nothing</h2></div>
  // }
  // if (data.length > 1000) {

  if (filter_page_flag == false) {
    return (<div>
      {/* <Link to={{ pathname: '/user/bob', query: { "showAge": true } }} activeClassName="active">Bob With Query Params</Link> */}

      {/* container fluid */}

      <div className='container-fluid m-4'>
        <div className='row'>
          <div class='col'>
            {/* filter */}
            <div className='container p-3'>
              <div className='row'>
                <div className='col'>
                  <button
                    type='button'
                    class='btn btn-outline-secondary'
                    data-toggle='modal'
                    data-target='#applyfilter'
                  >
                    APPLY FILTERS
                </button>
                </div>
                <div className='col'>
                  <button
                    type='button'
                    class='btn btn-outline-secondary ml-5'
                    data-toggle='modal'
                    data-target='#modify'
                  >
                    MODIFY SEARCH
                </button>
                </div>
              </div>
            </div>
            <hr />

            <div className='m-3'>
              <small className='m-3 text-muted mr-5 ml-3'>
                Total results {data.length}
              </small>
              <div style={{ float: 'right' }}>
                <label for='sortby'>
                  <small className='text-muted '>Sort By</small>
                </label>
                <select
                  className='ml-1'
                  id='sortby'
                  value={filters['sort_by']}
                  onChange={(e) => handleSortBy(e)}
                >
                  <option value='relevance'>Relevance</option>
                  <option value='asc'>Price (Low to High)</option>
                  <option value='desc'>Price (High to low)</option>
                </select>
              </div>
            </div>

            {/* datamap */}


            {Array.from(Array(10), (e, i) => {
              return (
                <div
                  class='card mb-3 shadow-sm p-3 mb-5 bg-white rounded'
                  style={{ maxWidth: '740px' }}
                >
                  <div class='row no-gutters'>
                    <div class='col-md-4 mt-4'>

                      <Skeleton variant="rect" width={200} height={200} />
                      {/* <img src={item.images_mid_large[0]} class="card-img" alt="..." /> */}
                    </div>
                    <div class='col-md-8'>
                      <div class='card-body'>
                        <h5 class='card-title'>
                          {/* <a style={{ color: "black" }} href=""> */}
                          <Skeleton variant="text" width={200} />
                          {/* </a> */}
                        </h5>
                        <h6>
                          <Skeleton variant="text" width={150} />
                        </h6>
                        {Array.from(Array(4), (e, i) => {
                          return (
                            <div

                              style={{
                                float: 'left',
                                margin: '10px',
                                padding: '5px',
                              }}
                            >
                              <Skeleton variant="text" width={20} />
                            </div>
                          )
                        })}
                        <div style={{ clear: 'both' }}>
                          <p>
                            <Skeleton variant="text" width={100} />
                          </p>
                          <small
                            class='text-muted mt-3'
                            style={{

                              padding: '5px',
                              textTransform: 'uppercase',
                              color: 'orange',
                              width: '230px',
                            }}
                          >
                            <Skeleton variant="text" width={100} />
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* applyfilter modal */}

          <div
            class='modal fade '
            id='applyfilter'
            tabindex='-1'
            role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
            style={{ height: '600px' }}
          >
            <div class='modal-dialog  modal-lg ' role='document'>
              <div class='modal-content'>
                <div
                  style={{
                    padding: '20px',
                    margin: '50px',
                    marginLeft: '90px',
                    height: '1200px',
                  }}
                >
                  <div className='row'>
                    <div className='col'>
                      <label class='form-check-label' for='exampleCheck1'>
                        <h5>FEATURES</h5>
                      </label>
                      {filter_list.map((ele) => {
                        return (
                          <div class='form-check m-3'>
                            <input
                              type='checkbox'
                              class='form-check-input'
                              id={ele}
                              name={ele}
                              checked={filters[ele]}
                              onChange={(e) => handleCheck(e)}
                            />
                            <small class='text-muted'>
                              <label
                                class='form-check-label'
                                for='exampleCheck1'
                              >
                                {ele}
                              </label>
                            </small>
                          </div>
                        )
                      })}
                    </div>
                    <div className='col'>
                      <label class='form-check-label' for='exampleCheck1'>
                        PROPERTY TYPE
                    </label>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            Luxury Yacht
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            Camping Ground
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Farm
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Homestay
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Apartment
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Villa
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            Hostel
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Serviced Apartment
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Ryokan (Japanese Inn)
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Bed and Breakfast
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Resort
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Boutique Hotel
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Bungalow
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Caravan
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Chalet
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            Guesthouse
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Hotel
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Cottage
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Castle
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          HouseBoats
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Home
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Room
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            Cabin
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Holiday park
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Lodge
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Condo
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Studio
                        </label>
                        </small>
                      </div>
                      <div class='form-check m-3'>
                        <input
                          type='checkbox'
                          class='form-check-input'
                          id='exampleCheck1'
                        />
                        <small class='text-muted'>
                          <label class='form-check-label' for='exampleCheck1'>
                            {' '}
                          Tent
                        </label>
                        </small>
                      </div>
                    </div>

                    <div className='col'>
                      {/* bedrooms */}
                      <div>
                        <h5>Bedrooms</h5>

                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                Any
                              </label>
                              </small>
                            </div>
                          </div>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                1+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                2+
                              </label>
                              </small>
                            </div>
                          </div>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                3+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                4+
                              </label>
                              </small>
                            </div>
                          </div>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                5+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                6+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-5'>
                        {/* bathroom */}
                        <h5>Bathrooms</h5>

                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                Any
                              </label>
                              </small>
                            </div>
                          </div>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                1+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                2+
                              </label>
                              </small>
                            </div>
                          </div>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                3+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                4+
                              </label>
                              </small>
                            </div>
                          </div>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                5+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col'>
                            <div class='radio'>
                              <small class='text-muted'>
                                <label>
                                  <input type='radio' name='optradio' checked />
                                6+
                              </label>
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* pricemeter */}

                      <form className='mt-5'>
                        <div class='form-group'>
                          <label for='formControlRange'>
                            <h5>Price per Night</h5>
                          </label>
                          <input
                            type='range'
                            class='form-control-range'
                            id='formControlRange'
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* filterbutton */}

                  <div class='modal-footer ' id={styles.last}>
                    {/* <div>
                    <button
                      type='button'
                      class='btn btn-outline-secondary '
                      data-dismiss='modal'
                    >
                      CANCEL
                    </button>
                  </div> */}
                    <div>
                      <button
                        type='button'
                        name='applyfilter'
                        class='btn btn-primary btn-md'
                        onClick={handleApplyFilter}
                      >
                        APPLY
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* modify search modal */}
          <div
            class='modal fade'
            id='modify'
            tabindex='-1'
            role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog' role='document'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    MODIFY SEARCH
                </h5>
                  <button
                    type='button'
                    class='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div class='modal-body'>
                  <form>
                    <div class='form-group'>
                      <input
                        type='text'
                        class=' m-3'
                        id={styles.location}
                        value={location_search}
                        placeholder='LOCATION'
                      />
                      <DatePicker
                        className={styles.datepick}
                        selected={startDate}
                        value={startDate}
                        onChange={handleChange1}
                      />
                      <DatePicker
                        className={styles.datepick}
                        selected={endDate}
                        value={endDate}
                        onChange={handleChange2}
                      />
                      <div className='m-3'>
                        <select
                          class='custom-select'
                          style={{ width: '180px', borderRadius: '0px' }}
                        >
                          <option selected>Select Guests</option>
                          <option value='1'>1 guest</option>
                          <option value='2'>2 guests</option>
                          <option value='3'>3 guests</option>
                          <option value='4'>4 guests</option>
                          <option value='5'>5 guests</option>
                          <option value='6'>6 guests</option>
                          <option value='7'>7 guests</option>
                          <option value='8'>8 guests</option>
                          <option value='9'>9 guests</option>
                          <option value='10'>10 guests</option>
                        </select>
                      </div>
                      <div className='m-3'>
                        <button
                          type='button'
                          class='btn btn-primary'
                          onClick={handleModifySearch}
                          style={{ borderRadius: '0px' }}
                        >
                          SEARCH
                      </button>

                        <button
                          type='button'
                          class='btn btn-secondary ml-3'
                          data-dismiss='modal'
                        >
                          CANCEL
                      </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className='col'>
            {/* space for map */}
            <div className='position-fixed'>
              {data.length > 0 ? "" : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
  else {

    return (
      <div>
        {/* <Link to={{ pathname: '/user/bob', query: { "showAge": true } }} activeClassName="active">Bob With Query Params</Link> */}

        {/* container fluid */}

        <div className='container-fluid m-4'>
          <div className='row'>
            <div class='col'>
              {/* filter */}
              <div className='container p-3'>
                <div className='row'>
                  <div className='col'>
                    <button
                      type='button'
                      class='btn btn-outline-secondary'
                      data-toggle='modal'
                      data-target='#applyfilter'
                    >
                      APPLY FILTERS
                    </button>
                  </div>
                  <div className='col'>
                    <button
                      type='button'
                      class='btn btn-outline-secondary ml-5'
                      data-toggle='modal'
                      data-target='#modify'
                    >
                      MODIFY SEARCH
                    </button>
                  </div>
                </div>
              </div>
              <hr />

              <div className='m-3'>
                <small className='m-3 text-muted mr-5 ml-3'>
                  Total results {data.length}
                </small>
                <div style={{ float: 'right' }}>
                  <label for='sortby'>
                    <small className='text-muted '>Sort By</small>
                  </label>
                  <select
                    className='ml-1'
                    id='sortby'
                    value={filters['sort_by']}
                    onChange={(e) => handleSortBy(e)}
                  >
                    <option value='relevance'>Relevance</option>
                    <option value='asc'>Price (Low to High)</option>
                    <option value='desc'>Price (High to low)</option>
                  </select>
                </div>
              </div>

              {/* datamap */}

              {data &&
                data.map((item) => {
                  return (
                    <div
                      class='card mb-3 shadow-sm p-3 mb-5 bg-white rounded'
                      style={{ maxWidth: '740px' }}
                    >
                      <div class='row no-gutters'>
                        <div class='col-md-4 mt-4'>
                          <div
                            style={{
                              backgroundImage: `url(${item.image_mid_large[0]})`,
                              height: '100%',
                              backgroundSize: 'cover',
                            }}
                          ></div>
                          {/* <img src={item.images_mid_large[0]} class="card-img" alt="..." /> */}
                        </div>
                        <div class='col-md-8'>
                          <div class='card-body'>
                            <h5 class='card-title'>
                              {/* <a style={{ color: "black" }} href=""> */}
                              <Link to={`/property/${item.id}`}>
                                {item.title}
                              </Link>
                              {/* </a> */}
                            </h5>
                            <h6>
                              <a href=''>{item.location_name}</a>
                            </h6>
                            {item.prop_tags.map((ele) => {
                              return (
                                <div
                                  style={{
                                    float: 'left',
                                    margin: '10px',
                                    border: '1px solid grey',
                                    padding: '5px',
                                  }}
                                >
                                  <small class='text-muted'>{ele}</small>
                                </div>
                              )
                            })}
                            <div style={{ clear: 'both' }}>
                              <p>
                                <h5>$ {item.total_price}</h5>
                              </p>
                              <small
                                class='text-muted mt-3'
                                style={{
                                  border: '1px solid orange',
                                  padding: '5px',
                                  textTransform: 'uppercase',
                                  color: 'orange',
                                  width: '230px',
                                }}
                              >
                                {item.cancellation_policy_name} CANCELLATION
                                POLICY
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>

            {/* applyfilter modal */}

            <div
              class='modal fade '
              id='applyfilter'
              tabindex='-1'
              role='dialog'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
              style={{ height: '600px' }}
            >
              <div class='modal-dialog  modal-lg ' role='document'>
                <div class='modal-content'>
                  <div
                    style={{
                      padding: '20px',
                      margin: '50px',
                      marginLeft: '90px',
                      height: '1200px',
                    }}
                  >
                    <div className='row'>
                      <div className='col'>
                        <label class='form-check-label' for='exampleCheck1'>
                          <h5>FEATURES</h5>
                        </label>
                        {filter_list.map((ele) => {
                          return (
                            <div class='form-check m-3'>
                              <input
                                type='checkbox'
                                class='form-check-input'
                                id={ele}
                                name={ele}
                                checked={filters[ele]}
                                onChange={(e) => handleCheck(e)}
                              />
                              <small class='text-muted'>
                                <label
                                  class='form-check-label'
                                  for='exampleCheck1'
                                >
                                  {ele}
                                </label>
                              </small>
                            </div>
                          )
                        })}
                      </div>
                      <div className='col'>
                        <label class='form-check-label' for='exampleCheck1'>
                          PROPERTY TYPE
                        </label>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              Luxury Yacht
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              Camping Ground
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Farm
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Homestay
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Apartment
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Villa
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              Hostel
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Serviced Apartment
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Ryokan (Japanese Inn)
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Bed and Breakfast
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Resort
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Boutique Hotel
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Bungalow
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Caravan
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Chalet
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              Guesthouse
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Hotel
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Cottage
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Castle
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              HouseBoats
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Home
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Room
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              Cabin
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Holiday park
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Lodge
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Condo
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Studio
                            </label>
                          </small>
                        </div>
                        <div class='form-check m-3'>
                          <input
                            type='checkbox'
                            class='form-check-input'
                            id='exampleCheck1'
                          />
                          <small class='text-muted'>
                            <label class='form-check-label' for='exampleCheck1'>
                              {' '}
                              Tent
                            </label>
                          </small>
                        </div>
                      </div>

                      <div className='col'>
                        {/* bedrooms */}
                        <div>
                          <h5>Bedrooms</h5>

                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    Any
                                  </label>
                                </small>
                              </div>
                            </div>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    1+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    2+
                                  </label>
                                </small>
                              </div>
                            </div>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    3+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    4+
                                  </label>
                                </small>
                              </div>
                            </div>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    5+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    6+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='mt-5'>
                          {/* bathroom */}
                          <h5>Bathrooms</h5>

                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    Any
                                  </label>
                                </small>
                              </div>
                            </div>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    1+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    2+
                                  </label>
                                </small>
                              </div>
                            </div>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    3+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    4+
                                  </label>
                                </small>
                              </div>
                            </div>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    5+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col'>
                              <div class='radio'>
                                <small class='text-muted'>
                                  <label>
                                    <input type='radio' name='optradio' checked />
                                    6+
                                  </label>
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* pricemeter */}

                        <form className='mt-5'>
                          <div class='form-group'>
                            <label for='formControlRange'>
                              <h5>Price per Night</h5>
                            </label>
                            <input
                              type='range'
                              class='form-control-range'
                              id='formControlRange'
                            />
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* filterbutton */}

                    <div class='modal-footer ' id={styles.last}>
                      {/* <div>
                        <button
                          type='button'
                          class='btn btn-outline-secondary '
                          data-dismiss='modal'
                        >
                          CANCEL
                        </button>
                      </div> */}
                      <div>
                        <button
                          type='button'
                          name='applyfilter'
                          class='btn btn-primary btn-md'
                          onClick={handleApplyFilter}
                        >
                          APPLY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* modify search modal */}
            <div
              class='modal fade'
              id='modify'
              tabindex='-1'
              role='dialog'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                  <div class='modal-header'>
                    <h5 class='modal-title' id='exampleModalLabel'>
                      MODIFY SEARCH
                    </h5>
                    <button
                      type='button'
                      class='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div class='modal-body'>
                    <form>
                      <div class='form-group'>
                        <input
                          type='text'
                          class=' m-3'
                          id={styles.location}
                          value={location_search}
                          placeholder='LOCATION'
                        />
                        <DatePicker
                          className={styles.datepick}
                          selected={startDate}
                          value={startDate}
                          onChange={handleChange1}
                        />
                        <DatePicker
                          className={styles.datepick}
                          selected={endDate}
                          value={endDate}
                          onChange={handleChange2}
                        />
                        <div className='m-3'>
                          <select
                            class='custom-select'
                            style={{ width: '180px', borderRadius: '0px' }}
                          >
                            <option selected>Select Guests</option>
                            <option value='1'>1 guest</option>
                            <option value='2'>2 guests</option>
                            <option value='3'>3 guests</option>
                            <option value='4'>4 guests</option>
                            <option value='5'>5 guests</option>
                            <option value='6'>6 guests</option>
                            <option value='7'>7 guests</option>
                            <option value='8'>8 guests</option>
                            <option value='9'>9 guests</option>
                            <option value='10'>10 guests</option>
                          </select>
                        </div>
                        <div className='m-3'>
                          <button
                            type='button'
                            class='btn btn-primary'
                            onClick={handleModifySearch}
                            style={{ borderRadius: '0px' }}
                          >
                            SEARCH
                          </button>

                          <button
                            type='button'
                            class='btn btn-secondary ml-3'
                            data-dismiss='modal'
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className='col'>
              {/* space for map */}
              <div className='position-fixed'>
                {data.length > 0 ? <div style={{ width: "50vw", height: "100vh" }}>
                  <WrappedMap googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCcS0j7hDpSs-F4xDi2q6AkTD_sWqECR9M"}
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                  />
                </div> : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
