import { Container } from 'react-bootstrap'
import { Navbar } from './Navbar'
import { Footer } from './Footer'


//@ts-ignore
export default function Layout({ children }) {


    return (
        <div className='vh-100 d-flex flex-column justify-content-between'>
            <Navbar />
            <main className='container mb-4'>
                <div style={{
                    minHeight: "70vh",
                    marginTop: "6em"
                }}>
                    {children}

                </div>
            </main>
            <script
                type="text/javascript"
                src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.11.0/mdb.min.js"
            ></script>
            <Footer />
        </div>
    )
}