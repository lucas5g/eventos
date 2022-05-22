import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';



import Layout from '../components/Layout'

import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    )
}

export default MyApp