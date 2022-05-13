export function Footer() {
    return (
        <footer
            className="bg-light text-center text-lg-start purple-gradient"
            style={{
                // position: 'relative',
                // width: '100%',
                // bottom: 0
            }}>
            <div className="text-center p-3" >
                <small>
                    Eventos CSA © {new Date().getFullYear()}
                     {/* DevBear */}

                </small>

            </div>
        </footer>
    )

}