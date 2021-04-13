export default class CustomOverlayView extends window.google.maps.OverlayView {
    constructor(props: any) {
        super(props);
        this.root = props.root;
        this.data = props.data;
        this.CheckIn = props.CheckIn;
        this.CheckOut = props.CheckOut;
        this.Rooms = props.Rooms;
        this.hotelCode = props.hotelCode;
        this.position = props.position; // lat, lng position provided by map. This is where the popup is supposed to be rendered
        // Create and style the popup markup.
        // API回來的Rating有可能會是null
        this.data.Ratings = this.data.Ratings ? this.data.Ratings : { Count: 0, GuestRating: '' };
        this.div_ = null;
    }

    createOverlay = () => {
        const countStar = function (number: any) {
            let stringDom = '';
            for (let i = 0; i < number; i++) {
                stringDom += `<span class="star">★</span>`;
            }
            return stringDom;
        };

        const returnComment = function (theRating: any) {
            if (theRating !== '' && theRating !== null) {
                const rating = parseFloat(theRating);
                if (rating >= 4.5) {
                    return '太讚了';
                } else if (rating >= 4) {
                    return '非常好';
                } else if (rating >= 3.5) {
                    return '很不錯';
                } else if (rating >= 3) {
                    return '還可以';
                } else if (rating >= 1) {
                    return '';
                }
            } else {
                return '';
            }
        };

        const showTheFractionBlock = function (theRating: any) {
            if (theRating !== '' && theRating !== null) {
                return `<div class="fractionBlock"><span>${theRating}</span></div>`;
            } else {
                return '';
            }
        };

        let str = '';

        let detailUrl =
            'https://hotel.liontravel.com/detail/' +
            this.data.CountryCode +
            '-' +
            this.data.CityCode +
            '-' +
            this.data.HotelEName.toLowerCase().replace(/\0/, '-') +
            '?hotelCode=' +
            this.data.HotelCode +
            '&CheckIn=' +
            this.CheckIn +
            '&CheckOut=' +
            this.CheckOut +
            '&Rooms=' +
            JSON.stringify(this.Rooms);

        let roomDetailMarker = `
            <a target="_blank" href=${detailUrl}>
                <div class="roomInfoCard"  data-hotelcodeofcard=${this.data.HotelCode}>
                    <div class="imgBox">
                            <img class="theImg" src=${this.data.ImageUrl}>
                    </div>
                    <div class="contentBox">
                        <div class="contentBox_title">${this.data.HotelName}</div>
                        <div class="contentBox_star">${countStar(this.data.Star)}</div>
                        
                        <div class="EanEvaluate">
                            ${showTheFractionBlock(this.data.Ratings?.GuestRating)}
                            <div>
                                <span class="EanEvaluate_Txt">${returnComment(
                                    this.data?.GuestRating
                                )}</span>
                                <span class="fz-12 c-gray-999">${
                                    this.data?.Count !== 0 ? '(' + this.data?.Count + ')' : ''
                                }</span>
                            </div>
                        </div>
                        <div class="roomStatus">
                            ${this.data.AvgPrice === '' || this.data.AvgPrice === 0 ? '已滿房' : ''}
                        </div>
                    </div>
                </div>
            </a>
        `;
        if (this.data.AvgPrice > 0 || this.data.AvgPrice !== '') {
            str += `<span class="hotelPriceBox" data-hotelCode=${
                this.data.HotelCode
            }>${roomDetailMarker}<span class="price">${this.data.AvgPrice.toLocaleString(
                'en'
            )}</span> 起</span>`;
        } else {
            str += `<span class="hotelPriceBox roomFull" data-hotelCode=${this.data.HotelCode}>${roomDetailMarker}<span class="price full">---</span></span>`;
        }
        this.root.insertAdjacentHTML('beforeend', roomDetailMarker);
        return str;
    };

    show_M_roomInfoCard = (HotelCode?: string) => {
        document.querySelectorAll('.roomInfoCard')?.forEach((v) => {
            v.setAttribute('style', '');
        });
        //只有M版的旅館小卡要show出來
        document
            .querySelector('#map>a>.roomInfoCard[data-hotelcodeofcard="' + HotelCode + '"]')
            ?.setAttribute('style', 'display:flex');
    };

    click_PriceBox = (ele: HTMLElement) => {
        const classArr = ele && ele.className.split(' ');
        Array.from(document.getElementsByClassName('hotelPriceBox')).forEach((v) => {
            v.classList.remove('active');
        });

        this.show_M_roomInfoCard(ele?.dataset.hotelcode);

        if (classArr && classArr.indexOf('active') >= 0) {
            ele.classList.remove('active');
        } else {
            ele.classList.add('active');
        }
    };
    /** Called when the popup is added to the map. */
    onAdd = () => {
        let div = document.createElement('div');
        div.setAttribute('class', 'marker');
        div.style.position = 'absolute';
        div.style.cursor = 'default';

        div.innerHTML = this.createOverlay();

        div.querySelector('.hotelPriceBox')?.addEventListener('click', (e) => {
            // console.log(e.currentTarget);
            let priceBox = e.currentTarget;
            this.click_PriceBox(priceBox as HTMLElement);
        });
        this.div_ = div;
        let panes = this.getPanes();
        panes.floatPane.appendChild(div);
    };

    /** Called each frame when the popup needs to draw itself. */
    draw = () => {
        const divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
        let div = this.div_;
        div.style.left = divPosition.x - 25 + 'px';
        div.style.top = divPosition.y - 40 + 'px';
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
