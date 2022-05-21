import { Container } from 'react-bootstrap'
import { NavbarLayout } from './NavbarLayout'
import { Footer } from './Footer'


//@ts-ignore
export default function Layout({ children }) {


    return (
        <div className='vh-100 d-flex flex-column justify-content-between'>
            <NavbarLayout />
            <Container className='mb-4 pt-5'>
                <div style={{
                    minHeight: "70vh"
                }}>
                    {children}

                </div>
            </Container>
            <script
                type="text/javascript"
                src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.11.0/mdb.min.js"
            ></script>
            <Footer />
        </div>
    )
}