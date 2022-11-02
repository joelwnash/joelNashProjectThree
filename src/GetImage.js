const GetImage = (props) => {
    return(
        <section>
            <div className="imageWrapper">
                <img src={props.imageUrl} alt="A background with digital noise pattern" />
            </div>
            
        </section>
    )
}

export default GetImage;