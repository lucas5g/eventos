import { useEffect, useState } from "react"

export function Alert({ message, loading }) {


    return (
        <>
            {message && !loading && 
                <div
                    className="alert alert-warning row mx-0 h-50"
                    role="alert"
                    data-mdb-color="danger"
                >
                    {message}

                </div>
            }
        </>

    )
}