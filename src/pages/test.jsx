export default function Test() {
    return (
        <div>

            <a className="btn btn-primary" data-mdb-toggle="modal" href="#exampleModalToggle1" role="button">Open first modal</a>

            <div
                className="modal fade"
                id="exampleModalToggle1"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel1"
                tabIndex="-1"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel1">Modal 1</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Show a second modal and hide this one with the button below.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-mdb-target="#exampleModalToggle22" data-mdb-toggle="modal" data-mdb-dismiss="modal" id="button">
                                Open second modal
                            </button>
                            <button onClick={() => {
                                const test = document.getElementById('button')
                                test.click()
                            }}>
                                Open modal by js
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle22" aria-hidden="true" aria-labelledby="exampleModalToggleLabel22" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel22">Modal 2</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Hide this modal and show the first with the button below.
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                data-mdb-target="#exampleModalToggle1"
                                data-mdb-toggle="modal">
                                Back to first
                            </button>
                            <button className="btn btn-primary" data-mdb-target="#exampleModalToggle3" data-mdb-toggle="modal" data-mdb-dismiss="modal">
                                Open second modal
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel22" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel22">Modal 3</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Hide this modal and show the first with the button below.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-mdb-target="#exampleModalToggle1" data-mdb-toggle="modal">
                                Back to first
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}