interface TextCenter{
    text:string,
    height: string 
}


export function TextCenter({ text, height ='90vh' }: TextCenter) {

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height }
            }>
            <div>
                <h1>
                    {text}
                </h1>
            </div>
        </div>
    )
}
