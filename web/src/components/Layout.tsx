import { Navbar } from './Navbar'
import { Footer } from './Footer'


//@ts-ignore
export default function Layout({ children }) {


    return (
        <div style={{

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100vh',
        }}>
            <Navbar />
            <main
                className='container pt-5 mb-4'

            >
                <div
                    style={{
                        minHeight: "70vh"
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