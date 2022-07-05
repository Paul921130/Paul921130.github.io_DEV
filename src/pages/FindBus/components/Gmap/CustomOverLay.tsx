export default class CustomOverlayView extends window.google.maps.OverlayView {
    constructor(props: any) {
        super(props);
        this.root = props.root;
        this.data = props.data;
        this.position = props.position; // lat, lng position provided by map. This is where the popup is supposed to be rendered
        // Create and style the popup markup.
        this.div_ = null;
        this.onclick = props.onclick;
    }

    createOverlay = () => {
        let str = '<i class="fa-solid fa-bus-simple"></i>';
        return str;
    };

    /** Called when the popup is added to the map. */
    onAdd = () => {
        let div = document.createElement('div');
        div.setAttribute('class', 'marker custom-over-lay');
        div.style.position = 'absolute';
        div.style.cursor = 'default';
        div.onclick = () => this.onclick(this.data);
        div.innerHTML = this.createOverlay();
        this.div_ = div;
        let panes = this.getPanes();
        panes.floatPane.appendChild(div);
    };

    /** Called each frame when the popup needs to draw itself. */
    draw = () => {
        const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
        let div = this.div_;
        div.style.left = divPosition.x - 13 + 'px';
        div.style.top = divPosition.y - 26 + 'px';
    };
    /** Called when the popup is removed from the map. */
    onRemove() {
        if (this.div_) {
            this.div_.parentNode.removeChild(this.div_);
            delete this.div;
        }
    }

    bindMarkerEvents = () => {};
}
