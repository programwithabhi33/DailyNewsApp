import loading from '../loading.gif'

const Spinner =()=> {
    return (
      <div className="text-center">
        <img src={loading} alt="Loading" />
        <h3>Loading...</h3>
      </div>
    )
}

export default Spinner
