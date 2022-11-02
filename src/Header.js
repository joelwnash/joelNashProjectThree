import logo from './noiseLogo.png'

const Header = () => {
    return(
        <header>
            <div className="logoWrapper">
                <img src={logo} alt="Large blue pixels forming a pattern" />
            </div>
            <h1>The background noise generator</h1>
        </header>
    )
}

export default Header;