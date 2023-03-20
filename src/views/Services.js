import React, { useEffect, useState } from 'react'
import { Row, Col, Input, InputGroup, InputGroupText, Modal, ModalBody, Form, ModalHeader } from 'reactstrap'
import { Eye, Search } from 'react-feather'
import DataTable, { createTheme } from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import Config from "../Config.json"
import Rocket from "../assets/images/rocket.png"
const Services = () => {

    const [list, setList] = useState([])
    const [searchData, setSearchData] = useState("")
    const [view, setView] = useState(false)
    const [viewInfo, setViewInfo] = useState(null)
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(3);

    const RocketData = () => {
        //3 hit
        fetch(`${Config.API_BASE_URL}/rockets?rocket_name=${searchData}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setList(data)
                console.log(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });

    }
    useEffect(() => {
        RocketData()
    }, [])
    console.log(list)

    // createTheme creates a new theme named solarized that overrides the build in dark theme
    createTheme('solarized', {
        text: {
            primary: '#268bd2',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');


    const dataToRender = () => {
        const offset = currentPage * perPage;
        const currentData = list.slice(offset, offset + perPage);
        if (currentData && currentData.length > 0) {
            if (searchData) {
                return currentData.filter(row => {
                    const rocketNameMatch = row.rocket_name.toLowerCase().includes(searchData.toLowerCase());
                    const rocketNameId = row.rocket_id.toLowerCase().includes(searchData.toLowerCase());
                    return rocketNameMatch || rocketNameId
                });
            } else {
                return currentData;
            }
        } else {
            return [];
        }
    };


    const handleView = (row) => {
        setView(!view)
        setViewInfo(row)
    }

    const columns = [
        {
            name: 'ID',
            sortable: false,
            style: row => ({ justifyContent: 'start' }),
            cell: row => <>{row.id}</>
        },
        {
            name: 'Rocket ID',
            sortable: false,
            style: row => ({ justifyContent: 'start' }),
            cell: row => <>{row.rocket_id
            }</>
        },
        {
            name: 'Rocket Name',
            sortable: false,
            style: row => ({ justifyContent: 'start' }),
            cell: row => <>{row.rocket_name
            }</>
        },
        {
            name: 'Status',
            sortable: false,
            style: row => ({ justifyContent: 'start' }),
            cell: row => <span>{row.active ? <div className='text-success'>Active</div> : <div className='text-danger'>Not Active</div>
            }</span>
        },
        {
            name: 'Cost per launch',
            sortable: false,
            style: row => ({ justifyContent: 'start' }),
            cell: row => <span>${row.cost_per_launch
            }</span>
        },
        {
            name: "Action",
            sortable: false,
            style: row => ({ justifyContent: 'start' }),
            cell: row => <div onClick={() => { handleView(row) }} style={{ cursor: "pointer" }}>
                <Eye />
            </div>

        }

    ]
    return (
        <section id="search" className='container my-5'>
            <Row className='align-items-center py-5'>
                <Col lg="4" md="4" sm="12" xs="12"></Col>
                <Col lg="4" md="4" sm="12" xs="12" className='my-5'>
                    <div data-aos="fade-up">
                        <InputGroup className='input-group-merge '>
                            <Input
                                id='search-invoice'
                                type='text'
                                value={searchData}
                                placeholder='Search by rocket name, rocket id and id'
                                onChange={e => setSearchData(e.target.value)}
                                style={{ backgroundColor: "black", color: "white" }}
                            />
                        </InputGroup>
                    </div>
                </Col>
                <Col lg="4" md="4" sm="12" xs="12"></Col>
                <Col lg="2" md="2" sm="12" xs="12">
                </Col>
                <Col lg="8" md="8" sm="12" xs="12">
                    <DataTable
                        noHeader
                        pagination={false}
                        responsive
                        paginationServer
                        columns={columns}
                        theme="solarized"
                        className='react-dataTable'
                        data={dataToRender()}
                    />
                    <div className='mt-5 d-flex justify-content-center paginate-sec' >
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            pageCount={Math.ceil(list.length / perPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={page => setCurrentPage(page.selected)}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            activeClassName={'active'}
                            previousClassName={'page-item'}
                            nextClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                        />
                    </div>
                </Col>
                <Col lg="2" md="2" sm="12" xs="12">

                </Col>
            </Row>
            <Modal isOpen={view} toggle={() => { setView(!view) }} className='modal-dialog-centered'>
                <Form>
                    <ModalHeader toggle={() => { setView(!view) }} className="text-danger"> View Details</ModalHeader>
                    <ModalBody className="">
                        <Row>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Rocket Name</div>
                                <div className='text-white'>{viewInfo && viewInfo.rocket_name}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Rocket Type</div>
                                <div className='text-white'>{viewInfo && viewInfo.rocket_type}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Rocket Id</div>
                                <div className='text-white'>{viewInfo && viewInfo.rocket_id}</div>
                            </Col>
                            <Col lg="12" md="12" className='mt-1'>
                                <div className='text-danger'>Wikipedia</div>
                                <a href={`${viewInfo && viewInfo.wikipedia}`} target="_blank" className="text-white column-link">{viewInfo && viewInfo.wikipedia}</a>
                            </Col>
                            <Col lg="12" md="12" sm="12" xs="12" className='mt-1'>
                                <div className='text-danger'>Description</div>
                                <div className='text-white'>{viewInfo && viewInfo.description}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Status</div>
                                <div className='text-white'>{viewInfo && viewInfo.active ? "Active" : "Non Active"}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Cost per launch</div>
                                <div className='text-white'>${viewInfo && viewInfo.cost_per_launch}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Success rate</div>
                                <div className='text-white'>{viewInfo && viewInfo.success_rate_pct}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>First flight</div>
                                <div className='text-white'>{viewInfo && viewInfo.first_flight}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>Country</div>
                                <div className='text-white'>{viewInfo && viewInfo.country}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger'>company</div>
                                <div className='text-white'>{viewInfo && viewInfo.company}</div>
                            </Col>

                            <h3 className='text-danger mt-2'>Measurements</h3>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger measure' >Height (in meters)</div>
                                <div className='text-white'>{viewInfo && viewInfo.height.meters}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger measure'>Diameter (in meters)</div>
                                <div className='text-white'>{viewInfo && viewInfo.diameter.meters}</div>
                            </Col>
                            <Col lg="4" md="4" className='mt-1'>
                                <div className='text-danger measure'>Mass (in kg)</div>
                                <div className='text-white'>{viewInfo && viewInfo.mass.kg}</div>
                            </Col>
                            <h3 className='text-danger'>Images</h3>
                            <Col lg="12" md="12">
                                <div>
                                    <img src={viewInfo && viewInfo.flickr_images} alt='Rocket' className='img-fluid' />
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </Form>
            </Modal>
        </section>
    )
}

export default Services