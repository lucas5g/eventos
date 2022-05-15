export default function Test() {
    return (

        <>

            <button
                type="button"
                className="btn btn-primary"
                data-mdb-toggle="modal"
                data-mdb-target="#exampleModal"
            >
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-mdb-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">

                            <button
                                type="button"
                                className="btn btn-primary"
                                data-mdb-toggle="modal"
                                data-mdb-target="#exampleModal2"
                            >
                                Launch demo modal
                            </button>



                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade mt-5"
                id="exampleModal2"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel2"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel2">Modal title</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-mdb-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}