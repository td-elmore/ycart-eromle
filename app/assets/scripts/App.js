import "../styles/styles.css"
import StickyHeader from './modules/StickyHeader.js'

let stickyHeader = new StickyHeader();

if (module.hot) {
    module.hot.accept();
}