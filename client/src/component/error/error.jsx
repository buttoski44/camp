export const Error = ({ message }) => {
    return (
        <div className=" container row">
            <div className="col-6 offset-3">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">{message}</h4>
                    <hr />
                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </div>
            </div>
        </div>
    )
};