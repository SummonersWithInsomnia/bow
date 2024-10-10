import { COPYRIGHT } from "../../App.config";

function FooterComponent() {
    return(
        <footer>
            <p>{ COPYRIGHT }</p>
            <p>Code with ❤️ by <a target="_blank" href="https://github.com/SummonersWithInsomnia">Summoners with Insomnia</a></p>
        </footer>
    );
}

export default FooterComponent;