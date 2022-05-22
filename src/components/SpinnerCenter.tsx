import { Spinner } from "react-bootstrap";
interface SpinnerCenter{
    height?: string 
}

export function SpinnerCenter({height = '90vh'}: SpinnerCenter){
    return (
        <div 
            className="d-flex align-items-center justify-content-center"
            style={{ height }}
            >
            <Spinner
                animation="border"
                style={{
                    // fontSize: '3em',
                    height: '10em',
                    width: '10em'
                }}

            />
        </div>
    )
}