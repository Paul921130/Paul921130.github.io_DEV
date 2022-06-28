import styled, { css } from 'styled-components';

export const MapBlock = styled.div`
    width: 100%;
    height: fill-available;
    @media (min-width: 980px) {
        height: 100vh;
        & > a > .roomInfoCard {
            /*這裡指的是手機版的旅館小卡*/
            display: none !important;
        }
    }
    .roomInfoCard {
        cursor: pointer;
        display: none;
        background-color: #fff;
        color: #444;
        position: absolute;
        left: 50%;
        bottom: 16px;
        border-radius: 5px;
        overflow: hidden;
        width: 96vw;
        height: 95px;
        justify-content: flex-start;
        transform: translate(-50%);
        z-index: 100;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
        @media (min-width: 980px) {
            transform: translate(-120px, -7px);
            bottom: 32px;
            left: 0;
            width: 350px;
        }
        .imgBox {
            width: 126px;
            height: 95px;
            .theImg {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .contentBox {
            padding: 6px;
            width: inherit;
            text-align: left;
            line-height: 1;
            position: relative;
            @media (min-width: 980px) {
                width: 224px;
            }
            .contentBox_title {
                color: #222222;
                font-size: 16px;
                margin-bottom: 5px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .contentBox_star {
                margin-bottom: 5px;
                color: #ff8400;
                font-size: 16px;
                letter-spacing: 2px;
            }
            .EanEvaluate {
                display: flex;
                margin-bottom: 5px;
                align-items: center;
                font-size: 14px;
                .fractionBlock {
                    color: #f03742;
                    background-color: #ffe3e3;
                    border-radius: 10px 0 10px 0;
                    margin-right: 5px;
                    display: inline-block;
                    height: 24px;
                    width: 30px;
                    line-height: 24px;
                    text-align: center;
                    font-size: 14px;
                    padding: 0;
                }
                .EanEvaluate_Txt {
                    min-height: 14px;
                    font-weight: bold;
                    line-height: 24px;
                    font-size: 14px;
                }
            }
            .roomStatus {
                text-align: right;
                color: #666666;
                font-size: 14px;
                position: absolute;
                bottom: 7px;
                right: 7px;
                font-weight: bold;
            }
        }
    }
    /*地圖的樣式區*/
    .map_warn_txt {
        font-size: 14px;
        margin: 5px 10px 10px;
        @media (min-width: 980px) {
            margin: 10px;
        }
    }

    .map_loading {
        height: 550px;
        width: 100%;
        margin-top: 10px;
        /* background: #fff url('../imgs/lazyload.gif') no-repeat center; */
    }

    .mapShadow {
        position: relative;
        width: 100%;
        height: 112px;
        background-image: linear-gradient(to bottom, rgba(70, 70, 68, 0.3), rgba(70, 70, 68, 0));
        pointer-events: none;
    }
    .hotelPriceBox {
        cursor: pointer;
        position: relative;
        font-family: 'Microsoft JhengHei';
        font-weight: bold;
        border: 2px solid #f03742;
        border-radius: 27px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        background-color: #ffffff;
        display: block;
        width: 110px;
        height: 35px;
        line-height: 32px;
        margin-left: -30px;
        text-align: center;
        .price {
            color: #f03742;
            font-size: 14px;
        }

        &.active {
            background-color: #f03742;
            color: #fff;
            z-index: 1;
            > .price {
                color: #fff;
            }
            &::after {
                background-color: #f03742;
            }

            /* .roomInfoCard {
                display: none;
                @media (min-width: 980px) {
                    display: flex;
                }
            } */
        }
        &.roomFull {
            border: 2px solid #999999;
            background-color: #f1f1f1 !important;
            width: 50px;
            margin-left: 0;
            > .full {
                color: #222222 !important;
            }
            &::after {
                background-color: #f1f1f1 !important;
                border-color: transparent #999999 #999999 transparent !important;
            }
            &:hover {
                background-color: #fff9e3;
                > .price {
                    color: #222222;
                }
                &::after {
                    background-color: #fff9e3;
                }
            }
        }
        &:hover {
            background-color: #f03742;
            color: #fff;
            > .price {
                color: #fff;
            }
            &::after {
                background-color: #f03742;
            }
            @media (min-width: 980px) {
                .roomInfoCard {
                    display: flex;
                }
            }
        }
        &::after {
            content: '';
            position: absolute;
            width: 12px;
            height: 12px;
            left: 50%;
            bottom: -8px;
            margin-left: -8px;
            background: white;
            border: 2px solid;
            border-color: transparent #f03742 #f03742 transparent;
            transform: rotate(45deg);
        }
    }
`;
